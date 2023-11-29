import styles from './FormLine.module.scss';

interface IformLineType {
  type: string;
  text: string;
}

const FormLine = (props: IformLineType): React.ReactElement => {
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
      />
      {props.type === 'checkbox' && `I accept conditions & terms`}
      <div></div>
    </label>
  );
};

export default FormLine;
