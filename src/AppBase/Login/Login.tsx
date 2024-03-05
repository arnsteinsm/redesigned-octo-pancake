import React, { useState, useContext } from 'react';

import { AuthContext } from '../../Context/AuthProvider';
import RightArrow from '@mui/icons-material/KeyboardArrowRightRounded';

import loginStyles from './Login.module.css';
import InputComponent from './InputComponent';
import Button from '@mui/material/Button';

type InputOnchangeEvent = React.ChangeEvent<HTMLInputElement>;

const Login = () => {
  const {
    login,
    loginEmail,
    emailChecked,
    emailUserExists,
    errorText,
    resetPassword,
  } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailChanged, setEmailChanged] = useState(false);

  const inputSettings = {
    email: {
      label: 'E-post',
      icon: <RightArrow />,
      inputType: 'email',
      value: email,
      onClick: () => {
        loginEmail(email.trim());
        setEmailChanged(false);
      },
      onChange: (e: InputOnchangeEvent) => {
        setEmail(e.currentTarget.value);
        setEmailChanged(true);
      },
    },
    password: {
      label: 'Password',
      icon: <RightArrow />,
      inputType: 'password',
      value: password,
      onClick: () => {
        login(email.trim(), password);
      },
      onChange: (e: InputOnchangeEvent) => {
        setPassword(e.currentTarget.value);
      },
    },
  };

  return (
    <div className={loginStyles.loginBox}>
      <h1>Velkommen!</h1>
      <InputComponent
        label={inputSettings.email.label}
        icon={inputSettings.email.icon}
        onClick={inputSettings.email.onClick}
        onChange={inputSettings.email.onChange}
        inputType={inputSettings.email.inputType}
        value={inputSettings.email.value}
        errorText={
          !(emailChecked && !emailChanged && emailUserExists) ? errorText : ''
        }
        disabled={emailChecked && !emailChanged}
      />

      {emailChecked && !emailChanged && emailUserExists && (
        <InputComponent
          label={inputSettings.password.label}
          icon={inputSettings.password.icon}
          onClick={inputSettings.password.onClick}
          onChange={inputSettings.password.onChange}
          inputType={inputSettings.password.inputType}
          value={inputSettings.password.value}
          errorText={errorText}
        />
      )}

      {emailChecked && !emailChanged && emailUserExists && (
        <Button
          onClick={() => {
            resetPassword(email);
          }}
        >
          Tilbakestill passord
        </Button>
      )}
    </div>
  );
};

export default Login;
