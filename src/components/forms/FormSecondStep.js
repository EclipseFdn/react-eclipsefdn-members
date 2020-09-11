import React from "react";
import { Field } from "formik";
import TextField from "@material-ui/core/TextField";
import {useStyles} from './formStyles';

const FormSecondStep = () => {
  const classes = useStyles()

  return (
    <div className={classes.form}>
      <Field
        type="email"
        name="email"
        label="Email Address"
        margin="normal"
        as={TextField}
      />

      <Field name="city" label="City" as={TextField} />

      <Field name="state" label="State" as={TextField} />
    </div>
  );
};

export default FormSecondStep
