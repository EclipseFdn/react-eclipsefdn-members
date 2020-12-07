// const firstName = "First Name"
// const lastName = "Last Name"
// const email = "Email Address"
// const orgName = "Organization Name"
// const jobtitle = "Job Title"
// const requiredErrorMsg = "is required"

export const formField = {

  // Step1: company Info
  organization: {
    legalName: "",
    address: {
      street: "",
      city: "",
      provinceOrState: "",
      country: "",
      postalCode: ""
    },
    twitterHandle: "",  
  },

  // Step1: Company Representative
  companyRepresentative: {
    representative: {
      firstName: "",
      lastName: "",
      jobtitle: "",
      email: ""
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
  membershipLevel: "",

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

}

export function mapField(object) {
  let arr = []
  for(const property in object) {
    arr.push(property)
  }

  return arr
}