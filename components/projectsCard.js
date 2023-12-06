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

export default ({ isLoading, handleNew, handleEdit, handleDelete, projects }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Livesite Judging</CardTitle>
        <CardButtonContainer>
          <Button type={NEW} onClick={handleNew}>
            New Project
          </Button>
        </CardButtonContainer>
      </CardHeader>

      <CardContent>
        <TableContainer>
          {isLoading && <CardContainer padding="10px 28px"> Loading... </CardContainer>}
          {!isLoading && (
            <CardContainer padding="10px 0px 10px 20px">
              <Text style={{ flex: '2 2 0' }}>
                <strong>Title</strong>
              </Text>
              <Text>
                <strong>Assigned</strong>
              </Text>
              <Text>
                <strong>Devpost Url</strong>
              </Text>
              <Text>
                <strong>Team Members</strong>
              </Text>
              <Text>
                <strong>Actions</strong>
              </Text>
            </CardContainer>
          )}
          <div>
            {Object.entries(projects).map(([key, project]) => (
              <CardContainer key={project.title} padding="10px 0px 10px 20px">
                <Text style={{ flex: '2 2 0' }}>{project.title}</Text>
                <Text>{project.countAssigned}</Text>
                <Text>
                  <a target="_blank no referrer" href={project.devpostUrl}>
                    Link
                  </a>
                </Text>
                <Text>{project.teamMembers?.toString()}</Text>
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
