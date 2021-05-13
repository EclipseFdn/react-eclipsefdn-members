import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

const today = new Date().toISOString().substring(0, 10);

const DateInput = ({ ariaLabel }) => {
  const classes = useStyles();

  return (
    <div className="date-input">
      <TextField
        id="date"
        type="date"
        defaultValue={today}
        className={classes.root}
        InputProps={{
          inputProps: {
            'aria-labelledby': ariaLabel,
          },
        }}
      />
    </div>
  );
};

export default DateInput;
