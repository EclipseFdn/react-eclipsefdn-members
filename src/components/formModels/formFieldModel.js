const firstName = "First Name"
const lastName = "Last Name"
const email = "Email Address"
const orgName = "Organization Name"
const jobtitle = "Job Title"

export const formField = {
  organizationName: {
    name: 'organizationName',
    label: 'Organization Name*',
    placeholder: orgName,
    requiredErrorMsg: 'Organization name is required'
  },
  street: {
    name: 'street',
    label: 'Street*',
    placeholder: "Street",
    requiredErrorMsg: 'required'
  },
  city: {
    name: 'city',
    label: 'City*',
    placeholder: "City",
    requiredErrorMsg: 'required'
  },
  provinceOrState: {
    name: 'provinceOrState',
    label: 'Province or State*',
    placeholder: "Province or State",
    requiredErrorMsg: 'required'
  },
  country: {
    name: 'country',
    label: 'Country*',
    placeholder: "Country",
    requiredErrorMsg: 'required'
  },
  postalCode: {
    name: 'postalCode',
    label: 'PostalCode*',
    placeholder: "PostalCode",
    requiredErrorMsg: 'PostalCode is required',
    invalidErrorMsg: 'PostalCode is not valid (e.g. 70000)'
  },
  twitterHandle: {
    name: 'twitterHandle',
    label: 'Twitter Handle',
    placeholder: "Twitter",
  },
  representativeFirstName: {
    name: 'representativeFirstName',
    label: 'representative First Name',
    placeholder: firstName,
    requiredErrorMsg: 'representative is required'
  },
  representativeLastName: {
    name: 'representativeLastName',
    label: 'representative Last Name',
    placeholder: lastName,
    requiredErrorMsg: 'representative is required'
  },
  representativeEmail: {
    name: 'representativeEmail',
    label: 'representative Email*',
    placeholder: email,
    requiredErrorMsg: 'representative is required',
    invalidErrorMsg: 'email format is incorrect'
  },
  membershipLevel: {
    name: 'membershipLevel',
    label: 'Membership Level*',
    requiredErrorMsg: 'Membership Level is required'
  },
  workingGroup: {
    name: 'workingGroup',
    label: 'Working Group',
    requiredErrorMsg: 'please select a working group',
  },
  participationLevel: {
    name: 'participationLevel',
    label: 'Participation Level',
  },
  effectiveDate: {
    name: "effectiveDate",
    label: 'Effective Date*',
    requiredErrorMsg: 'please select an effective date',
  },
  wgRepresentativeFirstName: {
    name: "wgRepresentativeFirstName",
    label: 'Working Group Representative First Name',
    placeholder: firstName,
  },
  wgRepresentativeLastName: {
    name: "wgRepresentativeLastName",
    label: 'Working Group Representative Last Name',
    placeholder: lastName,
  },
  wgRepresentativeJobTitle: {
    name: "wgRepresentativeJobTitle",
    label: 'Working Group Representative Job Title',
    placeholder: jobtitle,
  },
  wgRepresentativeEmail: {
    name: "wgRepresentativeEmail",
    label: 'Working Group Representative Email',
    placeholder: email,
  }, 
  signingAuthority: {
    name: "signingAuthority",
    label: "signingAuthority",
  },

  signingAuthorityFirstName: {
    name: "signingAuthorityFirstName",
    label: "signing Authority First Name",
    placeholder: firstName,
  },

  signingAuthorityLastName: {
    name: "signingAuthorityLastName",
    label: "signing Authority Last Name",
    placeholder: lastName,
  },

  signingAuthorityJobTitile: {
    name: "signingAuthorityJobTitile",
    label: "signing Authority Job Title",
    placeholder: jobtitle,
  },

  signingAuthorityEmail: {
    name: "signingAuthorityEmail",
    label: "signing Authority Email",
    placeholder: email,
  }

}