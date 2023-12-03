import { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { FormType } from '../Forms/FormHooks';
import styles from './Select.module.scss';

export interface ISelectType {
  id?: Path<FormType>;
  register?: UseFormRegister<FormType>;
  text: string;
  options: string[];
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  refValue?:
    | MutableRefObject<HTMLSelectElement>
    | MutableRefObject<string>
    | undefined;
}

const Select = (props: ISelectType): JSX.Element => {
  return props.register && props.id ? (
    <select
      className={styles.select}
      {...props.register(props.id)}
      autoComplete="true"
      value={props.value}
      ref={props.refValue as MutableRefObject<HTMLSelectElement>}
      onChange={(event) => {
        if (props.setValue) {
          props.setValue(event.target.value);
        }
      }}
    >
      <option className={styles.option}>{props.text}</option>
      {props.options.map((option: string) => (
        <option className={styles.option} key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  ) : (
    <select
      className={styles.select}
      autoComplete="true"
      value={props.value}
      ref={props.refValue as MutableRefObject<HTMLSelectElement>}
      onChange={(event) => {
        if (props.setValue) {
          props.setValue(event.target.value);
        }
      }}
    >
      <option className={styles.option}>{props.text}</option>
      {props.options.map((option: string) => (
        <option className={styles.option} key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
