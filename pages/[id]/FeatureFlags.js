import styled from 'styled-components';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Page from '../../components/page';
import Card, {
    CardHeader,
    CardButtonContainer,
    CardTitle,
    CardContent,
} from '../../components/card';
import Button from '../../components/button';
import { EDIT } from '../../constants';
import {
    getTimestamp,
    subscribeToFlags,
    formatDate,
    updateFlags,
} from '../../utility/firebase';
import { useAuth } from '../../utility/auth';

const CancelText = styled.p`
  border-bottom: 2px solid ${COLOR.BLACK};
  margin: 0px;
`;

const CancelButton = styled.button`
  font-size: 16px;
  cursor: pointer;
  border-bottom: 2px solid ${COLOR.BLACK};
  margin-left: 675px;
  margin-right: 40px;
  border: none;
  outline: none;
  background-color: ${COLOR.BACKGROUND};
`;

const FeatureFlagsContainer = styled.div`
    display: flex;
    width: 50%;
    align-content: space-space-between;
`

export default function FeatureFlags({ id, hackathons }) {
    const [editing, setEditing] = useState(false);
    const [flags, setFlags] = useState({});
    const [editedFlags, setEditedFlags] = useState({});
    const { email: user } = useAuth();

    useEffect(() => {
        return subscribeToFlags(setFlags);
    }, [window.location.href]);

    useEffect(() => {
        if (editing) {
            setEditedFlags(flags);
        } else {
            setEditedFlags({});
        }
    }, [editeding])

    const saveFlags = async () => {
        const updateObj = flags;
        updateObj.lastEdited = formatDate(getTimestamp().seconds);
        updateObj.lastEditedBy = user;
        await updateFlags(updateObj);
        setEditing(false);
    };

    const CardContent = editing ? (
        <>
            {Object.entries(editedFlags).map(([key, entry]) => (
                
            ))}
        </>
    )

    return (
        <Page currentPath={id} hackathons={hackathons}>
            <Card>
                <CardHeader>
                    <CardTitle>Feature Flags for {id}</CardTitle>
                    <CardButtonContainer>
                        <Button
                            type={EDIT}
                            onClick={() => (editing ? setEditing(false) : setEditing(true))}
                        />
                    </CardButtonContainer>
                </CardHeader>
                <CardContent>
                    <CancelButton onClick={() => setEditing(false)}>
                        <CancelText>Cancel</CancelText>
                    </CancelButton>
                    <Button onClick={() => handleSave(type)}>Save</Button>
                </CardContent>
            </Card>
        </Page>
    );
}
