import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { COLOR, DELETE, EDIT, NEW } from '../constants'
import Button from './button'
import Card, { CardButtonContainer, CardContainer, CardContent, CardHeader, CardTitle, TableContainer } from './card'

const Text = styled.p`
  padding-right: 12px;
  flex: 1;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${COLOR.BODY_TEXT};
`

const Actions = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`

export default ({ isLoading, handleNew, handleEdit, handleDelete, announcements }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
        <CardButtonContainer>
          <Button type={NEW} onClick={handleNew}>
            New Announcement
          </Button>
        </CardButtonContainer>
      </CardHeader>

      <CardContent>
        <TableContainer>
          {isLoading && <CardContainer padding="10px 28px"> Loading... </CardContainer>}
          {!isLoading && (
            <CardContainer padding="10px 0px 10px 20px">
              <Text style={{ flex: '3 3 0' }}>
                <strong>Announcement</strong>
              </Text>
              <Text>
                <strong>Time</strong>
              </Text>
              <Text>
                <strong>Actions</strong>
              </Text>
            </CardContainer>
          )}
          <div>
            {Object.entries(announcements).map(([key, announcement]) => (
              <CardContainer key={announcement.timestamp} padding="10px 0px 10px 20px">
                <Text style={{ flex: '3 3 0' }}>{announcement.content}</Text>
                <Text>{moment(announcement.timestamp).fromNow()}</Text>
                <Actions>
                  <Button type={EDIT} color={COLOR.TRANSPARENT} onClick={() => handleEdit(key)} />
                  <Button type={DELETE} color={COLOR.TRANSPARENT} onClick={() => handleDelete(key)} />
                </Actions>
              </CardContainer>
            ))}
          </div>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
