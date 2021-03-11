import React from 'react';
import clsx from 'clsx';
import {
  CssBaseline,
  Drawer,
  Link,
  AppBar,
  Container,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import {
  mainListItems,
  secondaryListItems
} from './template/MenuIcons';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Organization from './pages/Organization';
import StylesBase from './styles/StylesBase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://eclipse.org/">
        Eclipse Foundation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  const classes = StylesBase();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router
      hashType="noslash">
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Memberhip Dashboard
          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route path="/organization">
                <Organization text="organizations"/>
              </Route>
              <Route path="/employees">
                <Employees className={classes.textGutter}/>
              </Route>
              <Route path="/integrations">
                <Home text="Integrations"/>
              </Route>
              <Route path="/projects">
                <Home text="Projects"/>
              </Route>
              <Route path="/">
                <Home text="Home page"/>
              </Route>
            </Switch>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </Router>
  );
}
