import React from 'react';
// import { Field } from 'formik';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

/**
 * A simple reusable Input wrapped with Formik Field
 * The value is normally a string of what the user entered
 *
 * Props:
 *    - name: Field Name
 *    - labelName: label to be shown on top of the input box
 *    - ariaLabel: for Accessbility
 *    - placeholder: placeholder in the input box
 *    - disableInput: boolean, whether this input is disabled or not; use cases: marketing representative info and accounting representative info are disabled when select the same as company representative
 *    - requiredMark: boolean, whether to show an orange star span with the label
 */

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 14,
    marginTop: 6,
    backgroundColor: 'white',
  },
}));

export default function Input(props) {
  const {
    name,
    labelName,
    ariaLabel,
    placeholder,
    disableInput,
    requiredMark,
  } = props;
  const classes = useStyles();

  return (
    <TextField
      name={name}
      required={requiredMark}
      disabled={disableInput}
      size="small"
      variant="outlined"
      className={classes.root}
      label={labelName}
      fullWidth={true}
      placeholder={placeholder}
      InputProps={{
        inputProps: {
          'aria-labelledby': ariaLabel,
        },
      }}
    />
  );
}

// const oldInput = ({
//   name,
//   labelName,
//   ariaLabel,
//   placeholder,
//   disableInput,
//   requiredMark,
// }) => {
//   return (
//     <>
//       <label htmlFor={ariaLabel ? ariaLabel : name}>{labelName}</label>
//       {requiredMark && <span className="orange-star margin-left-5">*</span>}
//       <br />
//       <Field name={name}>
//         {({ field, form: { touched, errors }, meta }) => {
//           return (
//             <>
//               <input
//                 {...field}
//                 id={ariaLabel ? ariaLabel : name}
//                 className={`form-control margin-bottom-10 ${
//                   meta.touched && meta.error ? 'form-border-error' : ''
//                 }`}
//                 type="text"
//                 placeholder={placeholder}
//                 disabled={disableInput}
//               />
//             </>
//           );
//         }}
//       </Field>
//     </>
//   );
// };

// export default Input;
