import React, { useContext } from 'react';
import CustomSelectWrapper from '../Inputs/CustomSelect/CustomSelectWrapper';
import DefaultSelect from '../Inputs/CustomSelect/DefaultSelect';
import CustomAsyncSelect from '../Inputs/CustomSelect/CustomAsyncSelect';
import MembershipContext from '../../../Context/MembershipContext';
import Input from '../Inputs/Input';
import { formField } from '../formModels/formFieldModel';
import { companies } from '../../../Constants/Constants';

const Company = () => {
    const { isExistingMember } = useContext(MembershipContext);
    const { organizationName, organizationTwitter, organizationAddress } = formField;
    const countryList = require('country-list').getNames().map(item => ({ label: item, value: item }));

    return (
    <>
      <h4 className="fw-600"> Organization <span className="orange-star">*</span> </h4>
      <CustomSelectWrapper
        name={organizationName.name}
        srcData={companies}
        isExistingMember={isExistingMember}
        renderComponent={CustomAsyncSelect}
      />
      <div className="row">
        <div className="col-md-8">
          <Input name={organizationTwitter.name} labelName={organizationTwitter.label} placeholder={organizationTwitter.placeholder} />
        </div>
      </div>

      <h4 className="fw-600">Address</h4>
      <div className="row">
      <div className="col-md-16">
        <Input name={organizationAddress.street.name} labelName={organizationAddress.street.label} placeholder={organizationAddress.street.placeholder} requiredMark={true} />
      </div>
      <div className="col-md-8">
        <Input name={organizationAddress.city.name} labelName={organizationAddress.city.label} placeholder={organizationAddress.city.placeholder} requiredMark={true} />
      </div>
      </div>

      <div className="row margin-bottom-40">
        <div className="col-md-8">
          <label htmlFor={organizationAddress.country.name}>Country</label><span className="orange-star margin-left-5">*</span>
          <CustomSelectWrapper
            name={organizationAddress.country.name}
            renderComponent={DefaultSelect}
            options={countryList}
          />
        </div>
        <div className="col-md-8">
          <Input name={organizationAddress.provinceOrState.name} labelName={organizationAddress.provinceOrState.label} placeholder={organizationAddress.provinceOrState.placeholder} requiredMark={true} />
        </div>
        <div className="col-md-8">
          <Input name={organizationAddress.postalCode.name} labelName={organizationAddress.postalCode.label} placeholder={organizationAddress.postalCode.placeholder} requiredMark={true} />
        </div>
      </div>

    </>
    )
}

export default Company