import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../button';
import Tag from '../tag';
import TagIconSrc from '../../assets/tag.svg';
import { COLOR } from '../../constants';
import AddTagModal from './AddTagModal';
import { updateApplicantTags } from '../../utility/firebase';

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
  width: 18px;
  height: 11.5px;
  margin: 0 0 2px 0;
`;

const StyledButton = styled(Button)`
  padding: 0;
`;

const ExistingTagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

function AddedTags({ tags, hacker }) {
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
                hacker._id,
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

export default function AddTagButton({ allTags, hacker }) {
  const [showTagModal, setShowTagModal] = useState(false);

  return (
    <TagButtonStyledDiv>
      <AddedTags tags={hacker?.applicantTags || []} hacker={hacker} />
      <StyledButton color="white" onClick={() => setShowTagModal(true)}>
        <TagButtonContainer>
          <TagIcon src={TagIconSrc} alt="loading" />
          Add Tag
        </TagButtonContainer>
      </StyledButton>
      {showTagModal && (
        <AddTagModal
          setShowing={setShowTagModal}
          allTags={allTags}
          hackerId={hacker._id}
          applicantTags={hacker.applicantTags}
        />
      )}
    </TagButtonStyledDiv>
  );
}
