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
  // First step
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
  })
    // Yup.object({
    //   [organization.legalName]: Yup.string().required(`${requiredErrorMsg}`),
    //   [organization.address.street]: Yup.string().required(`${requiredErrorMsg}`),
    //   [organization.address.city]: Yup.string().required(`${requiredErrorMsg}`),
    //   [organization.address.provinceOrState]: Yup.string().required(`${requiredErrorMsg}`),
    //   [organization.address.country]: Yup.string().required(`${requiredErrorMsg}`),
    //   [organization.address.postalCode]: Yup.string().required(`${requiredErrorMsg}`),
    //   [representative.firstName]: Yup.string().required(`${requiredErrorMsg}`),
    //   [representative.lastName]: Yup.string().required(`${requiredErrorMsg}`),
    //   [representative.jobtitle]: Yup.string().required(`${requiredErrorMsg}`),
    //   [representative.email]: Yup.string().required(`${requiredErrorMsg}`).email('Invalid email address')
    // }),

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