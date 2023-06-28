import './style.css';
import React, { useState, useEffect } from 'react';

import {
  Button,
  Dropdown,
  FloatingLabel,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import PropTypes from 'prop-types';

export default function CountryFlagInputGroup({ data, className }) {
  CountryFlagInputGroup.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.exact({
        code: PropTypes.string.isRequired,
        title: PropTypes.string,
        text: PropTypes.string.isRequired,
      })
    ),
    // onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  const [currItem, setCurrentItem] = useState(
    sessionStorage.getItem('i18n_ResolvedLanguage')
      ? JSON.parse(sessionStorage.getItem('i18n_ResolvedLanguage'))
      : data[0]
  );

  const [inputValue, setInputValue] = useState(currItem.countryCode);

  const [inputChange, setInputChange] = useState(false);

  const [countryCode, setCountryCode] = useState();

  const [changeLanguage, setChangeLanguage] = useState(false);

  const [prefix, setPrefix] = useState(currItem.countryCode);

  const handleChangeLanguage = (item, e) => {
    /* console.log('Language Selector handleChangeLanguage event: ', e);
    setCurrentItem(item);
    setInputValue(item.countryCode);
    sessionStorage.setItem('i18n_ResolvedLanguage', JSON.stringify(item));
    setChangeLanguage(true);
    setCountryCode(item.countryCode);*/
  };

  const handleSelect = (eventKey, e) => {};
  console.log('*** Render LanguageSelector current item: ', currItem);

  const phoneNumberAutoFormat = (phoneNumber) => {
    const number = phoneNumber.trim().replace(/[^0-9]/g, '');

    if (number.length < 4) return number;
    if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, '$1-$2');
    if (number.length < 11)
      return number.replace(/(\d{3})(\d{3})(\d{1})/, '$1-$2-$3');
    return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  const handleChangeInput = (e) => {
    // const targetValue=phoneNumberAutoFormat(e.target.value);
    setInputChange(true);
    setInputValue(e.target.value);
    const targetValue = e.target.value;
    const splitValue1 = targetValue.toString().slice(0, 4);
    const splitValue2 = targetValue.slice(4, -1);

    if (targetValue.length > 1 && targetValue.length < 5) {
      const countryCodeMatcher = data
        ?.map((code) => code?.countryCode)
        ?.find((f) => f === targetValue);
      console.log('matcher', countryCodeMatcher);
      if (!changeLanguage && targetValue === countryCodeMatcher) {
        setCountryCode(countryCodeMatcher);
        setInputValue(targetValue);
        setInputChange(false);
      } else if (changeLanguage) {
        setCountryCode(currItem.countryCode);
        setInputValue(splitValue1 + e.target.value);
      }
    } else if (targetValue.length > 5) {
      // setInputChange(false)
      if (changeLanguage) {
        setInputValue(targetValue);
      } else {
        setInputValue(targetValue);
        setCountryCode(currItem.countryCode);
      }
    }
    console.log('target value', targetValue);
    console.log('countryCode', countryCode);
    console.log('splitValue2', splitValue2);
    console.log('target value length:', targetValue.length);
  };

  return (
    <>
      <InputGroup className="mb-3 " id="phone-number-input-group">
        <Button variant="outline-light" size={'lg'}>
          <Dropdown className="country-list" onSelect={handleSelect}>
            <Dropdown.Toggle as={NavLink}>
              <ReactCountryFlag
                countryCode={inputChange ? countryCode : currItem.code}
                title={currItem.title}
                svg
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {data?.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  eventKey={item.code}
                //  onClick={(e) => handleChangeLanguage(item, e)}
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
           // onChange={handleChangeInput}
            maxLength={14}
            style={{ borderLeft: 'none' }}
            value={inputValue}
          />
        </FloatingLabel>
      </InputGroup>
    </>
  );
}
