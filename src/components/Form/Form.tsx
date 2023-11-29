import FormLine from '../FormLine/FormLine';
import Select from '../Select/Select';
import { countriesOptions, genderOptions } from '../Select/options';
import styles from './Form.module.scss';

interface IFormType {
  title: string;
  type: string;
}

const Form = (props: IFormType): React.ReactElement => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{props.title}</h2>
      <form className={styles.form}>
        <FormLine type="text" text="Name" />
        <FormLine type="number" text="Age" />
        <FormLine type="email" text="Email" />
        <FormLine type="password" text="Password" />
        <FormLine type="password" text="Confirm password" />
        <FormLine type="file" text=" " />
        <Select text="Choose your gender" options={genderOptions} />
        <Select text="Choose your country" options={countriesOptions} />
        <FormLine type="checkbox" text=" " />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
