import React, { useState, useEffect } from 'react';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import Page from '../../components/page';
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
  }, [setEvents]);

  const handleNew = async () => {
    newEvent.lastModifiedBy = user;
    newEvent.date = new Date(newEvent.date.toUTCString());
    const eventID = await addLivesiteEvent(activeHackathon, newEvent);
    newEvent.lastModified = formatDate(getTimestamp().seconds);
    setEvents({
      ...events,
      [eventID]: {
        ...newEvent,
        date: formatDate(newEvent.date, true),
        eventID,
      },
    });
    setNewEvent({});
    setAlertMsg(`Successfully added the following event: \n${newEvent.title}`);
  };

  const handleUpdate = async () => {
    eventEditing.lastModified = user;
    eventEditing.date = new Date(eventEditing.date);
    await updateLivesiteEvent(activeHackathon, eventEditing);
    eventEditing.lastModified = formatDate(getTimestamp().seconds);
    setEvents({
      ...events,
      [eventEditing.eventID]: {
        ...eventEditing,
        date: formatDate(eventEditing.date, true),
      },
    });
    setEventEditing({});
    setAlertMsg(
      `Successfully updated the following event: \n${eventEditing.title}`
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
        `Successfully deleted the following event: \n${events[eventID].title}`
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
        <TableData>{props.date}</TableData>
        <TableData>{props.lastModified}</TableData>
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
                      <TableHeader>Last Modified</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody>
                    {Object.keys(events).map((curr) => (
                      <EventRow
                        key={events[curr].eventID}
                        eventID={events[curr].eventID}
                        name={events[curr].name}
                        description={events[curr].description}
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
            <ModalContent columns={2}>
              <div>
                <Label>Date</Label>
                <DateTimePicker
                  selected={newEvent.date}
                  onChange={(date) =>
                    handleInput('date', date, newEvent, setNewEvent)
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
                label="Date"
                value={eventViewing.date}
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
                    'title',
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
                    'text',
                    event.target.value,
                    eventEditing,
                    setEventEditing
                  );
                }}
              />
            </ModalContent>
            <ModalContent columns={2}>
              <div>
                <Label>Date</Label>
                <DateTimePicker
                  selected={new Date(eventEditing.date)}
                  onChange={(date) =>
                    handleInput('date', date, eventEditing, setEventEditing)
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
                value={eventConfirm.title}
                modalAction={VIEW}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Description"
                value={eventConfirm.text}
                modalAction={VIEW}
              />
            </ModalContent>
            <ModalContent columns={2}>
              <ModalField
                label="Date"
                value={eventConfirm.date}
                modalAction={VIEW}
              />
              <ModalField
                label="Order"
                value={eventConfirm.order}
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
