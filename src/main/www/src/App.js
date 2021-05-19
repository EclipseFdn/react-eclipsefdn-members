import React, { useEffect, useState } from 'react';
import './App.css';
import AppFooter from './components/UIComponents/layout/AppFooter';
import AppHeader from './components/UIComponents/layout/AppHeader';
import MembershipContext from './Context/MembershipContext';
import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import MultiStepForm from './components/UIComponents/FormComponents/MultiStepForm';
import SignIn from './components/Pages/SignIn/SignIn';
import {
  COMPANY_INFORMATION,
  MEMBERSHIP_LEVEL,
  REVIEW,
  SIGNING_AUTHORITY,
  WORKING_GROUPS,
  fakeChildrenArray,
} from './Constants/Constants';
import {
  formField,
  initialValues,
} from './components/UIComponents/FormComponents/formModels/formFieldModel';
import CompanyInformation from './components/Pages/CompanyInformation/CompanyInformation';
import MembershipLevel from './components/Pages/MembershipLevel/MembershipLevel';
import WorkingGroupsWrapper from './components/Pages/WorkingGroups/WorkingGroupsWrapper';
import SigningAuthority from './components/Pages/SigningAuthority/SigningAuthority';
import Review from './components/Pages/Review/Review';
import Step from './components/UIComponents/Steppers/Step';
import SignInIntroduction from './components/Pages/SignIn/SignInIntroduction';
import SubmitSuccess from './components/UIComponents/FormComponents/SubmitSuccess';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f7941e',
      contrastText: '#fff', // for button text color
    },
  },
});

const PATH_NAMES = [
  '/',
  '/company-info',
  '/membership-level',
  '/working-groups',
  '/signing-authority',
  '/review',
  '/submitted',
];

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentFormId, setCurrentFormId] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const renderStepper = () => (
    <div className="stepper">
      {currentPage === 0 ? <SignInIntroduction /> : null}

      <Step title="Sign In" index={-1} currentStep={-1} />
      {fakeChildrenArray.map((child, index) => {
        return (
          <Step
            key={index}
            title={child.props.label}
            index={index}
            currentStep={-1}
          />
        );
      })}
    </div>
  );

  const renderNavigations = () => (
    <>
      <Router>
        {renderStepper()}
        <Switch>
          <Route exact path="/">
            <SignIn
              formField={formField}
              label={COMPANY_INFORMATION}
              setCurrentPage={setCurrentPage}
            />
          </Route>
          <Route path="/company-info">
            <CompanyInformation
              formField={formField}
              label={COMPANY_INFORMATION}
              setCurrentPage={setCurrentPage}
            />
          </Route>

          <Route path="/membership-level">
            <MembershipLevel formField={formField} label={MEMBERSHIP_LEVEL} />
          </Route>

          <Route path="/working-groups">
            <WorkingGroupsWrapper
              formField={formField}
              label={WORKING_GROUPS}
            />
          </Route>

          <Route path="/signing-authority">
            <SigningAuthority formField={formField} label={SIGNING_AUTHORITY} />
          </Route>

          <Route path="/review">
            <Review formField={formField} label={REVIEW} />
          </Route>

          <Route path="/submitted">
            <SubmitSuccess />
          </Route>
        </Switch>
      </Router>
    </>
  );

  useEffect(() => {
    setCurrentPage(0);
    console.log(currentPage);
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppHeader />
        <MembershipContext.Provider
          value={{
            currentUser,
            setCurrentUser: (val) => setCurrentUser(val),
            currentFormId,
            setCurrentFormId: (val) => setCurrentFormId(val),
          }}
        >
          <div className="container eclipseFdn-membership-webform">
            {/* {currentUser && currentFormId ? <MultiStepForm /> : <SignIn />} */}
            {renderNavigations()}
          </div>
        </MembershipContext.Provider>
        <AppFooter />
      </ThemeProvider>
    </div>
  );
};

export default App;
