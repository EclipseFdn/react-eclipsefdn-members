import React from "react";
import { Field } from "formik";
import TextField from "@material-ui/core/TextField";
import { useStyles } from './formStyles';

const FormFirstStep = () => {
  const classes = useStyles()
  return (
    <div className={classes.form}>
      <Field
        name="firstName"
        label="First Name"
        as={TextField}
      />

      <Field name="middleName" label="Middle Name" as={TextField} />

      <Field
        name="lastName"
        label="Last Name"
        as={TextField}
      />
    </div>
  );
};

export default FormFirstStep
