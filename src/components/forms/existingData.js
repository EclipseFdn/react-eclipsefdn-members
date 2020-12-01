import { formField } from '../formModels/formFieldModel';

const {
  organizationName,
  street,
  city,
  provinceOrState,
  country,
  postalCode,
  twitterHandle,
  companyRepresentativeFirstName,
  companyRepresentativeLastName,
  companyRepresentativeEmail,
  marketingRepresentativeFirstName,
  marketingRepresentativeLastName,
  marketingRepresentativeEmail,
  accountingRepresentativeFirstName,
  accountingRepresentativeLastName,
  accountingRepresentativeEmail,
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

export const existingInitialValues = {
  [organizationName.name]: "OrgA",
  [street.name]: "11 Alberta",
  [city.name]: "Ottawa",
  [provinceOrState.name]: "ON",
  [country.name]: "CA",
  [postalCode.name]: "70000",
  [twitterHandle.name]: "@abcd",
  [companyRepresentativeFirstName.name]: "Alice",
  [companyRepresentativeLastName.name]: "White",
  [companyRepresentativeEmail.name]: "A@w.ca",
  [marketingRepresentativeFirstName.name]: "",
  [marketingRepresentativeLastName.name]: "",
  [marketingRepresentativeEmail.name]: "",
  [accountingRepresentativeFirstName.name]: "",
  [accountingRepresentativeLastName.name]: "",
  [accountingRepresentativeEmail.name]: "",
  [membershipLevel.name]: "l2",
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