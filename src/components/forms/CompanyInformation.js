import React from "react";
import { Field } from "formik";
// import * as Yup from "yup";

const CompanyInformation = () => {
  return (
    
    <>
      <h3>Confirm/Complete your Company’s Information</h3>
      <hr />
      <label htmlFor="organizationName">Legal Name of the Organization</label><br />
      <Field name="organizationName">
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <div>
            <input className="form-control" type="text" placeholder="Legal Name of the Organization" {...field} />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )}
       </Field>

      <h5>Address</h5>
      <label htmlFor="street">Street</label><br />
      {/* <Field name="street" label="Street" component="input" type="text" /><br /> */}
      <Field name="street">
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <div>
            <input className="form-control" type="text" placeholder="Street" {...field} />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )}
       </Field>

      <label htmlFor="city">City</label><br />
      <Field name="city">
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <div>
            <input className="form-control" type="text" placeholder="City" {...field} />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )}
       </Field>

      <label htmlFor="provinceOrState">Province/State</label><br />
      <Field name="provinceOrState">
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <div>
            <input className="form-control" type="text" placeholder="province/State" {...field} />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )}
       </Field>

      <label htmlFor="country">Country</label><br />
      <Field name="country">
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <div>
            <input className="form-control" type="text" placeholder="Country" {...field} />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )}
       </Field>

      <label htmlFor="postalCode">Postal Code</label><br />
      <Field name="postalCode">
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <div>
            <input className="form-control" type="text" placeholder="Postal Code" {...field} />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )}
       </Field>

      <label htmlFor="twitterHandle">Twitter Handle</label><br />
      <Field name="twitterHandle">
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <div>
            <input className="form-control" type="text" placeholder="Twitter" {...field} />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )}
       </Field>

      <h5>Company Representative, Marketing Representative, Accounting Contact</h5>
      <label htmlFor="representativeFirstName">Representative First Name</label><br />
      <Field name="representativeFirstName">
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <div>
            <input className="form-control" type="text" placeholder="Representative First Name" {...field} />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )}
       </Field>

      <label htmlFor="representativeLastName">Representative Last Name</label><br />
      <Field name="representativeLastName">
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <div>
            <input className="form-control" type="text" placeholder="Representative Last Name" {...field} />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )}
       </Field>

      <label htmlFor="representativeEmail">Representative Email</label><br />
      <Field name="representativeEmail">
        {({
          field,
          form: { touched, errors },
          meta,
        }) => (
          <div>
            <input className="form-control" type="text" placeholder="Representative Email" {...field} />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div>
        )}
       </Field>
      
    </>
  );
};

export default CompanyInformation
