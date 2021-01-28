import { useState } from 'react';
import Page from '../../components/page';
import Card, {
    CardHeader,
    CardTitle,
    CardContent,
  } from '../../components/card';
import { HACKATHON_NAVBAR } from '../../constants';
import {
    db,
    getHackathonPaths,
    getHackathons,
  } from '../../utility/firebase';
  
export default function BuildConfig({id, hackathons}) {
    const [buildConfig, setBuildConfig] = useState({});

    db.collection('Hackathons').doc(id).onSnapshot(doc => {
        setBuildConfig(doc.data().BuildConfig)
    })  

    return(
        <Page
        currentPath={id}
        hackathons={hackathons}
        navbarItems={HACKATHON_NAVBAR}
        >     
            {buildConfig === null || buildConfig === undefined ? 
                <Card>
                    <CardHeader>
                        <CardTitle>
                            No BuildConfig for {id}
                        </CardTitle>
                    </CardHeader>                    
                </Card>
                :
                [buildConfig.componentStyling === null || buildConfig.componentStyling === undefined ?
                <Card>
                    <CardHeader>
                        <CardTitle>
                            No componentStyling for {id}
                        </CardTitle>
                    </CardHeader>
                </Card>
                :
                Object.entries(buildConfig.componentStyling).map(([key, val]) => 
                <Card>
                    <CardHeader>
                        <CardTitle>{key}</CardTitle>
                    </CardHeader>
                    <CardContent><pre>{JSON.stringify(val, null, 2)}</pre></CardContent>
                </Card>
                ),

                buildConfig.globalStyling === null || buildConfig.componentStyling === undefined ? 
                <Card>
                    <CardHeader>
                        <CardTitle>
                            No globalStyling for {id}
                        </CardTitle>
                    </CardHeader>
                </Card>
                :
                <Card>
                    <CardHeader>
                        <CardTitle>globalStyling</CardTitle>                    
                    </CardHeader>
                    <CardContent><pre>{JSON.stringify(buildConfig.globalStyling, null, 2)}</pre></CardContent>
                </Card>
                ]
                
            }
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