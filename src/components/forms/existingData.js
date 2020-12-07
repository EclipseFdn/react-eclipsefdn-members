// import { formField } from '../formModels/formFieldModel';

// const {
//   organization,
//   companyRepresentative,
//   membershipLevel,
//   workingGroup,
//   participationLevel,
//   effectiveDate,
//   wgRepresentative,
//   signingAuthority,
//   signingAuthorityRepresentative
// } = formField;

export const existingInitialValues = {

  // Step1: company Info
  organization: {
    legalName: "company A",
    address: {
      street: "111 Abc Street",
      city: "Ottawa",
      provinceOrState: "Ontario",
      country: "Canada",
      postalCode: "K1S 6N5"
    },
    twitterHandle: "@companyA",
  },

  // Step1: Company Representative
  companyRepresentative: {
    representative: {
      firstName: "Annie",
      lastName: "Blair",
      jobtitle: "Marketing Lead",
      email: "Annie@marketing.com"
    },

    marketingRepresentative: {
      firstName: "",
      lastName: "",
      jobtitle: "",
      email: ""
    },

    accounting: {
      firstName: "",
      lastName: "",
      jobtitle: "",
      email: ""
    }
  },

  // Step 2
  membershipLevel: "l2",

  // Step 3: working groups
  workingGroup: "",
  participationLevel: "",
  effectiveDate: "",
  wgRepresentative: {
    firstName: "",
    lastName: "",
    jobtitle: "",
    email: ""
  },

  signingAuthority: "",

  signingAuthorityRepresentative: {
    firstName: "",
    lastName: "",
    jobtitle: "",
    email: ""
  }

};