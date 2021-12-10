import React, { useState } from "react";
import styled from "styled-components";

import Button from "../button";
import Spinner from "../../assets/spinner.svg";
import Tag from "../../assets/tag.svg";


const TagAreaContainer = styled.div``;

const TagButtonContainer = styled.div`
  display: flex;
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
          Add Tag
          <img
            src={Tag}
            style={{
              width: "30px",
              height: "30px",
            }}
            alt="loading"
          />
          {loading && (
            <img
              src={Spinner}
              style={{
                position: "absolute",
                width: "30px",
                height: "30px",
                right: "10px",
              }}
              alt="loading"
            />
          )}
        </TagButtonContainer>
      </Button>
    </TagAreaContainer>
  );
}
