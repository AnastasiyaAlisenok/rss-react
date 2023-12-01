import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SelectCountry.module.scss';
import { actions } from '../../redux/Countries.slice';
import { RootState } from '../../redux/store';

interface ISelectCountryType {
  text: string;
  value?: string;
  setValue: Dispatch<SetStateAction<string>>;
  refValue?:
    | MutableRefObject<HTMLInputElement>
    | MutableRefObject<string>
    | MutableRefObject<undefined>
    | undefined;
}

const SelectCountry = (props: ISelectCountryType): React.ReactElement => {
  const [isShownCountries, setShownCountries] = useState(false);
  const dispatch = useDispatch();
  const countriesArr = useSelector((state: RootState) => state.countriesArr);
  console.log(countriesArr);

  const filtrCountries = (value: string): void => {
    dispatch(actions.setCountries());
    dispatch(actions.filtrCountries(value));
    if (props.setValue) {
      props.setValue(value);
    }
  };
  return (
    <div className={styles.container}>
      <label htmlFor="country" className={styles.countryLabel}>
        <input
          type="text"
          id="country"
          name="country"
          placeholder={props.text}
          className={styles.countryInput}
          value={props.value}
          ref={props.refValue as MutableRefObject<HTMLInputElement>}
          onChange={(event) => filtrCountries(event.target.value)}
          onClick={() => {
            setShownCountries(true);
            dispatch(actions.setCountries());
          }}
        />
      </label>
      <div className="flex">
        {isShownCountries && (
          <ul className={styles.optionsList}>
            {countriesArr.map((option, index) => (
              <li
                key={index}
                className={styles.option}
                value={option.value}
                onClick={() => {
                  setShownCountries(false);
                  if (props.setValue) {
                    props.setValue(option.label);
                  }
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default SelectCountry;
