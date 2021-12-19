import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '../button';
import Tag from '../tag';
import TagIconSrc from '../../assets/tag.svg';
import { COLOR } from '../../constants';

import AddTagModal from './AddTagModal';
import { getApplicantTags } from '../../utility/firebase';

const TagButtonStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  position: relative;
`;

const TagButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TagIcon = styled.img`
  width: '18px';
  height: '11.5px';
  margin: '0 0 2px 0';
`;

const ExistingTagsContainer = styled.div`
  padding: 24px 24px 8px 24px;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

function AddedTags({ tags }) {
  console.log(tags, "this is tags");
  return (
    <ExistingTagsContainer>
      {tags &&
        tags.map((tag) => (
          <Tag
            type="DELETE"
            color={tag.color}
            contentColor={COLOR.WHITE}
            onDelete={(e) => alert('delete')} // [TODO] finish this delete handler
          >
            {tag.text}
          </Tag>
        ))}
    </ExistingTagsContainer>
  );
}

// [TODO] pull tag info from firebase
export default function AddTagButton({ allTags, hackerId }) {
  const [showTagModal, setShowTagModal] = useState(false);
  const [applicantTags, setApplicantTags] = useState([]);

  useEffect(() => {
    async function fetchCurrentApplicantTags() {
      const tags = await getApplicantTags(hackerId);
      console.log(tags, "tags hot off the press");
      setApplicantTags(tags ?? []);
    }
    fetchCurrentApplicantTags();
  }, []);

  return (
    <TagButtonStyledDiv>
      <AddedTags tags={applicantTags} />
      <Button color="white" onClick={() => setShowTagModal(true)}>
        <TagButtonContainer>
          <TagIcon src={TagIconSrc} alt="loading" />
          Add Tag
        </TagButtonContainer>
      </Button>
      {showTagModal && (
        <AddTagModal
          setShowing={setShowTagModal}
          allTags={allTags}
          hackerId={hackerId}
          applicantTags={applicantTags}
        />
      )}
    </TagButtonStyledDiv>
  );
}
