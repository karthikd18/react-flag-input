import React, { useState, useRef } from 'react';
import { CheckCircleFill, Flag, InfoCircle } from 'react-bootstrap-icons';
import useInvalidState from '../component/useInvalidState';
import { getI18n, useTranslation } from 'react-i18next';
import { useAppStatus } from '../context/AppStatusContext';
import WaitServices from '../component/library/WaitServices';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';


import ReCAPTCHA from 'react-google-recaptcha';
import Reaptcha from 'reaptcha';
import { countries } from '../config/countryList';

const NIF_LABEL = 'NIF';
const COUNTRY_LABEL = 'Country';
const NUMERO_TELEPHONE_LABEL = (
  <span>
    {getI18n().t('PhoneNumber')}
    <InfoCircle className="ms-2" />
  </span>
);

const NIFInputGroup = withLabelGroup(InputWithSinelecValidation, NIF_LABEL, {
  as: Col,
  className: 'mb-3',
});
const CountryInputGroup = withLabelGroup(
  SelectWithSinelecValidation,
  COUNTRY_LABEL,
  { as: Col, className: 'mb-3' }
);
const NumeroTelephoneInputGroup = withLabelGroup(
  SelectWithSinelecValidation,
  NUMERO_TELEPHONE_LABEL,
  { as: Col, className: 'mb-3' }
);

// const languages = [
//     {code: "PT", title: 'Portugal',      text: "\u0020Portugu\u00EAs",countryCode:"+351"},
//     {code: "ES", title: 'Espa\u00F1a',   text: "\u0020Espa\u00F1ol",countryCode:"+34"},
//     {code: "GB", title: 'England',       text: "\u0020English",countryCode:"+44"},
// ];
const languages = countries;

function RegistrationForm({ registrationParams }) {
  const [nifInvalid, setNIFInvalid] = useInvalidState();
  const [countryInvalid, setCountryInvalid] = useInvalidState();
  const [mobileNumInvalid, setMobileNumInvalid] = useInvalidState();

  const countryRef = useRef(null);
  const nifRef = useRef(null);
  const mobileNumRef = useRef(null);
  const recaptchaRef = useRef(null);

  const [submitted, setSubmitted] = useState(undefined);
  const { t, i18n } = useTranslation();
  const appStatus = useAppStatus();

  const navigate = useNavigate();

  // const languageHandler = (code) => {
  //     i18n.changeLanguage(code.toLowerCase());
  // }

  const [navBarData, setNavBarData] = useState({
    show: false,
    languages: languages,
    // languageHandler: languageHandler,
    notifications: { msgs: [] },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    setSubmitted({
      username: e.target.NIFInput.value,
      country: e.target.Country.value,
      mobileNo: e.target.MobileNum.value,
    });
  };

  if (submitted) {
    return (
      <WaitServices
        srvHook={useRegisterUser}
        dataName={'registrationResponse'}
        param={{
          username: submitted.username,
          country: submitted.country,
          mobileNo: submitted.mobileNo,
          language: 'IT',
        }}
        onErrorEffect={() => appStatus.setError({ show: true })}
      >
        <Navigate />
      </WaitServices>
    );
  }
  const handleRegistrationCheck = (e) => {};
  function onChange(value) {
    console.log('Captcha value:', value);
  }
  const navigateToLogin = () => {
    navigate('/');
  };
  const navigateToVerification = () => {
    navigate('/registration/verfication');
  };

  return (
    <>
      <section
        className={
          'login d-flex flex-column justify-content-center align-items-center'
        }
      >
        <Container className="py-4 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col
              xl={9}
              className="text-bg-light d-flex flex-column flex-shrink-0 mt-4 mb-3"
            >
              <Card className="rounded-1 text-black">
                <Row className="g-0 ">
                  <Col
                    lg={6}
                    className="d-flex  pt-0 my-0  "
                    style={{ backgroundColor: '#f2f7f7' }}
                  >
                    <Card.Body className="p-md-2 p-lg-3 mx-md-2 mx-lg-3">
                      <Card.Title as="h3">{t('ViaCard')}</Card.Title>

                      <p>
                        Adira aqui em 3 simples passos, e passe as pontes 25 de
                        Abril e Vasco da Gama de forma mais cómoda, rápida e
                        económica. Aproveite SEMPRE as taxas de portagem com
                        descontos e usufrua de todas vantagens:
                      </p>
                      <p>
                        <CheckCircleFill
                          color="#00587c"
                          size={20}
                          className="me-2"
                        />{' '}
                        Mais rápido e económico
                      </p>
                      <p>
                        <CheckCircleFill
                          color="#00587c"
                          size={20}
                          className="me-2"
                        />
                        Controlo de custos
                      </p>
                      <p>
                        <CheckCircleFill
                          color="#00587c"
                          size={20}
                          className="me-2"
                        />
                        Controlo imediato de todas as passagens
                      </p>
                      <p>
                        <CheckCircleFill
                          color="#00587c"
                          size={20}
                          className="me-2"
                        />
                        Assistência nas pontes
                      </p>
                      <p>
                        <CheckCircleFill
                          color="#00587c"
                          size={20}
                          className="me-2"
                        />
                        Promoções ao longo do ano
                      </p>
                      <p>
                        E ao optar pela adesão à Matrícula, a leitura é
                        automática – entra na via exclusiva ViaCard, e a cancela
                        abre automaticamente.
                        <br />
                        Sempre com taxas diferenciadas, mais económicas!
                      </p>
                    </Card.Body>
                  </Col>
                  <Col
                    lg={6}
                    className="d-flex align-items-center pt-0  gradient-custom-2"
                  >
                    <Card.Body className="p-md-4 mx-md-3">
                      <Card.Title as="h3">{t('Join')}</Card.Title>
                      <Form onSubmit={onSubmit}>
                        <Row>
                          <NIFInputGroup
                            id="NIFInput"
                            placeholder="insert code"
                            /*label={mandatoryLabel(invoiceParam?.data?.tax_code_id, NIF_LABEL)}*/
                            // ref={nifRef}
                            label={mandatoryLabel(
                              registrationParams?.response?.data?.username,
                              t(NIF_LABEL)
                            )}
                            ref={nifRef}
                            isInvalid={nifInvalid.value}
                            invalidReason={nifInvalid.reason}
                            setInvalid={setNIFInvalid}
                            config={
                              registrationParams?.response?.data?.username
                            }
                          />
                          <CountryInputGroup
                            id="Country"
                            /*label={mandatoryLabel(invoiceParam?.data?.tax_code_id, NIF_LABEL)}*/
                            // ref={nifRef}
                            label={mandatoryLabel(
                              registrationParams?.response?.data?.country,
                              t(COUNTRY_LABEL)
                            )}
                            ref={countryRef}
                            isInvalid={countryInvalid.value}
                            invalidReason={countryInvalid.reason}
                            setInvalid={setCountryInvalid}
                            config={registrationParams?.response?.data?.country}
                          />
                        </Row>

                        <NumeroTelephoneInputGroup
                          id="NumeroTelphone"
                          placeholder="+351 000 000 000"
                          /*label={mandatoryLabel(invoiceParam?.data?.tax_code_id, NIF_LABEL)}*/
                          // ref={nifRef}
                          label={mandatoryLabel(
                            registrationParams?.response?.data?.phone_number,
                            NUMERO_TELEPHONE_LABEL
                          )}
                          ref={mobileNumRef}
                          isInvalid={mobileNumInvalid.value}
                          invalidReason={mobileNumInvalid.reason}
                          setInvalid={setMobileNumInvalid}
                          config={
                            registrationParams?.response?.data?.phone_number
                          }
                        />
                        <CountryFlagInputGroup
                          data={languages}
                          // onChange={navBarData.languageHandler}
                        />
                        <Form.Check
                          type="checkbox"
                          id="RegistrationCheck"
                          label={
                            <a className="fw-semibold" href="#">
                              Privacy policy
                            </a>
                          }
                          onChange={handleRegistrationCheck}
                          className="mb-4"
                        />
                        {/*<ReCAPTCHA sitekey="6LespncmAAAAAIHSpK9rXq0Y98iHbIqOKQbKZjFC"*/}
                        {/*           onChange={onChange}*/}
                        {/*ref={recaptchaRef}/>*/}
                        <Reaptcha
                          sitekey="6LespncmAAAAAIHSpK9rXq0Y98iHbIqOKQbKZjFC"
                          hl="en"
                        />
                        <div className="text-center pt-1 pb-1 d-flex flex-column mt-3 mb-2">
                          <Button
                            variant="primary"
                            type="submit"
                            className="btn-block mb-4"
                            onClick={navigateToVerification}
                          >
                            Create your account
                          </Button>
                        </div>
                        <div className="d-flex align-items-center pb-2 ">
                          <p className="mb-0 me-2 "> Already Registered</p>
                          <Button
                            variant="outline-primary"
                            onClick={navigateToLogin}
                          >
                            Login
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
function Registration(props) {
  return (
    <>
      <WaitServices srvHook={useRegisterParams} dataName={'registrationParams'}>
        <RegistrationForm />
      </WaitServices>
    </>
  );
}
export default Registration;
