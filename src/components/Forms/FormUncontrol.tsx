import { useRef, MutableRefObject } from 'react';
import Select from '../Select/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { countriesOptions, genderOptions } from '../Select/options';
import styles from './Form.module.scss';
import FormLineUncontrol from '../FormLine/FormLineUncontrol';
import { actions } from '../../redux/Form.slice';
import { RootState } from '../../redux/store';

const FormUncontrol = (): React.ReactElement => {
  const nameRef = useRef<HTMLInputElement>();
  const ageRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordConfirmRef = useRef<HTMLInputElement>();
  const genderRef = useRef<HTMLSelectElement>();
  const countryRef = useRef<HTMLSelectElement>();
  const checkedRef = useRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: RootState) => state.formData);

  console.log(data);

  const submitForm = (): void => {
    dispatch(
      actions.setFormData({
        name: nameRef.current?.value,
        age: ageRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        gender: genderRef.current?.value,
        accept: checkedRef.current?.checked,
        image: '',
        country: countryRef.current?.value,
      })
    );
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Form - used uncontrolled components</h2>
      <form className={styles.form}>
        <FormLineUncontrol
          type="text"
          text="Name"
          value={nameRef as MutableRefObject<HTMLInputElement>}
        />
        <FormLineUncontrol
          type="number"
          text="Age"
          value={ageRef as MutableRefObject<HTMLInputElement>}
        />
        <FormLineUncontrol
          type="email"
          text="Email"
          value={emailRef as MutableRefObject<HTMLInputElement>}
        />
        <FormLineUncontrol
          type="password"
          text="Password"
          value={passwordRef as MutableRefObject<HTMLInputElement>}
        />
        <FormLineUncontrol
          type="password"
          text="Confirm password"
          value={passwordConfirmRef as MutableRefObject<HTMLInputElement>}
        />
        <FormLineUncontrol type="file" text=" " />
        <Select
          text="Choose your gender"
          options={genderOptions}
          refValue={genderRef as MutableRefObject<HTMLSelectElement>}
        />
        <Select
          text="Choose your country"
          options={countriesOptions}
          refValue={countryRef as MutableRefObject<HTMLSelectElement>}
        />
        <FormLineUncontrol
          type="checkbox"
          text=" "
          value={checkedRef as MutableRefObject<HTMLInputElement>}
        />
        <button className={styles.button} type="submit" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormUncontrol;
