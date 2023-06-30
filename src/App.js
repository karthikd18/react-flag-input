import './style.css';
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
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
  const [countryCodeLength, setCountryCodeLength] = useState(
    currItem.countryCode.length
  );
  const [currentCountry, setCurrentCountry] = useState(countries[0]);

  const [changeLanguage, setChangeLanguage] = useState(false);

  const [prefix, setPrefix] = useState(currItem.countryCode);
  useEffect(() => {
    //  console.log('countryCodeLength', countryCodeLength);
    countries?.map((item) => {
      if (
        item.countryCode.length > countryCodeLength &&
        countryCodeLength !== item.countryCode.length
      ) {
        //        console.log('item.countryCode.length', item.countryCode.length);

        setCountryCodeLength(item.countryCode.length);
      }
    });
  }, []);

  const handleSeparate = (value) => {
    console.log('codeSeparate', currentCountry.countryCode.length);

    let codeSeparate =
      value?.substring(0, currentCountry.countryCode.length) +
      '-' +
      value?.substring(currentCountry.countryCode.length, value.length);
    console.log('codeSeparate', codeSeparate);
    setInputValue(codeSeparate);
  };

  const handleSetCountryCode = (value) => {
    //
    if (value) {
      // console.log('inputValue111', inputValue.length);
      //console.log('inputValue111', typeof inputValue);
      for (let i = 0; i < countryCodeLength; i++) {
        // if (inputValue?.length == i + 1) {

        //console.log('inputValue?.length == 2', inputValue, i);

        let code = value?.substring(0, i + 1);
        //console.log('countrycode', code);
        let countrycode = countries.find((f) => {
          return f.countryCode === code;
        });
        //console.log('countrycode', countrycode);
        countrycode?.code && setCurrentCountry(countrycode);
        countrycode?.code && setCountryCode(countrycode?.code);
        countrycode?.code && handleSeparate(value.replace('-', ''));
        // }
      }
    }
  };

  const handleChangeLanguage = (item, e) => {
    //console.log('handleChangeLanguage', item, e);

    let codeCurrentLength = currentCountry?.countryCode?.length;
    //let codeNewLength = currentCountry.countryCode.length
    //console.log('handleChangeLanguagecodeLength', codeCurrentLength);

    let oldinputValue = inputValue.substring(
      codeCurrentLength,
      inputValue.length
    );
    //console.log('handleChangeLanguagecodeLength', oldinputValue);

    let value = item.countryCode + oldinputValue;
    setCountryCode(item.code);
    setInputValue(value);
    setCurrentCountry(item);
  };
  const handleChangeInput = (e) => {
    const targetValue = e.target.value;
    console.log('targetValue', targetValue);
    setInputValue(e.target.value);
    handleSetCountryCode(e.target.value);
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
