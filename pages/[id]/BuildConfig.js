import { useState } from 'react';
import Page from '../../components/page';
import Card, {
    CardHeader,
    CardButtonContainer,
    CardTitle,
    CardContent,
  } from '../../components/card';
import { HACKATHON_NAVBAR } from '../../constants';
import {
    db,
    getDocument,
    getHackathonPaths,
    getHackathons,
  } from '../../utility/firebase';

  
export default function BuildConfig({id, hackathons}) {
    const [buildConfig, setBuildConfig] = useState({});

    db.collection('Hackathons').doc(id).onSnapshot(doc => {
        setBuildConfig(doc.data().BuildConfig)
    })  
    console.log(buildConfig.globalStyling)    
    return(
        <Page
        currentPath={id}
        hackathons={hackathons}
        navbarItems={HACKATHON_NAVBAR}
        >
            <Card>
                <CardHeader>
                    <CardTitle>componentStyling for {id}</CardTitle>
                    <CardContent>{JSON.stringify(buildConfig.componentStyling)}</CardContent>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>globalStyling for {id}</CardTitle>
                    <CardContent>{JSON.stringify(buildConfig.globalStyling)}</CardContent>
                </CardHeader>
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