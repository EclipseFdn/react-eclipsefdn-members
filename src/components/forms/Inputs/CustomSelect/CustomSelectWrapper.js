import React from 'react';
import { Field } from 'formik';

const CustomSelectWrapper = ({ name, srcData, isExistingMember, setDisableInput, organiazationData, renderComponent }) => {

  return (
    <Field
      name={name}
      component={renderComponent}
      srcData={srcData}
      isExistingMember={isExistingMember}
      setDisableInput={setDisableInput}
      organiazationData={organiazationData}
    />
  )
}

export default CustomSelectWrapper