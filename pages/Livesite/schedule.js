import React, { useState, useEffect } from 'react';
import Page from '../../components/page';
import FeatureFlag from '../../components/FeatureFlag';
import {
  formatDate,
  getTimestamp,
  getHackathons,
  getActiveHackathon,
  getLivesiteEvents,
  addLivesiteEvent,
  updateLivesiteEvent,
  deleteLivesiteEvent,
} from '../../utility/firebase';
import Card, {
  CardHeader,
  CardTitle,
  CardButtonContainer,
  CardContent,
} from '../../components/card';
import Button from '../../components/button';
import {
  TableWrapper,
  TableContent,
  TableRow,
  TableHeader,
  TableData,
  ActionsButtonContainer,
  TableEmptyText,
} from '../../components/table';
import Modal, { Label, ModalContent, ModalField } from '../../components/modal';
import {
  COLOR,
  EDIT,
  VIEW,
  NEW,
  DELETE,
  LIVESITE_NAVBAR,
} from '../../constants';
import { DateTimePicker } from '../../components/dateTimePicker';
import { useAuth } from '../../utility/auth';

export default function Events({ hackathons }) {
  const [activeHackathon, setActiveHackathon] = useState('');
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({});
  const [eventViewing, setEventViewing] = useState({});
  const [eventEditing, setEventEditing] = useState({});
  const [eventConfirm, setEventConfirm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');
  const { email: user } = useAuth().user;

  useEffect(() => {
    (async () => {
      setActiveHackathon(await getActiveHackathon);
    })();
  });

  const fetchEvents = async () => {
    if (activeHackathon) {
      const eventsFetched = await getLivesiteEvents(activeHackathon);
      if (Object.keys(eventsFetched).length > 0) {
        setEvents(eventsFetched);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (alertMsg.length > 0) {
      alert(alertMsg);
    }
  }, [alertMsg]);

  useEffect(() => {
    fetchEvents();
  }, [activeHackathon]);

  const handleNew = async () => {
    newEvent.lastModifiedBy = user;
    newEvent.startTime = new Date(newEvent.startTime).toISOString();
    newEvent.endTime = new Date(newEvent.endTime).toISOString();
    newEvent.type = newEvent.type ?? 'main';
    const eventID = await addLivesiteEvent(activeHackathon, { ...newEvent });
    newEvent.lastModified = formatDate(getTimestamp().seconds);
    setEvents({
      ...events,
      [eventID]: {
        ...newEvent,
        eventID,
      },
    });
    setNewEvent({});
    setAlertMsg(`Successfully added the following event: \n${newEvent.name}`);
  };

  const handleUpdate = async () => {
    eventEditing.lastModified = user;
    eventEditing.startTime = new Date(eventEditing.startTime).toISOString();
    eventEditing.endTime = new Date(eventEditing.endTime).toISOString();
    await updateLivesiteEvent(activeHackathon, { ...eventEditing });
    eventEditing.lastModified = formatDate(getTimestamp().seconds);
    setEvents({
      ...events,
      [eventEditing.eventID]: eventEditing,
    });
    setEventEditing({});
    setAlertMsg(
      `Successfully updated the following event: \n${eventEditing.name}`
    );
  };

  const handleDelete = (eventID, confirmed = false) => {
    if (!confirmed) {
      setEventConfirm({ ...events[eventID] });
      return;
    }
    deleteLivesiteEvent(activeHackathon, eventID);
    setEvents(
      Object.keys(events)
        .filter((curr) => {
          return curr !== eventID;
        })
        .reduce((obj, curr) => {
          obj[curr] = events[curr];
          return obj;
        }, {})
    );
    setEventConfirm(
      {},
      setAlertMsg(
        `Successfully deleted the following event: \n${events[eventID].name}`
      )
    );
  };

  const handleInput = (property, value, event, setState) => {
    setState({
      ...event,
      [property]: value,
    });
  };

  const EventRow = (props) => {
    return (
      <TableRow>
        <TableData>{props.name}</TableData>
        <TableData>{props.startTime}</TableData>
        <TableData>{props.delayed ? 'True' : 'False'}</TableData>
        <TableData>{props.type}</TableData>
        <TableData actions>
          <ActionsButtonContainer>
            <Button
              type={VIEW}
              color={COLOR.TRANSPARENT}
              onClick={() => setEventViewing(events[props.eventID])}
            />
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            <Button
              type={EDIT}
              color={COLOR.TRANSPARENT}
              onClick={() => setEventEditing(events[props.eventID])}
            />
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            <Button
              type={DELETE}
              color={COLOR.TRANSPARENT}
              onClick={() => handleDelete(props.eventID)}
            />
          </ActionsButtonContainer>
        </TableData>
      </TableRow>
    );
  };
  return (
    <Page
      currentPath="Livesite"
      hackathons={hackathons}
      navbarItems={LIVESITE_NAVBAR}
    >
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardButtonContainer>
            <Button
              type={NEW}
              onClick={() =>
                setNewEvent({
                  startTime: new Date(),
                  endTime: new Date(),
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
                      <TableHeader>Start Time</TableHeader>
                      <TableHeader>Delayed</TableHeader>
                      <TableHeader>Type</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody>
                    {Object.entries(events).map(([key, event]) => (
                      <EventRow {...event} key={key} />
                    ))}
                  </tbody>
                </>
              )}
            </TableContent>
          </TableWrapper>

          {/* Modal for adding new event */}
          <Modal
            isOpen={newEvent.startTime}
            handleSave={() => handleNew()}
            handleClose={() => setNewEvent({})}
            modalAction={NEW}
          >
            <ModalContent columns={1}>
              <ModalField
                label="Event"
                modalAction={NEW}
                onChange={(event) =>
                  handleInput('name', event.target.value, newEvent, setNewEvent)
                }
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Description"
                modalAction={NEW}
                onChange={(event) => {
                  handleInput(
                    'description',
                    event.target.value,
                    newEvent,
                    setNewEvent
                  );
                }}
              />
            </ModalContent>
            <ModalContent columns={1}>
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
                  {
                    label: 'notices',
                  },
                ]}
                label="Type"
                value={newEvent.type}
                modalAction={EDIT}
                onChange={(type) => {
                  handleInput('type', type.label, newEvent, setNewEvent);
                }}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <FeatureFlag
                title="Delayed"
                value={newEvent.delayed}
                onChange={() => {
                  handleInput(
                    'delayed',
                    !newEvent.delayed,
                    newEvent,
                    setNewEvent
                  );
                }}
              />
            </ModalContent>
            <ModalContent columns={2}>
              <div>
                <Label>Start Time</Label>
                <DateTimePicker
                  selected={
                    newEvent.startTime
                      ? new Date(newEvent.startTime)
                      : new Date()
                  }
                  onChange={(date) =>
                    handleInput('startTime', date, newEvent, setNewEvent)
                  }
                />
              </div>
              <div>
                <Label>End Time</Label>
                <DateTimePicker
                  selected={
                    newEvent.endTime ? new Date(newEvent.endTime) : new Date()
                  }
                  onChange={(date) =>
                    handleInput('endTime', date, newEvent, setNewEvent)
                  }
                />
              </div>
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
              <ModalField
                label="Event Name"
                value={eventViewing.name}
                modalAction={VIEW}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Description"
                value={eventViewing.description}
                modalAction={VIEW}
              />
            </ModalContent>
            <ModalContent columns={2}>
              <ModalField
                label="Type"
                value={eventViewing.type}
                modalAction={VIEW}
              />
              <ModalField
                label="Delayed"
                value={eventViewing.delayed ? 'True' : 'False'}
                modalAction={VIEW}
              />
            </ModalContent>
            <ModalContent columns={2}>
              <ModalField
                label="Start Time"
                value={eventViewing.startTime}
                modalAction={VIEW}
              />
              <ModalField
                label="End Time"
                value={eventViewing.endTime}
                modalAction={VIEW}
              />
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
                value={eventEditing.name}
                modalAction={EDIT}
                onChange={(event) => {
                  handleInput(
                    'name',
                    event.target.value,
                    eventEditing,
                    setEventEditing
                  );
                }}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Description"
                value={eventEditing.description}
                modalAction={EDIT}
                onChange={(event) => {
                  handleInput(
                    'description',
                    event.target.value,
                    eventEditing,
                    setEventEditing
                  );
                }}
              />
            </ModalContent>
            <ModalContent columns={1}>
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
                  {
                    label: 'notices',
                  },
                ]}
                label="Type"
                value={eventEditing.type}
                modalAction={EDIT}
                onChange={(type) => {
                  handleInput(
                    'type',
                    type.label,
                    eventEditing,
                    setEventEditing
                  );
                }}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <FeatureFlag
                title="Delayed"
                value={eventEditing.delayed}
                onChange={() => {
                  handleInput(
                    'delayed',
                    !eventEditing.delayed,
                    eventEditing,
                    setEventEditing
                  );
                }}
              />
            </ModalContent>
            <ModalContent columns={2}>
              <div>
                <Label>Start Time</Label>
                <DateTimePicker
                  selected={new Date(eventEditing.startTime)}
                  onChange={(date) =>
                    handleInput(
                      'startTime',
                      date,
                      eventEditing,
                      setEventEditing
                    )
                  }
                />
              </div>
              <div>
                <Label>End Time</Label>
                <DateTimePicker
                  selected={new Date(eventEditing.endTime)}
                  onChange={(date) =>
                    handleInput('endTime', date, eventEditing, setEventEditing)
                  }
                />
              </div>
            </ModalContent>
          </Modal>
          {/* Confirmation modal before deleting event */}
          <Modal
            isOpen={Object.keys(eventConfirm).length > 0}
            handleClose={() => setEventConfirm({})}
            handleSave={() => handleDelete(eventConfirm.eventID, true)}
            modalTitle={`Are you sure you want to delete this event in ${activeHackathon}?`}
            modalAction={DELETE}
          >
            <ModalContent columns={1}>
              <ModalField
                label="Event"
                value={eventConfirm.name}
                modalAction={VIEW}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Description"
                value={eventConfirm.description}
                modalAction={VIEW}
              />
            </ModalContent>
          </Modal>
        </CardContent>
      </Card>
    </Page>
  );
}

export const getStaticProps = async () => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
    },
  };
};
