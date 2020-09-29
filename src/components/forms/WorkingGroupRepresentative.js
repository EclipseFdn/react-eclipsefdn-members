import React from "react";
import Input from './Inputs/Input';

const WorkingGroupRepresentative = ({ formField }) => {

  const {
    wgRepresentativeFirstName,
    wgRepresentativeLastName,
    wgRepresentativeJobTitle,
    wgRepresentativeEmail
  } = formField;
  
  return (
    <>
      <h3>Who is the working group representative?</h3>
      <hr />
      <Input name={wgRepresentativeFirstName.name} labelName={wgRepresentativeFirstName.label} placeholder={wgRepresentativeFirstName.placeholder} />
      <Input name={wgRepresentativeLastName.name} labelName={wgRepresentativeLastName.label} placeholder={wgRepresentativeLastName.placeholder} />
      <Input name={wgRepresentativeJobTitle.name} labelName={wgRepresentativeJobTitle.label} placeholder={wgRepresentativeJobTitle.placeholder} />
      <Input name={wgRepresentativeEmail.name} labelName={wgRepresentativeEmail.label} placeholder={wgRepresentativeEmail.placeholder} />
    </>
  );
};
  
export default WorkingGroupRepresentative