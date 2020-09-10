import React, { useRef, useCallback, useState } from 'react';

import NavedexLogo from '~/assets/images/Logo.png';

import Yup from '~/config/yup';

import Form from '~/components/Form';
import Input from '~/components/Form/Input';

import { useAuth } from '~/hooks/useAuth';

import { Container, Content, Logo, InputGroup, StyledButton } from './styles';

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function SignIn() {
  const { signIn } = useAuth();
  const formRef = useRef(null);
  const [inputSelected, setInputSelected] = useState('');

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn(data);
    } catch (err) {
      const errors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.map((error) => {
          errors[error.path] = error.message;
        });
        formRef.current.setErrors(errors);
      }
    }
  }, []);

  const scrollToFocusedInput = useCallback((inputName) => {
    setInputSelected(inputName);
  }, []);

  const focusNextInput = useCallback((inputName) => {
    formRef.current.getFieldRef(inputName).focus();
  }, []);

  return (
    <Container>
      <Content>
        <Logo source={NavedexLogo} />

        <Form
          formRef={formRef}
          handleSubmit={handleSubmit}
          inputSelected={inputSelected}>
          <InputGroup>
            <Input
              autoCorrect={false}
              name="email"
              placeholder="E-mail"
              autoCapitalize="none"
              returnKeyType="next"
              handleFocus={() => scrollToFocusedInput('email')}
              onSubmitEditing={() => focusNextInput('password')}
            />

            <Input
              secureTextEntry
              autoCorrect={false}
              name="password"
              placeholder="Senha"
              returnKeyType="next"
              handleFocus={() => scrollToFocusedInput('password')}
              onSubmitEditing={() => formRef.current.submitForm()}
            />
          </InputGroup>

          <StyledButton
            label="Entrar"
            onPress={() => formRef.current.submitForm()}
          />
        </Form>
      </Content>
    </Container>
  );
}
