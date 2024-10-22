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
  addEvent,
  deleteEvent,
  formatDate,
  getEvents,
  getHackathonPaths,
  getHackathons,
  getTimestamp,
  updateEvent,
} from '../../utility/firebase'
import Dropdown from '../../components/dropdown'

export default function Events({ id, hackathons }) {
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({})
  const [eventViewing, setEventViewing] = useState({})
  const [eventEditing, setEventEditing] = useState({})
  const [eventConfirm, setEventConfirm] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [alertMsg, setAlertMsg] = useState('')
  const { email: user } = useAuth().user

  const fetchEvents = async () => {
    const eventsFetched = await getEvents(id)
    if (Object.keys(eventsFetched).length > 0) {
      setEvents(eventsFetched)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (alertMsg.length > 0) {
      alert(alertMsg)
    }
  }, [alertMsg])

  useEffect(() => {
    fetchEvents()
  }, [window.location.pathname])

  const handleNew = async () => {
    newEvent.lastModifiedBy = user
    newEvent.date = new Date(newEvent.date.toUTCString())
    const eventID = await addEvent(id, newEvent)
    newEvent.lastModified = formatDate(getTimestamp().seconds)
    setEvents({
      ...events,
      [eventID]: {
        ...newEvent,
        date: formatDate(newEvent.date, true),
        eventID,
      },
    })
    setNewEvent({})
    setAlertMsg(`Successfully added the following event: \n${newEvent.title}`)
  }

  const handleUpdate = async () => {
    eventEditing.lastModified = user
    eventEditing.date = new Date(eventEditing.date)
    await updateEvent(id, eventEditing)
    eventEditing.lastModified = formatDate(getTimestamp().seconds)
    setEvents({
      ...events,
      [eventEditing.eventID]: {
        ...eventEditing,
        date: formatDate(eventEditing.date, true),
      },
    })
    setEventEditing({})
    setAlertMsg(`Successfully updated the following event: \n${eventEditing.title}`)
  }

  const handleDelete = (eventID, confirmed = false) => {
    if (!confirmed) {
      setEventConfirm({ ...events[eventID] })
      return
    }
    deleteEvent(id, eventID)
    setEvents(
      Object.keys(events)
        .filter(curr => {
          return curr !== eventID
        })
        .reduce((obj, curr) => {
          obj[curr] = events[curr]
          return obj
        }, {})
    )
    setEventConfirm({}, setAlertMsg(`Successfully deleted the following event: \n${events[eventID].title}`))
  }

  const handleInput = (property, value, event, setState) => {
    setState({
      ...event,
      [property]: value,
    })
  }

  const EventRow = props => {
    return (
      <TableRow>
        <TableData>{props.title}</TableData>
        <TableData>{props.date}</TableData>
        <TableData>{props.points}</TableData>
        <TableData>{props.type}</TableData>
        <TableData>{props.lastModified}</TableData>
        <TableData actions>
          <ActionsButtonContainer>
            <Button type={VIEW} color={COLOR.TRANSPARENT} onClick={() => setEventViewing(events[props.eventID])} />
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            <Button type={EDIT} color={COLOR.TRANSPARENT} onClick={() => setEventEditing(events[props.eventID])} />
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            <Button type={DELETE} color={COLOR.TRANSPARENT} onClick={() => handleDelete(props.eventID)} />
          </ActionsButtonContainer>
        </TableData>
      </TableRow>
    )
  }
  return (
    <Page currentPath={id} hackathons={hackathons} navbarItems={HACKATHON_NAVBAR}>
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardButtonContainer>
            <Button
              type={NEW}
              onClick={() =>
                setNewEvent({
                  date: setHours(setMinutes(new Date(), 0), 13),
                })
              }
            >
              New Event
            </Button>
          </CardButtonContainer>
        </CardHeader>
        <CardContent style={{ backgroundColor: `${COLOR.BACKGROUND}` }}>
          <TableWrapper>
            <TableContent>
              {isLoading && (
                <tbody>
                  <TableRow>
                    <TableEmptyText>Loading Events...</TableEmptyText>
                  </TableRow>
                </tbody>
              )}
              {Object.keys(events).length === 0 && !isLoading && (
                <tbody>
                  <TableRow>
                    <TableEmptyText>No Events found.</TableEmptyText>
                  </TableRow>
                </tbody>
              )}
              {Object.keys(events).length > 0 && !isLoading && (
                <>
                  <thead>
                    <TableRow>
                      <TableHeader>Event</TableHeader>
                      <TableHeader>Date</TableHeader>
                      <TableHeader narrow>Points</TableHeader>
                      <TableHeader>Event Type</TableHeader>
                      <TableHeader>Last Modified</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody>
                    {Object.keys(events).map(curr => (
                      <EventRow
                        key={events[curr].eventID}
                        eventID={events[curr].eventID}
                        title={events[curr].title}
                        text={events[curr].text}
                        points={events[curr].points}
                        type={events[curr].type}
                        date={events[curr].date}
                        lastModified={events[curr].lastModified}
                        lastModifiedBy={events[curr].lastModifiedBy}
                      />
                    ))}
                  </tbody>
                </>
              )}
            </TableContent>
          </TableWrapper>

          {/* Modal for adding new event */}
          <Modal
            isOpen={newEvent.date}
            handleSave={() => handleNew()}
            handleClose={() => setNewEvent({})}
            modalAction={NEW}
          >
            <ModalContent columns={1}>
              <ModalField
                label="Event"
                modalAction={NEW}
                onChange={event => handleInput('title', event.target.value, newEvent, setNewEvent)}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Description"
                modalAction={NEW}
                onChange={event => {
                  handleInput('text', event.target.value, newEvent, setNewEvent)
                }}
              />
            </ModalContent>
            <ModalContent columns={3}>
              <div>
                <Label>Date</Label>
                <DateTimePicker
                  selected={newEvent.date}
                  onChange={date => handleInput('date', date, newEvent, setNewEvent)}
                />
              </div>
              <ModalField
                dropdown
                dropdownOptions={[
                  {
                    label: 'main',
                  },
                  {
                    label: 'workshops',
                  },
                  {
                    label: 'minievents',
                  },
                ]}
                label="Type"
                value={newEvent.type}
                modalAction={NEW}
                onChange={type => {
                  handleInput('type', type.label, newEvent, setNewEvent)
                }}
              />
              <ModalField
                label="Points"
                modalAction={NEW}
                onChange={event => handleInput('points', event.target.value, newEvent, setNewEvent)}
              />
            </ModalContent>
          </Modal>

          {/* Modal for viewing event */}
          <Modal
            isOpen={Object.keys(eventViewing).length > 0}
            handleClose={() => setEventViewing({})}
            modalAction={VIEW}
            lastModified={`${eventViewing.lastModified} by ${eventViewing.lastModifiedBy}`}
          >
            <ModalContent columns={1}>
              <ModalField label="Event" value={eventViewing.title} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField label="Description" value={eventViewing.text} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={3}>
              <ModalField label="Date" value={eventViewing.date} modalAction={VIEW} />
              <ModalField label="Points" value={eventViewing.points} modalAction={VIEW} />
              <ModalField label="Event Type" value={eventViewing.type} modalAction={VIEW} />
            </ModalContent>
          </Modal>
          {/* Modal for editing event */}
          <Modal
            isOpen={Object.keys(eventEditing).length > 0}
            handleClose={() => setEventEditing({})}
            handleSave={() => handleUpdate()}
            modalAction={EDIT}
            lastModified={`${eventEditing.lastModified} by ${eventEditing.lastModifiedBy}`}
          >
            <ModalContent columns={1}>
              <ModalField
                label="Event"
                value={eventEditing.title}
                modalAction={EDIT}
                onChange={event => {
                  handleInput('title', event.target.value, eventEditing, setEventEditing)
                }}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Description"
                value={eventEditing.text}
                modalAction={EDIT}
                onChange={event => {
                  handleInput('text', event.target.value, eventEditing, setEventEditing)
                }}
              />
            </ModalContent>
            <ModalContent columns={3}>
              <div>
                <Label>Date</Label>
                <DateTimePicker
                  selected={new Date(eventEditing.date)}
                  onChange={date => handleInput('date', date, eventEditing, setEventEditing)}
                />
              </div>
              <ModalField
                label="Points"
                value={eventEditing.points}
                modalAction={EDIT}
                onChange={event => {
                  handleInput('points', event.target.value, eventEditing, setEventEditing)
                }}
              />
              <ModalField
                dropdown
                dropdownOptions={[
                  {
                    label: 'main',
                  },
                  {
                    label: 'workshops',
                  },
                  {
                    label: 'minievents',
                  },
                ]}
                label="Type"
                value={eventEditing.type}
                modalAction={EDIT}
                onChange={type => {
                  handleInput('type', type.label, eventEditing, setEventEditing)
                }}
              />
            </ModalContent>
          </Modal>
          {/* Confirmation modal before deleting event */}
          <Modal
            isOpen={Object.keys(eventConfirm).length > 0}
            handleClose={() => setEventConfirm({})}
            handleSave={() => handleDelete(eventConfirm.eventID, true)}
            modalTitle={`Are you sure you want to delete this event in ${id}?`}
            modalAction={DELETE}
          >
            <ModalContent columns={1}>
              <ModalField label="Event" value={eventConfirm.title} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField label="Description" value={eventConfirm.text} modalAction={VIEW} />
            </ModalContent>
            <ModalContent columns={2}>
              <ModalField label="Date" value={eventConfirm.date} modalAction={VIEW} />
              <ModalField label="Points" value={eventConfirm.points} modalAction={VIEW} />
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
