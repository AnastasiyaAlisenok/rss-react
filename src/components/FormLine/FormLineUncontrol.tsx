import { MutableRefObject } from 'react';
import styles from './FormLine.module.scss';

interface IformLineType {
  type: string;
  text: string;
  value?:
    | MutableRefObject<HTMLInputElement>
    | MutableRefObject<string>
    | MutableRefObject<boolean>
    | MutableRefObject<number>
    | MutableRefObject<null>;
}

const FormLineUncontrol = (props: IformLineType): React.ReactElement => {
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
        accept={
          props.type === 'file' ? 'image/jpeg, image/jpeg, image/png' : ''
        }
        type={props.type}
        placeholder={props.text}
        ref={props.value as MutableRefObject<HTMLInputElement>}
      />

      {props.type === 'checkbox' && `I accept conditions & terms`}
      <div></div>
    </label>
  );
};

export default FormLineUncontrol;
