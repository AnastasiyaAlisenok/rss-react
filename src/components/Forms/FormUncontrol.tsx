import { useRef, MutableRefObject, useState } from 'react';
import * as yup from 'yup';
import Select from '../Select/Select';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { genderOptions } from '../Select/options';
import styles from './Form.module.scss';
import FormLineUncontrol from '../FormLine/FormLineUncontrol';
import { actions } from '../../redux/Form.slice';
import SelectCountry from '../Select/SelectCountry';
import validationSchema from '../../yup/schema';
import { convertImageToBase64 } from '../utils/convertImageToBase64';

const FormUncontrol = (): React.ReactElement => {
  const nameRef = useRef<HTMLInputElement>();
  const ageRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordConfirmRef = useRef<HTMLInputElement>();
  const genderRef = useRef<HTMLSelectElement>();
  const imageRef = useRef<HTMLInputElement>();
  const countryRef = useRef<HTMLInputElement>();
  const checkedRef = useRef<HTMLInputElement>();
  const [country, setCountry] = useState('');
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async (): Promise<void> => {
    if (imageRef.current?.files) {
      const obj = {
        name: nameRef.current?.value,
        age: ageRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        gender: genderRef.current?.value,
        accept: checkedRef.current?.checked,
        image: imageRef.current?.files[0],
        country: countryRef.current?.value,
      };
      try {
        validationSchema.validateSync(obj, { abortEarly: false });
        if (imageRef.current?.files) {
          const image = await convertImageToBase64(imageRef.current?.files[0]);
          dispatch(
            actions.setFormData({
              name: nameRef.current?.value,
              age: ageRef.current?.value,
              email: emailRef.current?.value,
              password: passwordRef.current?.value,
              gender: genderRef.current?.value,
              accept: checkedRef.current?.checked,
              image: image,
              country: countryRef.current?.value,
            })
          );
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        if (error instanceof yup.ValidationError) {
          const errors: Record<string, string | undefined> = {};

          if (error.inner.length === 0) {
            errors[error.path as string] = error.message;
          } else {
            error.inner.forEach((e) => {
              const inputName = e.path as string;
              errors[inputName] = e.message;
            });
          }
          setValidationErrors(errors);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Form - used uncontrolled components</h2>
      <form className={styles.form} noValidate>
        <FormLineUncontrol
          type="text"
          text="Name"
          value={nameRef as MutableRefObject<HTMLInputElement>}
        />
        <p className={styles.error}>{validationErrors.name}</p>
        <FormLineUncontrol
          type="number"
          text="Age"
          value={ageRef as MutableRefObject<HTMLInputElement>}
        />
        <p className={styles.error}>{validationErrors.age}</p>
        <FormLineUncontrol
          type="email"
          text="Email"
          value={emailRef as MutableRefObject<HTMLInputElement>}
        />
        <p className={styles.error}>{validationErrors.email}</p>
        <FormLineUncontrol
          type="password"
          text="Password"
          value={passwordRef as MutableRefObject<HTMLInputElement>}
        />
        <p className={styles.error}>{validationErrors.password}</p>
        <FormLineUncontrol
          type="password"
          text="Confirm password"
          value={passwordConfirmRef as MutableRefObject<HTMLInputElement>}
        />
        <p className={styles.error}>{validationErrors.confirmPassword}</p>
        <FormLineUncontrol type="file" text=" " />
        <p className={styles.error}>{validationErrors.image}</p>
        <Select
          text="Choose your gender"
          options={genderOptions}
          refValue={genderRef as MutableRefObject<HTMLSelectElement>}
        />
        <p className={styles.error}>{validationErrors.gender}</p>
        <SelectCountry
          text="Choose your country"
          refValue={countryRef}
          value={country}
          setValue={setCountry}
        />
        <p className={styles.error}>{validationErrors.country}</p>
        <FormLineUncontrol
          type="checkbox"
          text=" "
          value={checkedRef as MutableRefObject<HTMLInputElement>}
        />
        <p className={styles.error}>{validationErrors.accept}</p>
        <button className={styles.button} type="submit" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormUncontrol;
