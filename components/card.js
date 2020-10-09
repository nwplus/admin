import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../constants';

const Card = styled.div`
  background-color: ${COLOR.BACKGROUND};
`;

export const CardHeader = styled.div`
  background-color: ${COLOR.GRAY};
  padding: 24px 40px;
  display: flex;
  align-items: center;
`;

export const CardTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  margin-right: 16px;
`;

export const CardButtonContainer = styled.div`
  margin-left: auto;
`;

export const CardContent = styled.div`
  box-sizing: border-box;
  padding: 40px;
`;

// padding: top, right, bottom, left
// jsutify contente space around
export const CardContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  padding: ${(props) => props.padding};
  border-bottom: 2px solid ${COLOR.GRAY};
`;
export const TableContainer = styled.div`
  border: 1px solid ${COLOR.BLACK};
  border-radius: 3px;
  padding: 1px 1px;
  background-color: ${COLOR.WHITE};
`;

export default ({ children }) => <Card>{children}</Card>;
