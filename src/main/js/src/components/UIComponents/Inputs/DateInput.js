import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './dateInput.css';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
}));

const today = new Date().toISOString().substring(0, 10);

const DateInput = (props) => {
  const { label, name, ...rest } = props;
  const classes = useStyles();

  return (
    <div className="date-input">
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          type="date"
          defaultValue={today}
          className={classes.textField}
        />
      </form>
    </div>
  );
};

export default DateInput;
