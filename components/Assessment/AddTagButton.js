import React, { useState } from "react";
import { Button } from "./Button";
import Spinner from "../../assets/spinner.svg";
import styled from "styled-components";

const TagAreaContainer = styled.div``;

export default function AddTagButton() {
  const [loading, setLoading] = useState(false);
  return (
    <TagAreaContainer>
      <Button
        width="large"
        bColor="black"
        onClick={async () => {
          setLoading(true);
          await getAllResumes();
          setLoading(false);
        }}
      >
        <div style={{ position: "relative", textAlign: "center" }}>
          Download Resumes{" "}
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
        </div>
      </Button>
    </TagAreaContainer>
  );
}
