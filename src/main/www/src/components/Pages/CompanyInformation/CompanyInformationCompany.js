import React, { useEffect, useState } from 'react';
// import CustomSelectWrapper from '../../UIComponents/Inputs/CustomSelect/CustomSelectWrapper';
// import DefaultSelect from '../../UIComponents/Inputs/CustomSelect/DefaultSelect';
// import CustomAsyncSelect from '../../UIComponents/Inputs/CustomSelect/CustomAsyncSelect';
import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formModels/formFieldModel';
import { FETCH_HEADER } from '../../../Constants/Constants';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { makeStyles, TextField } from '@material-ui/core';

/**
 * Render Oraganization selector (used React-Select)
 *
 * Render Organization twitter, and address inputs,
 * including Country selector (used React-Select
 * and country-list library of updated
 * correct country list names)
 */

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: 14,
    marginTop: 6,
    backgroundColor: 'white',
  },
}));
const filter = createFilterOptions();

const CompanyInformationCompany = () => {
  const [companyInputValue, setCompanyInputValue] = useState('');
  const [companyList, setCompanyList] = useState([]);
  const classes = useStyles();
  const { organizationName, organizationTwitter, organizationAddress } =
    formField;

  // get country list library and map as option pass to the React-Select
  const countryList = require('country-list')
    .getNames()
    .map((item) => ({ label: item, value: item }));

  const getCompanyList = () => {
    let src_data = 'companies.json';
    fetch(src_data, { headers: FETCH_HEADER })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.companies) {
          const theCompanyList = data.companies.map((item) => ({
            value: item.legalName,
            label: item.legalName,
            address: item.address,
            twitterHandle: item.twitterHandle,
          }));
          setCompanyList(theCompanyList);
        }
      });
  };

  const renderAutocompleteForCompanies = () => (
    <Autocomplete
      value={companyInputValue}
      options={companyList}
      freeSolo
      fullWidth={true}
      selectOnFocus
      clearOnBlur
      // getOptionLabel={(option) => option.label}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.label;
      }}
      renderOption={(option) => option.label}
      onChange={(event, newValue) => {

        if (typeof newValue === 'string') {
          setCompanyInputValue({
            label: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setCompanyInputValue({
            label: newValue.inputValue,
          });
        } else {
          setCompanyInputValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const companyExists = !!companyList.find(
          (company) => company.label === params.inputValue
        );
        // Suggest the creation of a new value
        if (params.inputValue !== '' && !companyExists) {
          filtered.push({
            inputValue: params.inputValue,
            label: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select"
          placeholder="Select..."
          variant="outlined"
          size="small"
          required={true}
          className={classes.textField}
        />
      )}
    />
  );

  useEffect(() => {
    // Not sure why we should do this.
    // Like only show the company options when user type in something,
    // instead of showing everything when user focus on the input.
    // promiseOptions(companyInputValue);

    getCompanyList();
  }, []);

  return (
    <>
      <h2 className="fw-600 h4" id={organizationName.name}>
        Organization <span className="orange-star">*</span>
      </h2>
      {/* <CustomSelectWrapper
        name={organizationName.name}
        ariaLabel={organizationName.name}
        srcData={companies}
        renderComponent={CustomAsyncSelect}
      /> */}
      {renderAutocompleteForCompanies()}
      <div className="row">
        <div className="col-md-8">
          <Input
            name={organizationTwitter.name}
            labelName={organizationTwitter.label}
            placeholder={organizationTwitter.placeholder}
          />
        </div>
      </div>

      <h4 className="fw-600">Address</h4>
      <div className="row">
        <div className="col-md-16">
          <Input
            name={organizationAddress.street.name}
            labelName={organizationAddress.street.label}
            placeholder={organizationAddress.street.placeholder}
            requiredMark={true}
          />
        </div>
        <div className="col-md-8">
          <Input
            name={organizationAddress.city.name}
            labelName={organizationAddress.city.label}
            placeholder={organizationAddress.city.placeholder}
            requiredMark={true}
          />
        </div>
      </div>

      <div className="row margin-bottom-40">
        <div className="col-md-8">
          <Autocomplete
            options={countryList}
            getOptionLabel={(option) => option.label}
            fullWidth={true}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                placeholder="Country"
                variant="outlined"
                size="small"
                required={true}
                className={classes.textField}
              />
            )}
          />
        </div>
        <div className="col-md-8">
          <Input
            name={organizationAddress.provinceOrState.name}
            labelName={organizationAddress.provinceOrState.label}
            placeholder={organizationAddress.provinceOrState.placeholder}
            requiredMark={true}
          />
        </div>
        <div className="col-md-8">
          <Input
            name={organizationAddress.postalCode.name}
            labelName={organizationAddress.postalCode.label}
            placeholder={organizationAddress.postalCode.placeholder}
            requiredMark={true}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyInformationCompany;
