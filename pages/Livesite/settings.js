import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import Page from "../../components/page";
import Input from "../../components/input";
import Card, {
  CardHeader,
  CardButtonContainer,
  CardTitle,
  CardContent,
  CardContentButtonContainer,
  CancelButton,
} from "../../components/card";
import FeatureFlag from "../../components/FeatureFlag";
// import { UploadContainer } from '../../components/modal';
import Button from "../../components/button";
import {
  formatDate,
  getTimestamp,
  getHackathons,
  subscribeToLivesiteData,
  updateLivesiteData,
  uploadLivesiteLogoToStorage,
} from "../../utility/firebase";
import { useAuth } from "../../utility/auth";
import { LIVESITE_NAVBAR, EDIT } from "../../constants";

const Label = styled.p`
  font-weight: bold;
  margin: 10px 0;
`;

const Group = styled.div`
  margin: 32px 0;
  &:nth-child(1) {
    margin-top: 0;
  }
`;

export default ({ hackathons }) => {
  const [livesiteData, setLivesiteData] = useState({});
  const [isEditing, setisEditing] = useState(false);
  const [imgFile] = useState();
  // const inputFile = React.createRef();
  // const [imgFile, setImgFile] = useState();
  // const [fileUpload] = useState({});
  const { email: user } = useAuth().user;

  // MODAL SUBMIT BUTTON CLICKED (NEW + EDIT)
  const handleSave = async () => {
    // 1. uploads to firebase
    // newobj.imgURL is a file object
    if (imgFile) {
      const url = await uploadLivesiteLogoToStorage(imgFile);
      setLivesiteData({
        ...livesiteData,
        lastEdited: getTimestamp(),
        lastEditedBy: user,
        imgUrl: url,
      });
      updateLivesiteData({
        ...livesiteData,
        lastEdited: getTimestamp(),
        lastEditedBy: user,
        imgUrl: url,
      });
    } else {
      await updateLivesiteData({
        ...livesiteData,
        lastEdited: getTimestamp(),
        lastEditedBy: user,
      });
    }
    setisEditing(false);
  };

  // const selectImageFile = (e) => {
  //   if (e.target.files[0]) {
  //     setImgFile(e.target.files[0]);
  //     fileUpload.imgName = e.target.files[0].name;
  //   }
  // };

  useEffect(() => {
    const unsubscribe = subscribeToLivesiteData(setLivesiteData);
    return unsubscribe;
  }, []);

  const HackathonChooser = () => (
    <select
      value={livesiteData.activeHackathon}
      onChange={(event) =>
        setLivesiteData({
          ...livesiteData,
          activeHackathon: event.target.value,
        })
      }
    >
      {hackathons.map((hackathon) => {
        return (
          <option key={hackathon} value={hackathon}>
            {hackathon}
          </option>
        );
      })}
    </select>
  );

  const DatePicker = ({ field }) => {
    const [editingDate, setEditingDate] = useState();

    const handleDateChange = (event) => {
      // State: Contains UTC ISO string of the date
      const momentDate = moment(event.target.value);
      setEditingDate(momentDate.toISOString());
    };

    const handleBlur = () => {
      if (editingDate) {
        setLivesiteData({ ...livesiteData, [field]: editingDate });
      }
      setEditingDate("");
    };

    // View: Converts ISO UTC string to local date in format 2017-06-01T08:30
    const domStringDate = moment
      .utc(livesiteData[field])
      .local()
      .format("YYYY-MM-DDTHH:mm");
    return (
      <input
        type="datetime-local"
        value={domStringDate}
        onBlur={() => handleBlur()}
        onChange={(e) => handleDateChange(e)}
      />
    );
  };

  // Livesite doesnt support logo from CMS yet
  // const LogoUpload = () => (
  //   <>
  //     <input
  //       type="file"
  //       id="file"
  //       ref={inputFile}
  //       accept="image/*"
  //       onChange={selectImageFile}
  //       style={{ display: 'none' }}
  //     />
  //     <UploadContainer
  //       type="text"
  //       value={fileUpload.imgName}
  //       onClick={() => inputFile.current.click()}
  //     />
  //   </>
  // );

  const LocalDate = ({ date }) => {
    if (date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
    return null;
  };

  const toggleInput = (field) => {
    setLivesiteData({
      ...livesiteData,
      [field]: !livesiteData[field],
    });
  };

  const handleChange = (field, e) => {
    setLivesiteData({
      ...livesiteData,
      [field]: e.target.value,
    });
  };

  return (
    <Page
      currentPath="Livesite"
      hackathons={hackathons}
      navbarItems={LIVESITE_NAVBAR}
    >
      <Card>
        <CardHeader>
          <CardTitle>Livesite Settings</CardTitle>
          <p>
            {`Last edited by ${livesiteData.lastEditedBy} at ${formatDate(
              livesiteData.lastEdited?.seconds
            )}`}
          </p>
          <CardButtonContainer>
            <Button type={EDIT} onClick={() => setisEditing(true)} />
          </CardButtonContainer>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <>
              <Group>
                <Label>Active Hackathon</Label>
                <HackathonChooser />
              </Group>
              <Label>Application Deadline (Hacker app copy)</Label>
              <Input
                value={livesiteData.applicationDeadline}
                onChange={(e) => handleChange("applicationDeadline", e)}
              />
              <Label>RSVP Deadline (Hacker app copy)</Label>
              <Input
                value={livesiteData.rsvpBy}
                onChange={(e) => handleChange("rsvpBy", e)}
              />
              <Label>Waitlist notify time (Hacker app copy)</Label>
              <Input
                value={livesiteData.offWaitlistNotify}
                onChange={(e) => handleChange("offWaitlistNotify", e)}
              />
              <Label>Acceptances sent by (Hacker app copy)</Label>
              <Input
                value={livesiteData.sendAcceptancesBy}
                onChange={(e) => handleChange("sendAcceptancesBy", e)}
              />
              <FeatureFlag
                title="Project Submissions Open"
                value={livesiteData.submissionsOpen}
                onChange={() => toggleInput("submissionsOpen")}
              />
              <FeatureFlag
                title="Judging Open"
                value={livesiteData.judgingOpen}
                onChange={() => toggleInput("judgingOpen")}
              />
              <FeatureFlag
                title="Judging Released"
                value={livesiteData.judgingReleased}
                onChange={() => toggleInput("judgingReleased")}
              />
              <FeatureFlag
                title="Applications Open"
                value={livesiteData.applicationsOpen}
                onChange={() => toggleInput("applicationsOpen")}
              />

              <Group>
                <Label>{livesiteData.activeHackathon} Start Time</Label>
                <DatePicker field="hackathonStart" />
              </Group>
              <Group>
                <Label>{livesiteData.activeHackathon} End Time</Label>
                <DatePicker field="hackathonEnd" />
              </Group>
              <Group>
                <Label>Hacking Period Start Time</Label>
                <DatePicker field="hackingStart" />
              </Group>
              <Group>
                <Label>Hacking Period End Time</Label>
                <DatePicker field="hackingEnd" />
              </Group>
              {/* <Group>
                <Label>Livesite Logo</Label>
                <LogoUpload />
              </Group> */}
              <CardContentButtonContainer>
                <CancelButton onClick={() => setisEditing(false)} />
                <Button onClick={() => handleSave()}>Save</Button>
              </CardContentButtonContainer>
            </>
          ) : (
            <>
              <Group>
                <Label>Active Hackathon</Label>
                {livesiteData.activeHackathon}
              </Group>
              <Group>
                <Label>Application Deadline (copy)</Label>
                {livesiteData.applicationDeadline}
              </Group>
              <Group>
                <Label>RSVP Deadline (copy)</Label>
                {livesiteData.rsvpBy}
              </Group>
              <Group>
                <Label>Waitlist notify time (copy)</Label>
                {livesiteData.offWaitlistNotify}
              </Group>
              <Group>
                <Label>Acceptances sent by (copy)</Label>
                {livesiteData.sendAcceptancesBy}
              </Group>
              <FeatureFlag
                title="Project Submissions Open"
                value={livesiteData.submissionsOpen}
                disabled
              />
              <FeatureFlag
                title="Judging Open"
                value={livesiteData.judgingOpen}
                disabled
              />
              <FeatureFlag
                title="Judging Released"
                value={livesiteData.judgingReleased}
                disabled
              />
              <FeatureFlag
                title="Applications Open"
                value={livesiteData.applicationsOpen}
                disabled
              />
              <Group>
                <Label>{livesiteData.activeHackathon} Start Time</Label>
                <LocalDate date={livesiteData.hackathonStart} />
              </Group>
              <Group>
                <Label>{livesiteData.activeHackathon} End Time</Label>
                <LocalDate date={livesiteData.hackathonEnd} />
              </Group>
              <Group>
                <Label>Hacking Period Start Time</Label>
                <LocalDate date={livesiteData.hackingStart} />
              </Group>
              <Group>
                <Label>Hacking Period End Time</Label>
                <LocalDate date={livesiteData.hackingEnd} />
              </Group>
              {/* Not enabled on livesite yet
              <Group>
                <Label>Livesite Logo</Label>
                <img src={livesiteData.imgUrl} alt="logo" />
              </Group> */}
            </>
          )}
        </CardContent>
      </Card>
    </Page>
  );
};

export const getStaticProps = async () => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
    },
  };
};
