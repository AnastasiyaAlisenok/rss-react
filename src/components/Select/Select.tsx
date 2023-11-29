import styles from './Select.module.scss';

interface ISelectType {
  text: string;
  options: string[];
}

const Select = (props: ISelectType): React.ReactElement => {
  return (
    <select className={styles.select} autoComplete="true">
      <option className={styles.option}>{props.text}</option>
      {props.options.map((option) => (
        <option className={styles.option} key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
