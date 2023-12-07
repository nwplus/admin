import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Page from '../../components/page'
import Card, { CardHeader, CardButtonContainer, CardTitle, CardContent } from '../../components/card'
import Button from '../../components/button'
import FeatureFlag from '../../components/FeatureFlag'
import { COLOR, EDIT, HACKATHON_NAVBAR } from '../../constants'
import { getTimestamp, subscribeToFlags, formatDate, updateFlags } from '../../utility/firebase'
import { useAuth } from '../../utility/auth'

const InlineButton = styled.span`
  display: inline;
  float: right;
  margin: 0 16px;
  padding-bottom: 32px;
`

const InlineButtonContainer = styled.div`
  display: inline-block;
  float: right;
  margin-top: -40px;
`
export default function HackathonFeatureFlags({ id, hackathons }) {
  const [editing, setEditing] = useState(false)
  const [flags, setFlags] = useState({})
  const [editedFlags, setEditedFlags] = useState({})
  const { email: user } = useAuth().user
  useEffect(() => {
    return subscribeToFlags(id, setFlags)
  }, [window.location.href])

  useEffect(() => {
    if (!editing) {
      setEditedFlags({})
    }
  }, [editing])

  const saveFlags = async () => {
    const updateObj = editedFlags
    updateObj.lastEdited = getTimestamp()
    updateObj.lastEditedBy = user
    await updateFlags(id, updateObj)
    setEditing(false)
  }

  const EditFlagsComponent = () => (
    <>
      {Object.entries(editedFlags).map(([key, value]) => {
        if (key === 'lastEdited' || key === 'lastEditedBy') {
          return null
        }
        return (
          <FeatureFlag
            title={key}
            value={value}
            onChange={() => {
              setEditedFlags({
                ...editedFlags,
                [key]: !value,
              })
            }}
          />
        )
      })}
      <InlineButtonContainer>
        <InlineButton>
          <Button onClick={() => saveFlags()}>Save</Button>
        </InlineButton>
        <InlineButton>
          <Button
            onClick={() => setEditing(false)}
            color="linear-gradient(180deg, #FF4E4E 0%, #FFEBEB 289.71%)"
            contentColor={COLOR.WHITE}
          >
            Cancel
          </Button>
        </InlineButton>
      </InlineButtonContainer>
    </>
  )

  const ViewFlagsComponent = () => (
    <>
      {Object.entries(flags).map(([key, value]) => {
        if (key === 'lastEdited' || key === 'lastEditedBy') {
          return null
        }
        return <FeatureFlag disabled title={key} value={value} />
      })}
    </>
  )

  if (!flags) {
    return (
      <Page currentPath={id} hackathons={hackathons} navbarItems={HACKATHON_NAVBAR}>
        <Card>
          <CardHeader>
            <CardTitle>No Feature Flags for {id}</CardTitle>
          </CardHeader>
        </Card>
      </Page>
    )
  }

  return (
    <Page currentPath={id} hackathons={hackathons} navbarItems={HACKATHON_NAVBAR}>
      <Card>
        <CardHeader>
          <CardTitle>Feature Flags for {id}</CardTitle>
          <p>{`Last edited by ${flags.lastEditedBy} at ${formatDate(flags.lastEdited?.seconds)}`}</p>
          <CardButtonContainer>
            <Button
              type={EDIT}
              onClick={() => {
                if (editing) {
                  setEditing(false)
                } else {
                  setEditedFlags(flags)
                  setEditing(true)
                }
              }}
            />
          </CardButtonContainer>
        </CardHeader>
        <CardContent>{editing ? <EditFlagsComponent /> : <ViewFlagsComponent />}</CardContent>
      </Card>
    </Page>
  )
}