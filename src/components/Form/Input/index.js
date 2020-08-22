import React, {useRef, useEffect, useCallback} from 'react';
import {useField} from '@unform/core';

import {Container, Label, CustomInput, Error} from './styles';

export default function Input({
  name,
  placeholder,
  multiline,
  handleFocus,
  ...rest
}) {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);

  const handleInputFocus = useCallback(() => {
    handleFocus();
  }, [handleFocus]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      getValue(ref) {
        return ref.value;
      },
      setValue(ref, value) {
        ref.setNativeProps({text: value});
        inputRef.current.value = value;
      },
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  return (
    <Container multiline={multiline}>
      <Label>{placeholder}</Label>

      <CustomInput
        error={error}
        multiline={multiline}
        underlineColorAndroid="transparent"
        ref={inputRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onFocus={() => handleInputFocus()}
        onChangeText={(value) => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...rest}
      />

      {error && <Error>{error}</Error>}
    </Container>
  );
}
