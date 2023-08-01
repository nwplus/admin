import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  getHackathonPaths,
  getHackathons,
  getHackerInfo,
} from '../../utility/firebase';
import Page from '../../components/page';
import Button from '../../components/button';
import { HACKATHON_NAVBAR } from '../../constants';
import {
  TableWrapper,
  TableContent,
  TableRow,
  TableHeader,
  TableData,
} from '../../components/table';

const tableOptions = ['Applicants', 'Projects', 'DayOf'];

const TableOptionsButtons = styled.ul`
  display: flex;
  flex-direction: row;
`;

export default function HackerInfo({ id, hackathons }) {
  const [unfilteredData, setUnfilteredData] = useState([]);
  const [currTable, setCurrTable] = useState('Applicants');
  const [tableKeys, setTableKeys] = useState([]);
  const [filter, setFilter] = useState({
    WHERE: [
      {
        COLUMN: 'gender',
        COMPARE: '=',
        VALUE: 'male',
      },
    ],
    GROUPBY: {
      COLUMN: 'applicationStatus',
      AGGREGATIONS: [
        {
          NAME: 'NumApplicants',
          TYPE: 'COUNT',
          COLUMN: '_id',
        },
      ],
    },
  });

  useEffect(() => {
    getHackerInfo(setUnfilteredData, id, currTable);
  }, [currTable]);

  useEffect(() => {
    if (unfilteredData.length > 0) {
      setTableKeys(Object.keys(unfilteredData[0]));
    }
  }, [unfilteredData]);

  console.log(unfilteredData);
  const HackerInfoRow = ({ data }) => {
    return (
      <TableRow>
        {tableKeys.map((key) => (
          <TableData>{data[key]}</TableData>
        ))}
      </TableRow>
    );
  };
  return (
    <Page
      currentPath={id}
      hackathons={hackathons}
      navbarItems={HACKATHON_NAVBAR}
    >
      <TableOptionsButtons>
        {tableOptions.map((option) => (
          <Button onClick={() => setCurrTable(option)}>{option}</Button>
        ))}
      </TableOptionsButtons>
      <TableWrapper>
        <TableContent>
          {unfilteredData.length > 0 && (
            <>
              <thead>
                <TableRow>
                  {tableKeys.map((key) => (
                    <TableHeader>{key}</TableHeader>
                  ))}
                </TableRow>
              </thead>
              <tbody>
                {unfilteredData.map((entry) => (
                  <HackerInfoRow data={entry} />
                ))}
              </tbody>
            </>
          )}
        </TableContent>
      </TableWrapper>
    </Page>
  );
}

export const getStaticPaths = async () => {
  return getHackathonPaths();
};

export const getStaticProps = async ({ params }) => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
      id: params.id,
    },
  };
};
