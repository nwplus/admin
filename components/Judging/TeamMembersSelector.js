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

const TeamMembersSelector = (props) => {
  const { value, updateValue } = props;
  // onChange => ('teamMembers', e)

  const copyValues = () => {
    const duplicate = [];
    value.forEach((item) => {
      duplicate.push(item);
    });
    return duplicate;
  };

  const [members, setMembers] = useState(value);
  const [renderMembers, setRenderMembers] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

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

  const AddPanel = styled.div`
    transition: all 0.2s linear;
    background: white;
    padding: 0.5rem;
    border-style: none solid solid solid;
    border-width: 1px;
    border-color: #EEEEEE;
  `;

  const handleAddMember = () => {};

  const handleDeleteMember = (index) => {
    const currentMembers = members;
    currentMembers.splice(index, 1);
    setMembers(currentMembers);
    setTrigger(!trigger);
  };

  const DeleteIcon = ({ index }) => {
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
        onKeyPress={() => handleDeleteMember(index)}
        onClick={() => handleDeleteMember(index)}
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

    members.forEach((item, index) => {
      renderArray.push(
        <Member key={index}>
          {item.name}
          {/* <DeleteIcon index={index} /> */}
        </Member>
      );
    });

    setRenderMembers(renderArray);
  }, [trigger]);

  return (
    <>
      <InputArea>
        {renderMembers}
        {/* <AddText onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : 'Add Member'}
        </AddText> */}
      </InputArea>
      <AddPanel
        style={{
          display: isAdding ? 'flex' : 'none',
        }}
      >
        yuh
      </AddPanel>
    </>
  );
};

export default TeamMembersSelector;
