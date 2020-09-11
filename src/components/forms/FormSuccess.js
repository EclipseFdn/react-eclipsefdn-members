import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import {useStyles} from './formStyles'

const FormSuccess = (previewData) => {
  const classes = useStyles()
  const { firstName, lastName, email, middleName, city, state } = previewData.previewData;

  return (
    <div className={classes.form}>
      <List>
        <ListItem>
          <ListItemText
            primary='First Name'
            secondary={firstName}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='Middle Name'
            secondary={middleName}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='Last Name'
            secondary={lastName}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='Email'
            secondary={email}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='City'
            secondary={city}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='State'
            secondary={state}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default FormSuccess