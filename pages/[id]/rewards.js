import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import React, { useEffect, useState } from 'react'
import Button from '../../components/button'
import Card, { CardButtonContainer, CardContent, CardHeader, CardTitle } from '../../components/card'
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
    newReward.lastmodBy = user
    newReward.date = new Date(newReward.date.toUTCString())
    const rewardID = await addReward(id, newReward)
    newReward.lastmod = formatDate(getTimestamp().seconds)
    setRewards({
      ...rewards,
      [rewardID]: {
        ...newReward,
        date: formatDate(newReward.date, true),
        rewardID,
      },
    })
    setNewReward({})
    setAlertMsg(`Successfully added the following reward: \n${newReward.reward}`)
  }

  const handleUpdate = async () => {
    rewardEditing.lastmodBy = user
    await updateReward(id, rewardEditing)
    rewardEditing.lastmod = formatDate(getTimestamp().seconds)
    setRewards({
      ...rewards,
      [rewardEditing.rewardID]: {
        ...rewardEditing,
      },
    })
    setRewardEditing({})
    setAlertMsg(`Successfully updated the following reward: \n${rewardEditing.reward}`)
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
    setRewardConfirm({}, setAlertMsg(`Successfully deleted the following reward: \n${rewards[rewardID].reward}`))
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
        <TableData>{props.reward}</TableData>
        <TableData>{props.blurb}</TableData>
        <TableData>{props.prizesAvailable}</TableData>
        <TableData>{props.requiredPoints}</TableData>
        <TableData>{props.lastmod}</TableData>
        <TableData>{props.lastmodBy}</TableData>
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
                      <TableHeader>Blurb</TableHeader>
                      <TableHeader>Number of Prizes Available</TableHeader>
                      <TableHeader>Required Points</TableHeader>
                      <TableHeader>Last Modified</TableHeader>
                      <TableHeader>Last Modified By</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody>
                    {Object.keys(rewards).map(curr => (
                      <RewardRow
                        key={rewards[curr].rewardID}
                        rewardID={rewards[curr].rewardID}
                        reward={rewards[curr].reward}
                        blurb={rewards[curr].blurb}
                        prizesAvailable={rewards[curr].prizesAvailable}
                        requiredPoints={rewards[curr].requiredPoints}
                        lastmod={rewards[curr].lastmod}
                        lastmodBy={rewards[curr].lastmodBy}
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
                onChange={reward => handleInput('reward', reward.target.value, newReward, setNewReward)}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Blurb"
                modalAction={NEW}
                onChange={reward => {
                  handleInput('blurb', reward.target.value, newReward, setNewReward)
                }}
              />
            </ModalContent>

            <ModalContent columns={1}>
              <ModalField
                label="Image Name"
                modalAction={NEW}
                onChange={reward => {
                  handleInput('imgName', reward.target.value, newReward, setNewReward)
                }}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Image URL"
                modalAction={NEW}
                onChange={reward => {
                  handleInput('imgURL', reward.target.value, newReward, setNewReward)
                }}
              />
            </ModalContent>

            <ModalContent columns={2}>
              <ModalField
                label="Number of prizes available"
                modalAction={NEW}
                onChange={reward => {
                  handleInput('prizesAvailable', reward.target.value, newReward, setNewReward)
                }}
              />
              <ModalField
                label="Required Points"
                modalAction={NEW}
                onChange={reward => handleInput('requiredPoints', reward.target.value, newReward, setNewReward)}
              />
            </ModalContent>
          </Modal>

          {/* Modal for viewing reward */}
          <Modal
            isOpen={Object.keys(rewardViewing).length > 0}
            handleClose={() => setRewardViewing({})}
            modalAction={VIEW}
            lastmod={`${rewardViewing.lastmod} by ${rewardViewing.lastmodBy}`}
          >
            <ModalContent columns={1}>
              <ModalField label="Reward" value={rewardViewing.reward} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField label="Blurb" value={rewardViewing.blurb} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField label="Image Name" value={rewardViewing.imgName} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField label="Image URL" value={rewardViewing.imgURL} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={2}>
              <ModalField label="Number of prizes available" value={rewardViewing.prizesAvailable} modalAction={VIEW} />
              <ModalField label="Required Points" value={rewardViewing.requiredPoints} modalAction={VIEW} />
            </ModalContent>
          </Modal>
          {/* Modal for editing reward */}
          <Modal
            isOpen={Object.keys(rewardEditing).length > 0}
            handleClose={() => setRewardEditing({})}
            handleSave={() => handleUpdate()}
            modalAction={EDIT}
            lastmod={`${rewardEditing.lastmod} by ${rewardEditing.lastmodBy}`}
          >
            <ModalContent columns={1}>
              <ModalField
                label="Reward"
                value={rewardEditing.reward}
                modalAction={EDIT}
                onChange={reward => {
                  handleInput('reward', reward.target.value, rewardEditing, setRewardEditing)
                }}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Blurb"
                value={rewardEditing.blurb}
                modalAction={EDIT}
                onChange={reward => {
                  handleInput('blurb', reward.target.value, rewardEditing, setRewardEditing)
                }}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Image Name"
                value={rewardEditing.imgName}
                modalAction={EDIT}
                onChange={reward => {
                  handleInput('imgName', reward.target.value, rewardEditing, setRewardEditing)
                }}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Image URL"
                value={rewardEditing.imgURL}
                modalAction={EDIT}
                onChange={reward => {
                  handleInput('imgURL', reward.target.value, rewardEditing, setRewardEditing)
                }}
              />
            </ModalContent>
            <ModalContent columns={2}>
              <ModalField
                label="Number of prizes available"
                value={rewardEditing.prizesAvailable}
                modalAction={EDIT}
                onChange={reward => {
                  handleInput('prizesAvailable', reward.target.value, rewardEditing, setRewardEditing)
                }}
              />
              <ModalField
                label="Required Points"
                value={rewardEditing.requiredPoints}
                modalAction={EDIT}
                onChange={reward => {
                  handleInput('requiredPoints', reward.target.value, rewardEditing, setRewardEditing)
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
              <ModalField label="Reward" value={rewardConfirm.rewardConfirm} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField label="Blurb" value={rewardConfirm.blurb} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField label="Image Name" value={rewardConfirm.imgName} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField label="Image URL" value={rewardConfirm.imgURL} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={2}>
              <ModalField label="Number of prizes available" value={rewardConfirm.prizesAvailable} modalAction={VIEW} />
              <ModalField label="Required Points" value={rewardConfirm.requiredPoints} modalAction={VIEW} />
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
