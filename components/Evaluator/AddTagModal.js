import React from 'react';
import styled from 'styled-components';

import Button from '../button';
import Tag from '../tag';
import { ASSESSMENT_COLOR, COLOR } from '../../constants';

const ModalContainer = styled.div`
  background: white;
  border: 1px solid #d2d2d2;
  box-sizing: border-box;
  box-shadow: 0px 4px 20px rgba(63, 63, 63, 0.15);
  border-radius: 5px;
  padding: 16px 11px;
  min-width: 226px;
  min-height: 442px;
`;

const TitleContainer = styled.span`
  font-family: HK Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 16px;
  color: ${ASSESSMENT_COLOR.DARK_GRAY};
`;

const ExistingTagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin: 10px 0;
`;

function AddedTags({ tags }) {
  return (
    <ExistingTagsContainer>
      {tags &&
        tags.map((tag) => (
          <div>
            <Tag
              type="DELETE"
              color={tag.color}
              contentColor={COLOR.WHITE}
              onDelete={(e) => alert('delete')} // [TODO] finish this delete handler
            >
              {tag.text}
            </Tag>
          </div>
        ))}
    </ExistingTagsContainer>
  );
}

export default function AddTagModal({ setShowing }) {
  return (
    <ModalContainer setShowing={setShowing}>
      <TitleContainer>Tag As</TitleContainer>
      <AddedTags
        tags={[
          { text: 'testing tag', color: ASSESSMENT_COLOR.RED },
          { text: 'seattle bus', color: ASSESSMENT_COLOR.BLUE_TEXT },
        ]}
      />
      <Button
        color="white"
        type="get rid of the paddings"
        onClick={() => console.log('new tags are applied')}
      >
        Apply
      </Button>
    </ModalContainer>
  );
}
// [TODO] list
// 3. need a field to hold associated tag for an applicant?
// 4. [outside of mvp] delete a tag, add a trash can icon (ask design for a trash
//    can icon but use placeholder for now) that deletes a tag and remove it from all applicants who previously had
// 5. write new tags to firebase

// [TODO] questions
// 1. should the tags be hardcoded or stored in firebase
// 2. insert tag property
