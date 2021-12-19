import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '../button';
import Tag from '../tag';
import TagIconSrc from '../../assets/tag.svg';
import { COLOR } from '../../constants';

import AddTagModal from './AddTagModal';
import { getApplicantTags, updateApplicantTags } from '../../utility/firebase';

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

function AddedTags({ tags, hackerId }) {
  return (
    <ExistingTagsContainer>
      {tags &&
        tags.map((tag) => (
          <Tag
            type="DELETE"
            color={tag.color}
            contentColor={COLOR.WHITE}
            onDelete={() =>
              updateApplicantTags(
                hackerId,
                tags.filter((applicantTag) => applicantTag !== tag)
              )
            }
          >
            {tag.text}
          </Tag>
        ))}
    </ExistingTagsContainer>
  );
}

export default function AddTagButton({ allTags, hackerId }) {
  const [showTagModal, setShowTagModal] = useState(false);
  const [applicantTags, setApplicantTags] = useState([]);

  useEffect(() => {
    getApplicantTags(hackerId, setApplicantTags);
  }, []);

  return (
    <TagButtonStyledDiv>
      <AddedTags tags={applicantTags} hackerId={hackerId} />
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
