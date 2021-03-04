import React, { useContext, useEffect, useState } from 'react';
import DefaultSelect from '../Inputs/CustomSelect/DefaultSelect';
import CustomSelectWrapper from '../Inputs/CustomSelect/CustomSelectWrapper';
import MembershipFeeTable from './MembershipFeeTable';
import MembershipContext from '../../../Context/MembershipContext';
import Loading from '../../Loading/Loading';
import { api_prefix_form, FETCH_HEADER, membership_levels, newForm_tempId, getCurrentMode, MODE_REACT_ONLY, MODE_REACT_API } from '../../../Constants/Constants';

const MembershipLevel = ({ formField, ...otherProps }) => {

  const { currentFormId } = useContext(MembershipContext);

  const { membershipLevel } = formField;

  const [ loading, setLoading ] = useState(true);

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {

    let url_prefix_local;
    let url_suffix_local = '';
    if ( getCurrentMode() === MODE_REACT_ONLY ) {
      url_prefix_local = 'membership_data';
      url_suffix_local = '/form.json';
    }

    if (getCurrentMode() === MODE_REACT_API) {
      url_prefix_local = api_prefix_form;
    }

    if (currentFormId && currentFormId !== newForm_tempId) {
      fetch(url_prefix_local + `/${currentFormId}` + url_suffix_local, { headers : FETCH_HEADER })
      .then(resp => resp.json())
      .then(data => {
        if(data) {
          otherProps.parentState.formik.setFieldValue(membershipLevel.name, data[0]?.membership_level);
        }
        setLoading(false);
      })
    } else {
      setLoading(false);
    }

    // eslint-disable-next-line
  }, [])
  
  if (loading) {
    return <Loading />
  }

  return (
    <>
    <div className="align-center">
      <h2 className="fw-600">Membership Level</h2>
      <p>Please Indicate the class of membership for which you are applying</p>
      <h3 className="fw-600">What is your intended Membership Level?</h3>
      <div className="row">
        <div className="col-md-12">
          <CustomSelectWrapper
            name={membershipLevel.name}
            renderComponent={DefaultSelect}
            options={membership_levels}
          />
        </div>
      </div>
      <MembershipFeeTable />
      </div>
    </>
  );
};

export default MembershipLevel