import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
    '& div.MuiInputBase-root': {
      fontSize: 14,
    },
  },
}));

const today = new Date().toISOString().substring(0, 10);

const DateInput = (props) => {
  const { label, name, ...rest } = props;
  const classes = useStyles();

  return (
    <div className="date-input">
      <form className={classes.root} noValidate>
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
