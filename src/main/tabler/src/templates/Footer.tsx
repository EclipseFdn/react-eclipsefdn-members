 
import React from "react";

import { Site, Grid, List, Button } from "tabler-react";

export default function Footer() {
  return (
    <Site.Footer
      links={[
        <a href="#1" key="1">
          First Link
        </a>,
        <a href="#2" key="2">
          Second Link
        </a>,
        <a href="#3" key="3">
          Third Link
        </a>,
        <a href="#4" key="4">
          Fourth Link
        </a>,
      ]}
      copyright={
        <div className="mb-2">
          Copyright © 2021<a href="."> Eclipse Foundation</a>. All Rights Reserved.
        </div>
      }
      nav={
        <Grid.Row className="mt-4 mb-4">
          <Grid.Col auto={true}>
            <Button
              href="https://twitter.com/EclipseFdn"
              size="sm"
              outline
              color="primary"
              RootComponent="a"
            >
              Twitter
            </Button>
          </Grid.Col>
          <Grid.Col auto={true}>
            <Button
              href="https://twitter.com/EclipseFdn"
              size="sm"
              outline
              color="primary"
              RootComponent="a"
            >
              Facebook
            </Button>
          </Grid.Col>
          <Grid.Col auto={true}>
            <Button
              href="https://twitter.com/EclipseFdn"
              size="sm"
              outline
              color="primary"
              RootComponent="a"
            >
              YouTube
            </Button>
          </Grid.Col>
          <Grid.Col auto={true}>
            <Button
              href="https://twitter.com/EclipseFdn"
              size="sm"
              outline
              color="primary"
              RootComponent="a"
            >
              LinkedIn
            </Button>
          </Grid.Col>
        </Grid.Row>
      }
      note="Enabling Global Collaboration on Open Source Innovation"
    />
  );
};