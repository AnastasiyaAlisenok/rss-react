import { FormState } from '../../redux/Form.slice';
import { convertImageFromBase64 } from '../utils/convertImageToBase64';
import styles from './DataCard.module.scss';

type DataCardType = {
  data: FormState;
};

const DataCard = (props: DataCardType): React.ReactElement => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={convertImageFromBase64(props.data.image)}
      />
      <p>
        <b>Name:</b> {props.data.name}
      </p>
      <p>
        <b>Age:</b> {props.data.age}
      </p>
      <p>
        <b>Email:</b> {props.data.email}
      </p>
      <p>
        <b>Password:</b> {props.data.password}
      </p>
      <p>
        <b>Gender:</b> {props.data.gender}
      </p>
      <p>
        <b>Country:</b> {props.data.country}
      </p>
    </div>
  );
};

export default DataCard;
