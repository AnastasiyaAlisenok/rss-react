import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
import { countriesOptions } from './options';
import styles from './SelectCountry.module.scss';

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

const countriesLabelsArr = [...countriesOptions];

const SelectCountry = (props: ISelectCountryType): React.ReactElement => {
  const [isShownCountries, setShownCountries] = useState(false);
  const [countryLabels, setCountryLabels] = useState(countriesLabelsArr);

  const filtrCountries = (value: string): void => {
    const arr = [...countriesLabelsArr];
    const newArr = arr.filter((el) => el.label.toLowerCase().includes(value));
    setCountryLabels(newArr);
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
          onClick={() => setShownCountries(true)}
        />
      </label>
      <div className="flex">
        {isShownCountries && (
          <ul className={styles.optionsList}>
            {countryLabels.map((option, index) => (
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
