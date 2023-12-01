import { useState } from 'react';
import Select from '../Select/Select';
import { countriesOptions, genderOptions } from '../Select/options';
import styles from './Form.module.scss';
import FormLineHooks from '../FormLine/FormLineHook';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/Form.slice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

const FormHooks = (): React.ReactElement => {
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: RootState) => state.formData);

  console.log(data);

  const submitForm = (): void => {
    dispatch(
      actions.setFormData({
        name: userName,
        age,
        email,
        password,
        gender,
        accept: isChecked,
        image: '',
        country,
      })
    );
    navigate('/');
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Form - used uncontrolled components</h2>
      <form className={styles.form}>
        <FormLineHooks
          type="text"
          text="Name"
          value={userName}
          setValue={setUserName}
        />
        <FormLineHooks type="number" text="Age" value={age} setValue={setAge} />
        <FormLineHooks
          type="email"
          text="Email"
          value={email}
          setValue={setEmail}
        />
        <FormLineHooks
          type="password"
          text="Password"
          value={password}
          setValue={setPassword}
        />
        <FormLineHooks
          type="password"
          text="Confirm password"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <FormLineHooks type="file" text=" " />
        <Select
          text="Choose your gender"
          options={genderOptions}
          value={gender}
          setValue={setGender}
        />
        <Select
          text="Choose your country"
          options={countriesOptions}
          value={country}
          setValue={setCountry}
        />
        <FormLineHooks
          type="checkbox"
          text=" "
          checked={isChecked}
          setChecked={setChecked}
        />
        <button className={styles.button} type="submit" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormHooks;
