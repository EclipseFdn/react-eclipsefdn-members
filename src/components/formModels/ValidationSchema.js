import * as yup from "yup";
import { requiredErrorMsg } from './formFieldModel';

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
// } = initialValues;

export const validationSchema = [
  // First step - company Info
  yup.object().shape({
    organization: yup.object().shape({
        legalName: yup.string().required(`${requiredErrorMsg}`),
        address: yup.object().shape({
            street: yup.string().required(`${requiredErrorMsg}`),
            city: yup.string().required(`${requiredErrorMsg}`),
            provinceOrState: yup.string().required(`${requiredErrorMsg}`),
            country: yup.string().required(`${requiredErrorMsg}`),
            postalCode: yup.string().required(`${requiredErrorMsg}`),
        })
      }),

    companyRepresentative: yup.object().shape({
        representative: yup.object().shape({
            firstName: yup.string().required(`${requiredErrorMsg}`),
            lastName: yup.string().required(`${requiredErrorMsg}`),
            jobtitle: yup.string().required(`${requiredErrorMsg}`),
            email: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address') 
        })
    }),
  }),

  // Second step - membership level
  yup.object().shape({
    membershipLevel: yup.string().required(`${requiredErrorMsg}`)
  }),

  // Third step - working groups
  yup.object().shape({
    workingGroup: yup.object().required(`${requiredErrorMsg}`),
    participationLevel: yup.string().when("workingGroup", {
      is: value => !!value?.value,
      then: yup.string().required(`${requiredErrorMsg}`)
    }),
    effectiveDate: yup.date().nullable().when("workingGroup", {
      is: value => !!value?.value,
      then: yup.date().required(`${requiredErrorMsg}`)
    }),
    wgRepresentative:yup.object().shape({
      firstName: yup.string().required(`${requiredErrorMsg}`),
      lastName: yup.string().required(`${requiredErrorMsg}`),
      jobtitle: yup.string().required(`${requiredErrorMsg}`),
      email: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address') 
    })
  })


    // // Second
    // Yup.object({
    //   [membershipLevel.name]: Yup.string().required('Required')
    // }),

    // //Third
    // Yup.object({
    //   [workingGroup.name]: Yup.string().required('Required'),
    //   // [effectiveDate.name]: Yup.string().nullable().when(`${workingGroup.name}`, {
    //   //   is: (value) => value.value !== "",
    //   //   then: Yup.string().required("Required")
    //   // }),
    //   // [wgRepresentativeFirstName.name]: Yup.string().when(`${workingGroup.name}`, {
    //   //   is: (value) => value.value !== "",
    //   //   then: Yup.string().required("Required")
    //   // }),
    //   // [wgRepresentativeLastName.name]: Yup.string().when(`${workingGroup.name}`, {
    //   //   is: (value) => value.value !== "",
    //   //   then: Yup.string().required("Required")
    //   // }),
    //   // [wgRepresentativeJobTitle.name]: Yup.string().when(`${workingGroup.name}`, {
    //   //   is: (value) => value.value !== "",
    //   //   then: Yup.string().required("Required")
    //   // }),
    //   // [wgRepresentativeEmail.name]: Yup.string().when(`${workingGroup.name}`, {
    //   //   is: (value) => value.value !== "",
    //   //   then: Yup.string().required("Required")
    //   // }),
    // }),

    // // Forth
    // Yup.object({
    //   [signingAuthority.name]: Yup.string().required('Required'),
    //   [signingAuthorityFirstName.name]: Yup.string().when(`${signingAuthority.name}`, {
    //     is: (value) => value === "noSigningAuthority",
    //     then: Yup.string().required("Please provide signing author")
    //   }),
    //   [signingAuthorityLastName.name]: Yup.string(),
    //   [signingAuthorityJobTitile.name]: Yup.string(),
    //   [signingAuthorityEmail.name]: Yup.string().when(`${signingAuthority.name}`, {
    //     is: (value) => value === "noSigningAuthority",
    //     then: Yup.string().required("Please provide signing author")
    //   }),
    // }),

    // //Fifth
    // Yup.object({}),

    // //Sixth
    // Yup.object({}),

    // // Seventh
    // Yup.object({}),
  ] 