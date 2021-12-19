import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '../button';
import Tag from '../tag';
import { ASSESSMENT_COLOR, COLOR } from '../../constants';
import { updateApplicantTags } from '../../utility/firebase';

const ModalContainer = styled.div`
  background: white;
  border: 1px solid #d2d2d2;
  box-sizing: border-box;
  box-shadow: 0px 4px 20px rgba(63, 63, 63, 0.15);
  border-radius: 5px;
  padding: 16px 11px;
  min-width: 226px;
  position: absolute;
  bottom: 0;
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

const NotAddedTagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 20px;
`;

const TagDropDown = styled.div`
  cursor: pointer;
  padding: 4.5px 0 4.5px 5px;
  margin-left: -5px;

  &:hover {
    background: ${ASSESSMENT_COLOR.LIGHT_BLUE};
  }
`;

function NotAddedTags({ hackerId, allTags, applicantTags = [] }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(
      applicantTags
        ? allTags.filter((tag) => applicantTags.indexOf(tag) === -1)
        : allTags
    );
  }, [applicantTags]);

  return (
    <NotAddedTagsContainer>
      {tags &&
        tags.map((tag) => (
          <TagDropDown
            onClick={() => {
              updateApplicantTags(hackerId, [...applicantTags, tag]);
            }}
          >
            <Tag color={tag.color} contentColor={COLOR.WHITE}>
              {tag.text}
            </Tag>
          </TagDropDown>
        ))}
    </NotAddedTagsContainer>
  );
}

function AddedTags({ hackerId, applicantTags }) {
  return (
    <ExistingTagsContainer>
      {applicantTags &&
        applicantTags.map((tag) => (
          <div>
            <Tag
              type="DELETE"
              color={tag.color}
              contentColor={COLOR.WHITE}
              onDelete={() =>
                updateApplicantTags(
                  hackerId,
                  applicantTags.filter((applicantTag) => applicantTag !== tag)
                )
              }
            >
              {tag.text}
            </Tag>
          </div>
        ))}
    </ExistingTagsContainer>
  );
}

export default function AddTagModal({
  setShowing,
  allTags,
  hackerId,
  applicantTags,
}) {
  return (
    <ModalContainer>
      <TitleContainer>Tag As</TitleContainer>
      <NotAddedTags
        hackerId={hackerId}
        allTags={allTags}
        applicantTags={applicantTags}
      />
      <TitleContainer>Existing Tags</TitleContainer>
      <AddedTags
        hackerId={hackerId}
        tags={applicantTags}
        applicantTags={applicantTags}
      />
      <Button
        color="white"
        type="get rid of the paddings"
        onClick={() => setShowing(false)}
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
