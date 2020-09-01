import React from 'react';
import styled from 'styled-components';
import Page from '../../components/page';
import { getHackathonPaths, getHackathons } from '../../utility/firebase';
import { COLOR } from '../../constants';

const HomeHeader = styled.h1`
  color: ${COLOR.BLACK};
`;

export default ({ hackathons, id }) => (
  <Page currentPath={id} hackathons={hackathons}>
    <HomeHeader>{id} Home</HomeHeader>
  </Page>
);

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
