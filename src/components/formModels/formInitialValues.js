import { formField } from './formFieldModel';

const {
  organizationName,
  street,
  city,
  provinceOrState,
  country,
  postalCode,
  twitterHandle,
  representativeFirstName,
  representativeLastName,
  representativeEmail,
  membershipLevel,
  workingGroup,
  participationLevel,
  effectiveDate,
  wgRepresentativeFirstName,
  wgRepresentativeLastName,
  wgRepresentativeJobTitle,
  wgRepresentativeEmail,
  signingAuthority,
  signingAuthorityFirstName,
  signingAuthorityLastName,
  signingAuthorityJobTitile,
  signingAuthorityEmail
} = formField;

export const initialValues = {
  [organizationName.name]: "",
  [street.name]: "",
  [city.name]: "",
  [provinceOrState.name]: "",
  [country.name]: "",
  [postalCode.name]: "",
  [twitterHandle.name]: "",
  [representativeFirstName.name]: "",
  [representativeLastName.name]: "",
  [representativeEmail.name]: "",
  [membershipLevel.name]: "",
  [workingGroup.name]: "",
  [participationLevel.name]: "",
  [effectiveDate.name]: null,
  [wgRepresentativeFirstName.name]: "",
  [wgRepresentativeLastName.name]: "",
  [wgRepresentativeJobTitle.name]: "",
  [wgRepresentativeEmail.name]: "",
  [signingAuthority.name]: "",
  [signingAuthorityFirstName.name]: "",
  [signingAuthorityLastName.name]: "",
  [signingAuthorityJobTitile.name]: "",
  [signingAuthorityEmail.name]: ""
};