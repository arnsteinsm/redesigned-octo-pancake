import React, { useRef, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';

import loginStyles from './Login.module.css';

interface Props {
  label: string;
  icon: JSX.Element;
  inputType: string;
  value: string;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorText: string;
  disabled?: boolean;
}

const InputComponent: React.FunctionComponent<Props> = ({
  label,
  icon,
  errorText,
  inputType,
  onClick,
  onChange,
  value,
  disabled,
}) => {
  const inputId = `${inputType}_login_input`;
  const currentInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentInput.current) {
      currentInput.current.focus();
    }
  }, [currentInput]);

  return (
    <span className={loginStyles.loginInputWrapper}>
      <FormControl variant='outlined' className={loginStyles.loginInput}>
        <InputLabel htmlFor='outlined-adornment-password'>{label}</InputLabel>
        <OutlinedInput
          id={inputId}
          inputRef={currentInput}
          error={!!errorText}
          type={inputType}
          value={value}
          onChange={onChange}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              onClick();
            }
          }}
          endAdornment={
            !disabled && (
              <InputAdornment position='end'>
                <IconButton
                  disabled={disabled}
                  aria-label='toggle password visibility'
                  edge='end'
                  onClick={onClick}
                >
                  {icon}
                </IconButton>
              </InputAdornment>
            )
          }
          labelWidth={70}
        />
        <FormHelperText disabled={disabled} error={!!errorText}>
          {errorText}
        </FormHelperText>
      </FormControl>
    </span>
  );
};
export default InputComponent;
