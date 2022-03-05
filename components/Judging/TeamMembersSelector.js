// teamMembers should be array of object:
//
// [
//     {
//         discord,
//         email,
//         id,
//         name
//     },
//     ...
// ]
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '../TextField';
import { getAllApplicants } from '../../utility/firebase';

const InputArea = styled.div`
  background: white;
  padding: 0.5rem;
  border: 1px solid #eeeeee;
  display: flex;
  gap: 0.5rem;
  position: relative;
  min-height: calc(1rem + calc(1rem * 1.2));
`;

const Member = styled.div`
  background: #2d2937;
  color: white;
  padding: 0.5rem 0.7rem;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const AddText = styled.span`
  margin: 0.5rem 0.3rem;
  cursor: pointer;
  font-weight: 600;
  position: absolute;
  top: 0.5rem;
  right: 10px;
`;

const AddPanelOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  ${(p) => (p.isAdding ? 'display: flex;' : 'display: none;')}
  align-items: flex-end;
  justify-content: center;
`;

const AddPanel = styled.div`
  transition: all 0.5s linear;
  background: #f8f8f8;
  border-style: none solid solid solid;
  border-width: 1px;
  border-color: #eeeeee;
  box-sizing: border-box;
  border-radius: 8px 8px 0 0;
`;

const AddTitle = styled.h4`
  line-height: 150%;
  margin: 0;
`;

const HackerOptions = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #f8f8f8;
  }
  ::-webkit-scrollbar-thumb {
    background: #eeeeee;
    border-radius: 9001px;
  }
`;

const EmptyOptions = styled.div`
  font-size: 0.9rem;
  color: #777777;
`;

const SelectableHacker = styled.div`
  line-height: 150%;
  box-sizing: border-box;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  width: 100%;

  :hover {
    background: #eeeeee;
  }
`;

const SmallText = styled.span`
  font-size: 0.8rem;
  color: #777777;
`;

const TeamMembersSelector = (props) => {
  const { value, updateValue, fnNoOverflow } = props;
  // onChange => ('teamMembers', e)

  //   const copyValues = () => {
  //     const duplicate = [];
  //     value.forEach((item) => {
  //       duplicate.push(item);
  //     });
  //     return duplicate;
  //   };

  const [members, setMembers] = useState(value);
  const [renderMembers, setRenderMembers] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [hackerSearch, setHackerSearch] = useState('');
  const [applicants, setApplicants] = useState([]);

  const handleAddHackerToTeam = (hacker) => {
    setHackerSearch(''); // doesn't reset... maybe something to do with onChangeCustomValue
    const currentMembers = members;
    members.push(hacker);
    setMembers(currentMembers);
    setTrigger(!trigger);
    setIsAdding(false);
  };

  const handleDeleteMember = (index) => {
    const currentMembers = members;
    currentMembers.splice(index, 1);
    setMembers(currentMembers);
    setTrigger(!trigger);
  };

  const DeleteIcon = ({ fn }) => {
    return (
      <div
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        role="button"
        tabIndex="0"
        onKeyPress={fn}
        onClick={fn}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    );
  };

  useEffect(() => {
    const renderArray = [];

    if (members) {
      members.forEach((item, index) => {
        renderArray.push(
          <Member key={index}>
            {item.name}
            <DeleteIcon fn={() => handleDeleteMember(index)} />
          </Member>
        );
      });
    }

    setRenderMembers(renderArray);

    // Save
    updateValue('teamMembers', members, true);
  }, [trigger]);

  useEffect(() => {
    if (isAdding) {
      document
        .getElementById('project-modal')
        ?.scrollTo(0, document.getElementById('project-modal')?.scrollHeight);
      fnNoOverflow(true);
    } else {
      fnNoOverflow(false);
    }
  }, [isAdding]);

  useEffect(() => {
    getAllApplicants(setApplicants);
  }, []);

  return (
    <>
      <div style={{ paddingBottom: '0.5rem' }}>
        <InputArea>
          {renderMembers}
          <AddText onClick={() => setIsAdding(true)}>Add Member</AddText>
        </InputArea>
      </div>
      <AddPanelOverlay
        isAdding={isAdding}
        style={{
          height: document.getElementById('project-modal')?.scrollHeight,
          overflow: 'hidden',
        }}
      >
        <AddPanel>
          {/* Head */}
          <div
            style={{
              padding: '1.5rem',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'space-between',
                paddingBottom: '1rem',
              }}
            >
              {/* Title + Cancel */}
              <AddTitle>Add Team Member</AddTitle>
              <DeleteIcon fn={() => setIsAdding(false)} />
            </div>
            {/* Search */}
            <TextField
              value={hackerSearch}
              onChangeCustomValue={(e) => setHackerSearch(e.target.value)}
            />
          </div>

          {/* Searched Options */}
          <HackerOptions
            style={{
              maxHeight:
                document.getElementById('project-modal')?.scrollHeight / 2,
              minWidth:
                document.getElementById('project-modal')?.scrollWidth / 2,
              paddingBottom: '1.5rem',
            }}
          >
            {/* OPTIMIZATION TODO: debounce search + pull from firebase where applicant is accepted (if possible) */}
            {hackerSearch ? (
              applicants?.map((applicant) => {
                const name = `${applicant.basicInfo.firstName} ${applicant.basicInfo.lastName}`;
                const { email } = applicant.basicInfo;
                if (
                  (name.toLowerCase().includes(hackerSearch.toLowerCase()) ||
                    hackerSearch === '*') &&
                  applicant.status.applicationStatus === 'accepted' &&
                  applicant.status.attending &&
                  !(members.filter((e) => e.id === applicant._id).length > 0)
                ) {
                  return (
                    <SelectableHacker
                      key={applicant._id}
                      onClick={() =>
                        handleAddHackerToTeam({
                          discord: '-#-',
                          email,
                          id: applicant._id,
                          name,
                        })
                      }
                    >
                      {name} <SmallText>{email}</SmallText>
                    </SelectableHacker>
                  );
                }
                return <></>;
              })
            ) : (
              <EmptyOptions>Begin typing to search</EmptyOptions>
            )}
          </HackerOptions>
        </AddPanel>
      </AddPanelOverlay>
    </>
  );
};

export default TeamMembersSelector;
