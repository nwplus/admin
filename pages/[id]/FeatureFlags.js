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

export default function FeatureFlags({ id, hackathons }) {
    const [editing, setEditing] = useState(false);
    const [flags, setFlags] = useState({});
    const { email: user } = useAuth();

    useEffect(() => {
        return subscribeToFlags(setFlags);
    }, [window.location.href]);

    const saveFlags = async () => {
        const updateObj = flags;
        updateObj.lastEdited = formatDate(getTimestamp().seconds);
        updateObj.lastEditedBy = user;
        await updateFlags(updateObj);
        setEditing(false);
    };

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
                <CardContent />
            </Card>
        </Page>
    );
}
