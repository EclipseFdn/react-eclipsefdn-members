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
  representativeFirstName,
  representativeLastName,
  representativeEmail,
  membershipLevel,
  workingGroup,
  // participationLevel,
  effectiveDate
} = formField;

export const validationSchema = [
    Yup.object({
      [organizationName.name]: Yup.string().required(`${organizationName.requiredErrorMsg}`),
      [street.name]: Yup.string().required(`${street.requiredErrorMsg}`),
      [city.name]: Yup.string().required(`${city.requiredErrorMsg}`),
      [provinceOrState.name]: Yup.string().required(`${provinceOrState.requiredErrorMsg}`),
      [country.name]: Yup.string().required(`${country.requiredErrorMsg}`),
      [postalCode.name]: Yup.string()
        .required(`${street.requiredErrorMsg}`)
        .test(
          'len',
          `${postalCode.invalidErrorMsg}`,
          val => val && val.length === 5
        ),
      [representativeFirstName.name]: Yup.string().required(`${representativeFirstName.requiredErrorMsg}`),
      [representativeLastName.name]: Yup.string().required(`${representativeLastName.requiredErrorMsg}`),
      [representativeEmail.name]: Yup.string()
        .required(`${representativeEmail.requiredErrorMsg}`)
        .email('Invalid email address')
    }),
    Yup.object({
      [membershipLevel.name]: Yup.string().required('Required')
    }),
    Yup.object({
      [workingGroup.name]: Yup.string().required('Required'),
    }),
    Yup.object({}),
    Yup.object({
      [effectiveDate.name]: Yup.string()
        .required('Required')
        .nullable()
    })
  ] 