import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
// May require update to use included local copy of fixed CSS
import "tabler-react/dist/Tabler.css";
import {
  Page,
  Button,
  Grid,
  Card,
  El
} from "tabler-react";
import Header from './templates/Header';
import Footer from './templates/Footer';

export default function App() {
  return (
    <Router
      hashType="noslash">
      <Page>
        <Page.Main>
          <Header />
          <Switch>
            <Route path="/organization">
              <div>organization</div>
            </Route>
            <Route path="/employees">
              <div>employees</div>
            </Route>
            <Route path="/integrations">
              <div>integrations</div>
            </Route>
            <Route path="/projects">
              <div>projects</div>
            </Route>
            <Route path="/">
              <Page.Content title="Dashboard">
                <Grid.Row cards gutters="lg">
                  <Grid.Col md={6} sm={12} xs={12}>
                    <Card>
                      <Card.Header>
                        <Card.Title>Card Title</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <React.Fragment>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida, arcu sit amet faucibus dignissim, ante sem commodo massa, porttitor fringilla nibh massa convallis turpis. Donec id neque vel lacus laoreet tincidunt ut a neque. Mauris ac aliquam arcu, sed tempor dolor. Donec eu orci pulvinar, ultrices sem sed, blandit dolor. Mauris et diam at lacus dignissim auctor sed vitae lectus. Vivamus laoreet sollicitudin nibh at rhoncus. Sed non odio vitae tellus consectetur facilisis sed vitae ipsum. Proin lobortis mauris ut viverra cursus. Integer maximus id ante vitae iaculis. Maecenas at felis nec velit pretium facilisis vel vel mauris. In placerat congue enim sit amet venenatis. Integer dignissim tincidunt nibh sed cursus. Donec nec nisl lectus.
                        </p>
                        </React.Fragment>
                        <Button color="primary">A Button</Button>
                      </Card.Body>
                    </Card>
                  </Grid.Col>
                  <Grid.Col md={6} sm={12} xs={12}>
                    <Card>
                      <Card.Header>
                        <Card.Title>Card Title</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Button color="primary">A Button</Button>
                      </Card.Body>
                    </Card>
                  </Grid.Col>
                </Grid.Row>
              </Page.Content>
            </Route>
          </Switch>
          <Footer />
        </Page.Main>
      </Page>
    </Router>
  );
}
