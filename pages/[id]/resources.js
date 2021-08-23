import { useState, useEffect } from "react";
import styled from "styled-components";
import Page from "../../components/page";
import Card, { CardHeader, CardTitle } from "../../components/card";
import { getHackathonPaths, getHackathons } from "../../utility/firebase";
import { HACKATHON_NAVBAR } from "../../constants";

export default function Resources({ id, hackathons }) {
  return (
    <Page
      currentPath={id}
      hackathons={hackathons}
      navbarItems={HACKATHON_NAVBAR}
    >
      {id === "www" ? (
        <Card>
          <CardHeader>
            <CardTitle>WWW</CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Not applicable for this website</CardTitle>
          </CardHeader>
        </Card>
      )}
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
