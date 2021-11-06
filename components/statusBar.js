import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Bar = styled.div`
  height: 20px;
  width: ${({ width }) => width}px;
  position: relative;
`;

const Background = styled.div`
  height: 100%;
  position: absolute;
  background: #f0eef2;
  width: 100%;
`;

const Progress = styled.div`
  height: 100%;
  position: absolute;
  background: #c4b2f0;
  width: ${({ percent }) => percent}%;
`;

const Info = styled.span`
  margin-left: 10px;
  color: #55525b;
  font-size: 18px;
  vertical-align: middle;
`;

export default function StatusBar({ completed, total, width }) {
  let percent = Math.ceil((completed / total) * 100);
  if (percent > 100) {
    percent = 100;
  }

  return (
    <Wrapper>
      <Bar width={width}>
        <Background />
        <Progress percent={percent}>
          <Info>{percent}%</Info>
        </Progress>
      </Bar>
      <Info>
        {completed}/{total} Completed
      </Info>
    </Wrapper>
  );
}
