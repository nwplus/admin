import React, { useState } from "react";
import styled from "styled-components";

import Button from "../button";
import Spinner from "../../assets/spinner.svg";
import Tag from "../../assets/tag.svg";

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

export default function AddTagButton() {
  return (
    <TagAreaContainer>
      <Button
        color="white"
        onClick={async () => {
          isWindows.alert("You want to add tag!");
          //[TODO] this event should open the modal
        }}
      >
        <TagButtonContainer>
          <TagIcon src={Tag} alt="loading" />
          Add Tag
        </TagButtonContainer>
      </Button>
    </TagAreaContainer>
  );
}

// question
// 1. what is the default font color
// 2. change the colors of default
// 3. how to view the color easily
