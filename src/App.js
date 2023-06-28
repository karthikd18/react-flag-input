import './style.css';
import React, { useState, useEffect } from 'react';

import {
  Button,
  Dropdown,
  FloatingLabel,
  Form,
  InputGroup,
} from 'react-bootstrap';
import ReactCountryFlag from 'react-country-flag';

import { countries } from './countries';
export default function App() {
  const [currItem, setCurrentItem] = useState(
    sessionStorage.getItem('i18n_ResolvedLanguage')
      ? JSON.parse(sessionStorage.getItem('i18n_ResolvedLanguage'))
      : countries[0]
  );

  const [inputValue, setInputValue] = useState(currItem.countryCode);

  const [inputChange, setInputChange] = useState(false);

  const [countryCode, setCountryCode] = useState();
  const [currentCountry, setCurrentCountry] = useState();

  const [changeLanguage, setChangeLanguage] = useState(false);

  const [prefix, setPrefix] = useState(currItem.countryCode);
  useEffect(() => {
    console.log('currentCountry', currentCountry);
  }, [currentCountry]);

  useEffect(() => {
    console.log('inputValue', inputValue);
    if (inputValue && inputValue !== currItem.countryCode) {
      console.log('inputValue111', inputValue.length);
      console.log('inputValue111', typeof inputValue);
      if (inputValue?.length == 2) {
        console.log('inputValue?.length == 2', inputValue);

        let code = inputValue?.substring(0, 3);
        console.log('countrycode', code);
        let countrycode = countries.find((f) => {
          return f.countryCode === code;
        });
        console.log('countrycode', countrycode);
        countrycode?.code && setCurrentCountry(countrycode);
        countrycode?.code && setCountryCode(countrycode?.code);
      } else if (inputValue?.length == 3) {
        console.log('inputValue?.length == 2', inputValue);

        let code = inputValue?.substring(0, 4);
        console.log('countrycode', code);

        let countrycode = countries.find((f) => {
          return f.countryCode === code;
        });
        countrycode?.code && setCountryCode(countrycode?.code);
        countrycode?.code && setCurrentCountry(countrycode);

        console.log('countrycode', countrycode);
      } else if (inputValue?.length == 4) {
        console.log('inputValue?.length == 2', inputValue);

        let code = inputValue?.substring(0, 5);
        console.log('countrycode', code);

        let countrycode = countries.find((f) => {
          return f.countryCode === code;
        });
        countrycode?.code && setCountryCode(countrycode?.code);
        countrycode?.code && setCurrentCountry(countrycode);

        console.log('countrycode', countrycode);
      }
    }
  }, [inputValue]);
  const handleChangeLanguage = (item, e) => {
    console.log('handleChangeLanguage', item, e);

    setCountryCode(item.code);
    setInputValue(item.countryCode);
    setCurrentCountry(item);
  };
  const handleChangeInput = (e) => {
    const targetValue = e.target.value;

    setInputValue(e.target.value);
  };
  return (
    <>
      <h1>react flag input</h1>
      <>
        <InputGroup className="mb-3 " id="phone-number-input-group">
          <Button variant="outline-light" size={'lg'}>
            <Dropdown className="country-list">
              <Dropdown.Toggle>
                <ReactCountryFlag
                  countryCode={countryCode ? countryCode : currItem.code}
                  title={currItem.title}
                  svg
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {countries.map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    eventKey={item.code}
                    onClick={(e) => handleChangeLanguage(item, e)}
                  >
                    <ReactCountryFlag
                      countryCode={item.code}
                      title={item.code}
                      svg
                    />
                    &nbsp;{item.text}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Button>

          <FloatingLabel label="Phone-number" controlId="floatingInput">
            <Form.Control
              className="PhoneNumber"
              type="text"
              id="PhoneNumber"
              onChange={handleChangeInput}
              maxLength={14}
              style={{ borderLeft: 'none' }}
              value={inputValue}
            />
          </FloatingLabel>
        </InputGroup>
      </>
    </>
  );
}
