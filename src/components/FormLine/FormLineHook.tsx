import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister, Path } from 'react-hook-form';
import styles from './FormLine.module.scss';
import { FormType } from '../Forms/FormHooks';

interface IformLineType {
  id: Path<FormType>;
  type: string;
  text: string;
  register: UseFormRegister<FormType>;
  value?: string;
  checked?: boolean;
  setValue?: Dispatch<SetStateAction<string>>;
  setChecked?: Dispatch<SetStateAction<boolean>>;
  setImageSrc?: Dispatch<SetStateAction<File | undefined>>;
}

const FormLineHooks = (props: IformLineType): React.ReactElement => {
  return (
    <label
      className={
        props.type === 'checkbox' ? styles.lineLabelCheckbox : styles.lineLabel
      }
    >
      {props.type === 'file' && `Upload a picture:`}
      <input
        className={
          props.type === 'file' || props.type === 'checkbox'
            ? `${styles.lineFile}`
            : `${styles.lineInput}`
        }
        type={props.type}
        placeholder={props.text}
        value={props.value}
        checked={props.checked}
        required
        {...props.register(props.id, { value: props.value })}
        onChange={(event) => {
          if (props.setChecked) {
            props.setChecked(!props.checked);
          } else if (props.setValue) {
            props.setValue(event.target.value);
          }
          if (props.type === 'file' && props.setImageSrc) {
            const file = event.target.files && event.target.files[0];
            if (file) {
              props.setImageSrc(file);
            }
          }
        }}
      />

      {props.type === 'checkbox' && `I accept conditions & terms`}
    </label>
  );
};

export default FormLineHooks;
