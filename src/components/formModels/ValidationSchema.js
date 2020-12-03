import * as Yup from "yup";
import { formField } from './formFieldModel';

const {
  organizationName,
  street,
  city,
  provinceOrState,
  country,
  postalCode,
  // twitterHandle,
  companyRepresentativeFirstName,
  companyRepresentativeLastName,
  companyRepresentativeEmail,
  membershipLevel,
  workingGroup,
  // participationLevel,
  // effectiveDate,
  // wgRepresentativeFirstName,
  // wgRepresentativeLastName,
  // wgRepresentativeJobTitle,
  // wgRepresentativeEmail,
  signingAuthority,
  signingAuthorityFirstName,
  signingAuthorityLastName,
  signingAuthorityJobTitile,
  signingAuthorityEmail
} = formField;

export const validationSchema = [
  // First step
    Yup.object({
      [organizationName.name]: Yup.string().required(`${organizationName.requiredErrorMsg}`),
      [street.name]: Yup.string().required(`${street.requiredErrorMsg}`),
      [city.name]: Yup.string().required(`${city.requiredErrorMsg}`),
      [provinceOrState.name]: Yup.string().required(`${provinceOrState.requiredErrorMsg}`),
      [country.name]: Yup.string().required(`${country.requiredErrorMsg}`),
      [postalCode.name]: Yup.string()
        .required(`${street.requiredErrorMsg}`),
        // .test(
        //   'len',
        //   `${postalCode.invalidErrorMsg}`,
        //   val => val && val.length === 5
        // ),
      [companyRepresentativeFirstName.name]: Yup.string().required(`${companyRepresentativeFirstName.requiredErrorMsg}`),
      [companyRepresentativeLastName.name]: Yup.string().required(`${companyRepresentativeLastName.requiredErrorMsg}`),
      [companyRepresentativeEmail.name]: Yup.string()
        .required(`${companyRepresentativeEmail.requiredErrorMsg}`)
        .email('Invalid email address')
    }),

    // Second
    Yup.object({
      [membershipLevel.name]: Yup.string().required('Required')
    }),

    //Third
    Yup.object({
      [workingGroup.name]: Yup.string().required('Required'),
      // [effectiveDate.name]: Yup.string().nullable().when(`${workingGroup.name}`, {
      //   is: (value) => value.value !== "",
      //   then: Yup.string().required("Required")
      // }),
      // [wgRepresentativeFirstName.name]: Yup.string().when(`${workingGroup.name}`, {
      //   is: (value) => value.value !== "",
      //   then: Yup.string().required("Required")
      // }),
      // [wgRepresentativeLastName.name]: Yup.string().when(`${workingGroup.name}`, {
      //   is: (value) => value.value !== "",
      //   then: Yup.string().required("Required")
      // }),
      // [wgRepresentativeJobTitle.name]: Yup.string().when(`${workingGroup.name}`, {
      //   is: (value) => value.value !== "",
      //   then: Yup.string().required("Required")
      // }),
      // [wgRepresentativeEmail.name]: Yup.string().when(`${workingGroup.name}`, {
      //   is: (value) => value.value !== "",
      //   then: Yup.string().required("Required")
      // }),
    }),

    // Forth
    Yup.object({
      [signingAuthority.name]: Yup.string().required('Required'),
      [signingAuthorityFirstName.name]: Yup.string().when(`${signingAuthority.name}`, {
        is: (value) => value === "noSigningAuthority",
        then: Yup.string().required("Please provide signing author")
      }),
      [signingAuthorityLastName.name]: Yup.string(),
      [signingAuthorityJobTitile.name]: Yup.string(),
      [signingAuthorityEmail.name]: Yup.string().when(`${signingAuthority.name}`, {
        is: (value) => value === "noSigningAuthority",
        then: Yup.string().required("Please provide signing author")
      }),
    }),

    //Fifth
    Yup.object({}),

    //Sixth
    Yup.object({}),

    // Seventh
    Yup.object({}),
  ] 