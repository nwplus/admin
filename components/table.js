import styled from 'styled-components';
import { COLOR } from '../constants';

export const TableWrapper = styled.div`
  max-height: 512px;
  overflow-y: scroll;

  border: 1px solid ${COLOR.BLACK};
  box-sizing: border-box;
  border-radius: 3px;

  max-width: ${(props) => (props.maxWidth ? props.maxWidth : '')};
  overflow-x: ${(props) => (props.maxWidth ? 'scroll' : '')};
`;

export const TableContent = styled.table`
  background-color: ${COLOR.WHITE};
  table-layout: ${(props) => (props.layout ? props.layout : 'fixed')};
  width: 100%;
`;

export const TableRow = styled.tr`
  height: 56px;
  vertical-align: middle;
`;

export const TableHeader = styled.th`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${COLOR.WHITE};

  text-align: left !important;
  width: ${(props) => (props.narrow ? '40px' : '95px')};
  height: 12px;

  font-size: 16px;
  line-height: 11px;

  margin-top: 26px;
  margin-bottom: 18px;
  padding-left: 28px;
`;

export const TableData = styled.td`
  ${(props) =>
    !props.actions &&
    'max-width: 280px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'}

  height: 12px;
  vertical-align: middle !important;

  font-size: 16px;
  line-height: 11px;

  padding-left: 28px;
  margin-top: 18px;
  margin-bottom: 18px;

  border-top: 2px solid ${COLOR.GRAY} !important;
  color: ${COLOR.BODY_TEXT};
`;

export const ActionsButtonContainer = styled.div`
  display: inline-block;
  align-items: flex-start;
  margin: 0;
  width: 48px;
  height: 48px;
  background-color: Transparent;
  border: 0;
`;

export const TableEmptyText = styled.td`
  text-align: center !important;
  height: 24px;
  color: ${COLOR.BODY_TEXT};

  font-size: 18px;
  line-height: 24px;

  margin-top: 32px;
  margin-bottom: 32px;
`;
