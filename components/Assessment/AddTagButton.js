import React, { useState } from "react";
import styled from "styled-components";

import Button from "../button";
import Tag from "../tag";
import TagIconSrc from "../../assets/tag.svg";
import { ASSESSMENT_COLOR, COLOR } from "../../constants";

const TagAreaContainer = styled.div``;

const TagButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TagIcon = styled.img`
  width: "18px";
  height: "11.5px";
  margin: "0 0 2px 0";
`;

const ExistingTagContainer = styled.div`
  padding: 24px 24px 8px 24px;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

function AddedTags({ tags }) {
  return (
    <ExistingTagContainer>
      {tags &&
        tags.map((tag) => (
          <Tag
            color={tag.color}
            contentColor={COLOR.WHITE}
            onDelete={(e) => alert("delete")} //[TODO] finish this delete handler
          >
            {tag.text}
          </Tag>
        ))}
    </ExistingTagContainer>
  );
}

export default function AddTagButton() {
  return (
    <TagAreaContainer>
      <AddedTags
        tags={[
          { text: "testing tag", color: ASSESSMENT_COLOR.RED },
          { text: "seattle bus", color: ASSESSMENT_COLOR.BLUE_TEXT },
        ]}
      />
      <Button
        color="white"
        onClick={async () => {
          isWindows.alert("You want to add tag!");
          //[TODO] this event should open the modal
        }}
      >
        <TagButtonContainer>
          <TagIcon src={TagIconSrc} alt="loading" />
          Add Tag
        </TagButtonContainer>
      </Button>
    </TagAreaContainer>
  );
}
