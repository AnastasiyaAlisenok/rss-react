import { Dispatch, SetStateAction } from 'react';
import styles from './FormLine.module.scss';

interface IformLineType {
  type: string;
  text: string;
  value?: string;
  checked?: boolean;
  setValue?: Dispatch<SetStateAction<string>>;
  setChecked?: Dispatch<SetStateAction<boolean>>;
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
        onChange={(event) => {
          if (props.setChecked) {
            props.setChecked(!props.checked);
          } else if (props.setValue) {
            props.setValue(event.target.value);
          }
        }}
      />

      {props.type === 'checkbox' && `I accept conditions & terms`}
      <div></div>
    </label>
  );
};

export default FormLineHooks;
