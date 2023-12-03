import { useState } from 'react';
import Select from '../Select/Select';
import { genderOptions } from '../Select/options';
import styles from './Form.module.scss';
import FormLineHooks from '../FormLine/FormLineHook';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/Form.slice';
import { useNavigate } from 'react-router-dom';
import SelectCountry from '../Select/SelectCountry';
import { convertImageToBase64 } from '../utils/convertImageToBase64';
import { useForm, UseFormRegister } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '../../yup/schema';

export interface FormType {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  image: File;
  gender: string;
  country: string;
  accept: boolean;
}

const FormHooks = (): React.ReactElement => {
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [imageSrc, setImageSrc] = useState<File>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const submitForm = async (): Promise<void> => {
    if (imageSrc) {
      const base64Image = await convertImageToBase64(imageSrc);
      dispatch(
        actions.setFormData({
          name: userName,
          age,
          email,
          password,
          gender,
          accept: isChecked,
          image: base64Image,
          country,
        })
      );
      navigate('/');
    }
  };
  console.log(errors);
  console.log(getValues('country'));
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Form - used React Hook Form</h2>
      <form
        className={styles.form}
        noValidate
        onSubmit={handleSubmit(submitForm)}
      >
        <FormLineHooks
          type="text"
          text="Name"
          value={userName}
          setValue={setUserName}
          id="name"
          register={register}
        />
        <p className={styles.error}>{errors.name?.message}</p>
        <FormLineHooks
          type="text"
          text="Age"
          value={age}
          setValue={setAge}
          id="age"
          register={register}
        />
        <p className={styles.error}>{errors.age?.message}</p>
        <FormLineHooks
          type="email"
          text="Email"
          value={email}
          setValue={setEmail}
          id="email"
          register={register}
        />
        <p className={styles.error}>{errors.email?.message}</p>
        <FormLineHooks
          type="password"
          text="Password"
          value={password}
          setValue={setPassword}
          id="password"
          register={register}
        />
        <p className={styles.error}>{errors.password?.message}</p>
        <FormLineHooks
          type="password"
          text="Confirm password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          id="confirmPassword"
          register={register}
        />
        <p className={styles.error}>{errors.confirmPassword?.message}</p>
        <FormLineHooks
          type="file"
          text=" "
          setImageSrc={setImageSrc}
          id="image"
          register={register}
        />
        <p className={styles.error}>{errors.image?.message}</p>
        <Select
          text="Choose your gender"
          options={genderOptions}
          value={gender}
          setValue={setGender}
          register={register}
          id="gender"
        />
        <p className={styles.error}>{errors.gender?.message}</p>
        <SelectCountry
          text="Choose your country"
          value={country}
          setValue={setCountry}
          register={register as UseFormRegister<FormType>}
          id="country"
        />
        <p className={styles.error}>{errors.country?.message}</p>
        <FormLineHooks
          type="checkbox"
          text=" "
          checked={isChecked}
          setChecked={setChecked}
          id="accept"
          register={register}
        />
        <p className={styles.error}>{errors.accept?.message}</p>
        <button className={styles.button} type="submit" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormHooks;
