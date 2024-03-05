import React, { useRef, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';

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
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <span className={loginStyles.loginInputWrapper}>
      <FormControl
        variant="outlined"
        className={loginStyles.loginInput}
        error={!!errorText}
      >
        <InputLabel htmlFor={inputId}>{label}</InputLabel>
        <OutlinedInput
          id={inputId}
          type={inputType}
          value={value}
          onChange={onChange}
          label={label} // This should match the text in InputLabel for proper alignment
          inputRef={inputRef}
          onKeyUp={(e) => e.key === 'Enter' && onClick()}
          endAdornment={
            icon &&
            !disabled && (
              <InputAdornment position="end">
                <IconButton
                  aria-label={`toggle ${inputType} visibility`}
                  onClick={onClick}
                  edge="end"
                  disabled={disabled}
                >
                  {icon}
                </IconButton>
              </InputAdornment>
            )
          }
          disabled={disabled}
        />
        <FormHelperText>{errorText}</FormHelperText>
      </FormControl>
    </span>
  );
};

export default InputComponent;
