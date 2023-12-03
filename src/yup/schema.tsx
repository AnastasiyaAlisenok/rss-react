import * as yup from 'yup';
import { countriesOptions } from '../components/Select/options';

const validationSchema = yup
  .object({
    name: yup
      .string()
      .required('Name is a required field')
      .matches(/^[A-Za-z]+$/, 'Name should contain only English letters')
      .matches(/^[A-Z]/, 'First letter should be uppercase'),
    age: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required('Age is a required field')
      .positive('Age should be a positive number')
      .integer('Age should be a integer number')
      .min(14, 'You should be older 14 year'),
    email: yup
      .string()
      .required('Email is a required field')
      .email('Incorrect email'),
    password: yup
      .string()
      .required('Password is a required field')
      .matches(/^(?=.*\d)/, 'Password should contain at least 1 number')
      .matches(
        /^(?=.*[a-z])/,
        'Password should contain at least 1 lowercase letter'
      )
      .matches(
        /^(?=.*[A-Z])/,
        'Password should contain at least 1 uppercase letter'
      )
      .matches(
        /^(?=.*[!@#$%^&*()])/,
        'Password should contain at least 1 special character'
      )
      .min(8, 'Password should be at least 8 characters long'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is a required field')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
    gender: yup
      .string()
      .required('Gender is a required field')
      .notOneOf(['n/d'], 'Gender is a required field'),
    image: yup
      .mixed<File>()
      .required('Image is a required field')
      .test('fileSize', 'Max file size exceeded', (file): boolean => {
        let valid = true;
        if (file) {
          const size = file.size / 1024 / 1024;
          if (size > 10) {
            valid = false;
          }
        }
        return valid;
      })
      .test(
        'fileType',
        'Photo should be .jpg, .jpeg, .png extensions',
        (value) => {
          let valid = true;
          if (value) {
            const formats = ['image/jpeg', 'image/jpg', 'image/png'];
            if (formats.includes(value.type) === false) {
              valid = false;
            }
          }
          return valid;
        }
      ),
    country: yup
      .string()
      .required('Country is a required field')
      .test('Country should exist', (str) => {
        return !countriesOptions.map((obj) => obj.value).includes(str);
      }),
    accept: yup
      .boolean()
      .required()
      .test(
        'termsTest',
        'Conditions and terms should be accepted',
        (value) => value === true
      ),
  })
  .required();

export function checkIfFilesAreTooBig(files?: File[] | undefined): boolean {
  let valid = true;
  if (files) {
    files.map((file) => {
      const size = file.size / 1024 / 1024;
      if (size > 10) {
        valid = false;
      }
    });
  }
  return valid;
}

export default validationSchema;
