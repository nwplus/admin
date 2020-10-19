import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  formatDate,
  getTimestamp,
  getHackathonSnapShot,
  getHackathonPaths,
  getHackathons,
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from '../../utility/firebase';
import Page from '../../components/page';
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
import Modal, { ModalContent, ModalField } from '../../components/modal';
import {
  COLOR,
  EDIT,
  VIEW,
  NEW,
  DELETE,
  HACKATHON_NAVBAR,
} from '../../constants';
import { useAuth } from '../../utility/auth';

export default function Events({ id, hackathons }) {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({});
  const [eventViewing, setEventViewing] = useState({});
  const [eventEditing, setEventEditing] = useState({});
  const [eventConfirm, setEventConfirm] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');
  //   const [orderCache, setOrderCache] = useState([]);
  const { email: user } = useAuth().user;

  const fetchEvents = async () => {
    const eventsFetched = await getEvents(id);
    if (Object.keys(eventsFetched).length > 0) setEvents(eventsFetched);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(events, eventViewing);
  }, [events, eventViewing]);

  useEffect(() => {
    if (alertMsg.length > 0) alert(alertMsg);
  }, [alertMsg]);

  useEffect(() => {
    fetchEvents();
  }, [window.location.pathname]);

  // TDOO: function for add new
  // TODO: function for handleinput
  // TODO: function for handleUpdate

  const handleDelete = (eventID, confirmed = false) => {
    if (!confirmed) {
      setEventConfirm({ ...events[eventID] });
      return;
    }
    deleteEvent(id, eventID);
    setEvents(
      Object.keys(events)
        .filter((id) => {
          return id !== eventID;
        })
        .reduce((obj, id) => {
          obj[id] = events[id];
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
    console.log(props);
    const { eventID, title, text, order, date, lastModified } = props;
    return (
      <TableRow>
        <TableData>{title}</TableData>
        <TableData>{date}</TableData>
        <TableData>{lastModified}</TableData>
        <TableData actions>
          <ActionsButtonContainer>
            <Button
              type={VIEW}
              color={COLOR.TRANSPARENT}
              onClick={() => setEventViewing(events[eventID])}
            />
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            <Button
              type={EDIT}
              color={COLOR.TRANSPARENT}
              onClick={() => setEventEditing(events[eventID])}
            />
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            <Button
              type={DELETE}
              color={COLOR.TRANSPARENT}
              onClick={() => handleDelete(eventID)}
            />
          </ActionsButtonContainer>
        </TableData>
      </TableRow>
    );
  };
  return (
    <Page
      currentPath={id}
      hackathons={hackathons}
      navbarItems={HACKATHON_NAVBAR}
    >
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardButtonContainer>
            <Button type={NEW} onClick={() => setAddNew(true)}>
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
                    {Object.keys(events).map((id) => (
                      <EventRow
                        key={events[id].eventID}
                        eventID={events[id].eventID}
                        title={events[id].title}
                        text={events[id].text}
                        order={events[id].order}
                        date={events[id].date}
                        lastModified={events[id].lastModified}
                        lastModifiedBy={events[id].lastModifiedBy}
                      />
                    ))}
                  </tbody>
                </>
              )}
            </TableContent>
          </TableWrapper>

          {/* Modal for adding new event */}
          <Modal
            isOpen={addNew}
            handleClose={() => setAddNew(false)}
            modalAction={NEW}
          >
            <ModalContent columns={1}>
              <ModalField
                label="Event"
                modalAction={NEW}
                onChange={(event) =>
                  handleInput(
                    'event',
                    event.target.value,
                    newEvent,
                    setNewEvent
                  )
                }
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Description"
                modalAction={NEW}
                onChange={(event) => {
                  handleInput(
                    'text',
                    event.target.value,
                    newEvent,
                    setNewEvent
                  );
                }}
              />
            </ModalContent>
            <ModalContent columns={2}>
              <ModalField
                label="Date"
                modalAction={NEW}
                onChange={(event) =>
                  handleInput('date', event.target.value, newEvent, setNewEvent)
                }
              />
              <ModalField
                label="Order"
                modalAction={NEW}
                onChange={(event) =>
                  handleInput(
                    'order',
                    event.target.value,
                    newEvent,
                    setNewEvent
                  )
                }
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
              <ModalField
                label="Event"
                value={eventViewing.title}
                modalAction={VIEW}
              />
            </ModalContent>
            <ModalContent columns={1}>
              <ModalField
                label="Description"
                value={eventViewing.text}
                modalAction={VIEW}
              />
            </ModalContent>
            <ModalContent columns={2}>
              <ModalField
                label="Date"
                value={eventViewing.date}
                modalAction={VIEW}
              />
              <ModalField
                label="Order"
                value={eventViewing.order}
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
                value={eventEditing.title}
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
                value={eventEditing.text}
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
              <ModalField
                label="Date"
                value={eventEditing.date}
                modalAction={EDIT}
                onChange={(event) => {
                  handleInput(
                    'date',
                    event.target.value,
                    eventEditing,
                    setEventEditing
                  );
                }}
              />
              <ModalField
                label="Order"
                value={eventEditing.order}
                modalAction={EDIT}
                onChange={(event) => {
                  handleInput(
                    'order',
                    event.target.value,
                    eventEditing,
                    setEventEditing
                  );
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
export const getStaticPaths = async () => {
  return getHackathonPaths();
};

export const getStaticProps = async ({ params }) => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
      id: params.id,
    },
  };
};
