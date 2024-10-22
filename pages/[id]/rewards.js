import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import React, { useEffect, useState } from 'react'
import Button from '../../components/button'
import Card, { CardButtonContainer, CardContent, CardHeader, CardTitle } from '../../components/card'
import { DateTimePicker } from '../../components/dateTimePicker'
import Modal, { Label, ModalContent, ModalField } from '../../components/modal'
import Page from '../../components/page'
import {
  ActionsButtonContainer,
  TableContent,
  TableData,
  TableEmptyText,
  TableHeader,
  TableRow,
  TableWrapper,
} from '../../components/table'
import { COLOR, DELETE, EDIT, HACKATHON_NAVBAR, NEW, VIEW } from '../../constants'
import { useAuth } from '../../utility/auth'
import {
  addReward,
  deleteReward,
  formatDate,
  getRewards,
  getHackathonPaths,
  getHackathons,
  getTimestamp,
  updateReward,
} from '../../utility/firebase'

export default function Rewards({ id, hackathons }) {
  const [rewards, setRewards] = useState([])
  const [newReward, setNewReward] = useState({})
  const [rewardViewing, setRewardViewing] = useState({})
  const [rewardEditing, setRewardEditing] = useState({})
  const [rewardConfirm, setRewardConfirm] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [alertMsg, setAlertMsg] = useState('')
  const { email: user } = useAuth().user

  const fetchRewards = async () => {
    const rewardsFetched = await getRewards(id)
    if (Object.keys(rewardsFetched).length > 0) {
      setRewards(rewardsFetched)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (alertMsg.length > 0) {
      alert(alertMsg)
    }
  }, [alertMsg])

  useEffect(() => {
    fetchRewards()
  }, [window.location.pathname])

  const handleNew = async () => {
    newReward.lastModifiedBy = user
    newReward.date = new Date(newReward.date.toUTCString())
    const rewardID = await addReward(id, newReward)
    newReward.lastModified = formatDate(getTimestamp().seconds)
    setRewards({
      ...rewards,
      [rewardID]: {
        ...newReward,
        date: formatDate(newReward.date, true),
        rewardID,
      },
    })
    setNewReward({})
    setAlertMsg(`Successfully added the following reward: \n${newReward.title}`)
  }

  const handleUpdate = async () => {
    rewardEditing.lastModified = user
    rewardEditing.date = new Date(rewardEditing.date)
    await updateReward(id, rewardEditing)
    rewardEditing.lastModified = formatDate(getTimestamp().seconds)
    setRewards({
      ...rewards,
      [rewardEditing.rewardID]: {
        ...rewardEditing,
        date: formatDate(rewardEditing.date, true),
      },
    })
    setRewardEditing({})
    setAlertMsg(`Successfully updated the following reward: \n${rewardEditing.title}`)
  }

  const handleDelete = (rewardID, confirmed = false) => {
    if (!confirmed) {
      setRewardConfirm({ ...rewards[rewardID] })
      return
    }
    deleteReward(id, rewardID)
    setRewards(
      Object.keys(rewards)
        .filter(curr => {
          return curr !== rewardID
        })
        .reduce((obj, curr) => {
          obj[curr] = rewards[curr]
          return obj
        }, {})
    )
    setRewardConfirm({}, setAlertMsg(`Successfully deleted the following reward: \n${rewards[rewardID].title}`))
  }

  const handleInput = (property, value, reward, setState) => {
    setState({
      ...reward,
      [property]: value,
    })
  }

  const RewardRow = props => {
    return (
      <TableRow>
        <TableData>{props.title}</TableData>
        <TableData>{props.date}</TableData>
        <TableData>{props.points}</TableData>
        <TableData>{props.lastModified}</TableData>
        <TableData actions>
          <ActionsButtonContainer>
            <Button type={VIEW} color={COLOR.TRANSPARENT} onClick={() => setRewardViewing(rewards[props.rewardID])} />
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            <Button type={EDIT} color={COLOR.TRANSPARENT} onClick={() => setRewardEditing(rewards[props.rewardID])} />
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            <Button type={DELETE} color={COLOR.TRANSPARENT} onClick={() => handleDelete(props.rewardID)} />
          </ActionsButtonContainer>
        </TableData>
      </TableRow>
    )
  }
  return (
    <Page currentPath={id} hackathons={hackathons} navbarItems={HACKATHON_NAVBAR}>
      <Card>
        <CardHeader>
          <CardTitle>Rewards</CardTitle>
          <CardButtonContainer>
            <Button
              type={NEW}
              onClick={() =>
                setNewReward({
                  date: setHours(setMinutes(new Date(), 0), 13),
                })
              }
            >
              New Reward
            </Button>
          </CardButtonContainer>
        </CardHeader>
        <CardContent style={{ backgroundColor: `${COLOR.BACKGROUND}` }}>
          <TableWrapper>
            <TableContent>
              {isLoading && (
                <tbody>
                  <TableRow>
                    <TableEmptyText>Loading Rewards...</TableEmptyText>
                  </TableRow>
                </tbody>
              )}
              {Object.keys(rewards).length === 0 && !isLoading && (
                <tbody>
                  <TableRow>
                    <TableEmptyText>No Rewards found.</TableEmptyText>
                  </TableRow>
                </tbody>
              )}
              {Object.keys(rewards).length > 0 && !isLoading && (
                <>
                  <thead>
                    <TableRow>
                      <TableHeader>Reward</TableHeader>
                      <TableHeader>Date</TableHeader>
                      <TableHeader narrow>Points</TableHeader>
                      <TableHeader>Last Modified</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody>
                    {Object.keys(rewards).map(curr => (
                      <RewardRow
                        key={rewards[curr].rewardID}
                        rewardID={rewards[curr].rewardID}
                        title={rewards[curr].title}
                        text={rewards[curr].text}
                        points={rewards[curr].points}
                        date={rewards[curr].date}
                        lastModified={rewards[curr].lastModified}
                        lastModifiedBy={rewards[curr].lastModifiedBy}
                      />
                    ))}
                  </tbody>
                </>
              )}
            </TableContent>
          </TableWrapper>

          {/* Modal for adding new reward */}
          <Modal
            isOpen={newReward.date}
            handleSave={() => handleNew()}
            handleClose={() => setNewReward({})}
            modalAction={NEW}
          >
            <ModalContent columns={1}>
              <ModalField
                label="Reward"
                modalAction={NEW}
                onChange={reward => handleInput('title', reward.target.value, newReward, setNewReward)}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Description"
                modalAction={NEW}
                onChange={reward => {
                  handleInput('text', reward.target.value, newReward, setNewReward)
                }}
              />
            </ModalContent>
            <ModalContent columns={2}>
              <div>
                <Label>Date</Label>
                <DateTimePicker
                  selected={newReward.date}
                  onChange={date => handleInput('date', date, newReward, setNewReward)}
                />
              </div>
              <ModalField
                label="Points"
                modalAction={NEW}
                onChange={reward => handleInput('points', reward.target.value, newReward, setNewReward)}
              />
            </ModalContent>
          </Modal>

          {/* Modal for viewing reward */}
          <Modal
            isOpen={Object.keys(rewardViewing).length > 0}
            handleClose={() => setRewardViewing({})}
            modalAction={VIEW}
            lastModified={`${rewardViewing.lastModified} by ${rewardViewing.lastModifiedBy}`}
          >
            <ModalContent columns={1}>
              <ModalField label="Reward" value={rewardViewing.title} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField label="Description" value={rewardViewing.text} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={2}>
              <ModalField label="Date" value={rewardViewing.date} modalAction={VIEW} />
              <ModalField label="Points" value={rewardViewing.points} modalAction={VIEW} />
            </ModalContent>
          </Modal>
          {/* Modal for editing reward */}
          <Modal
            isOpen={Object.keys(rewardEditing).length > 0}
            handleClose={() => setRewardEditing({})}
            handleSave={() => handleUpdate()}
            modalAction={EDIT}
            lastModified={`${rewardEditing.lastModified} by ${rewardEditing.lastModifiedBy}`}
          >
            <ModalContent columns={1}>
              <ModalField
                label="Reward"
                value={rewardEditing.title}
                modalAction={EDIT}
                onChange={reward => {
                  handleInput('title', reward.target.value, rewardEditing, setRewardEditing)
                }}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Description"
                value={rewardEditing.text}
                modalAction={EDIT}
                onChange={reward => {
                  handleInput('text', reward.target.value, rewardEditing, setRewardEditing)
                }}
              />
            </ModalContent>
            <ModalContent columns={2}>
              <div>
                <Label>Date</Label>
                <DateTimePicker
                  selected={new Date(rewardEditing.date)}
                  onChange={date => handleInput('date', date, rewardEditing, setRewardEditing)}
                />
              </div>
              <ModalField
                label="Points"
                value={rewardEditing.points}
                modalAction={EDIT}
                onChange={reward => {
                  handleInput('points', reward.target.value, rewardEditing, setRewardEditing)
                }}
              />
            </ModalContent>
          </Modal>
          {/* Confirmation modal before deleting reward */}
          <Modal
            isOpen={Object.keys(rewardConfirm).length > 0}
            handleClose={() => setRewardConfirm({})}
            handleSave={() => handleDelete(rewardConfirm.rewardID, true)}
            modalTitle={`Are you sure you want to delete this reward in ${id}?`}
            modalAction={DELETE}
          >
            <ModalContent columns={1}>
              <ModalField label="Reward" value={rewardConfirm.title} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField label="Description" value={rewardConfirm.text} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={2}>
              <ModalField label="Date" value={rewardConfirm.date} modalAction={VIEW} />
              <ModalField label="Points" value={rewardConfirm.points} modalAction={VIEW} />
            </ModalContent>
          </Modal>
        </CardContent>
      </Card>
    </Page>
  )
}
export const getStaticPaths = async () => {
  return getHackathonPaths()
}

export const getStaticProps = async ({ params }) => {
  const hackathons = await getHackathons()
  return {
    props: {
      hackathons,
      id: params.id,
    },
  }
}
