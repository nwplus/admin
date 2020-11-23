import React from 'react';
import styled from 'styled-components';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer,
  CardContainer,
  TableContainer,
} from './card';
import Button from './button';
import { NEW, EDIT, DELETE, COLOR } from '../constants';

const Text = styled.p`
  padding-right: 12px;
  flex: 1;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${COLOR.BODY_TEXT};
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

export default ({
  isLoading,
  handleNew,
  handleEdit,
  handleDelete,
  quicklinks,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quicklinks</CardTitle>
        <CardButtonContainer>
          <Button type={NEW} onClick={handleNew}>
            New Quicklink
          </Button>
        </CardButtonContainer>
      </CardHeader>

      <CardContent>
        <TableContainer>
          {isLoading && (
            <CardContainer padding="10px 28px"> Loading... </CardContainer>
          )}
          {!isLoading && (
            <CardContainer padding="10px 0px 10px 20px">
              <Text>
                <strong>Label</strong>
              </Text>
              <Text>
                <strong>href</strong>
              </Text>
              <Text>
                <strong>Category</strong>
              </Text>
              <Text>
                <strong>Common</strong>
              </Text>
              <Text>
                <strong>Actions</strong>
              </Text>
            </CardContainer>
          )}
          <div>
            {Object.entries(quicklinks).map(([key, quicklink]) => (
              <CardContainer
                key={quicklink.href + quicklink.label}
                padding="10px 0px 10px 20px"
              >
                <Text>{quicklink.label}</Text>
                <Text>{quicklink.href}</Text>
                <Text>{quicklink.category}</Text>
                <Text>{quicklink.common ? 'true' : 'false'}</Text>
                {/* <Text>{moment(quicklink.timestamp).fromNow()}</Text> */}
                <Actions>
                  <Button
                    type={EDIT}
                    color={COLOR.TRANSPARENT}
                    onClick={() => handleEdit(key)}
                  />
                  <Button
                    type={DELETE}
                    color={COLOR.TRANSPARENT}
                    onClick={() => handleDelete(key)}
                  />
                </Actions>
              </CardContainer>
            ))}
          </div>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
