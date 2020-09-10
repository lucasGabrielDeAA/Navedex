import React, { useRef, useCallback, useState, useLayoutEffect } from 'react';

import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Yup from '~/config/yup';

import api from '~/services/api';

import AlertModal from '~/components/AlertModal';
import BackButton from '~/components/BackButton';
import Form from '~/components/Form';
import Input from '~/components/Form/Input';
import InputMask from '~/components/Form/InputMask';
import ImageTitle from '~/components/ImageTitle';

import { Container, Title, Content, StyledButton } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  job_role: Yup.string().required(),
  admission_date: Yup.string().required(),
  birthdate: Yup.string().required(),
  project: Yup.string().required(),
  url: Yup.string().required(),
});

export default function New() {
  const navigation = useNavigation();
  const formRef = useRef(null);

  const [inputSelected, setInputSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = useCallback(async (data, {reset}) => {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      console.tron.log(data);

      await api.post('/navers', data);
      await reset();
      setModalVisible(true);
    } catch (err) {
      console.tron.log(err);
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton callback={() => navigation.push('NaversList')} />
      ),
      headerTitle: () => <ImageTitle />,
      headerRight: () => <View />,
    });
  }, [navigation]);

  return (
    <Container>
      <Title>Adicionar naver</Title>

      <Form
        formRef={formRef}
        handleSubmit={handleSubmit}
        inputSelected={inputSelected}>
        <Content>
          <Input
            autoCorrect={false}
            name="name"
            placeholder="Nome"
            autoCapitalize="none"
            returnKeyType="next"
            handleFocus={() => scrollToFocusedInput('name')}
            onSubmitEditing={() => focusNextInput('job_role')}
          />

          <Input
            autoCorrect={false}
            name="job_role"
            placeholder="Cargo"
            autoCapitalize="none"
            returnKeyType="next"
            handleFocus={() => scrollToFocusedInput('job_role')}
            onSubmitEditing={() => focusNextInput('birthdate')}
          />

          <InputMask
            type="datetime"
            returnKeyType="done"
            placeholder="Idade"
            name="birthdate"
            keyboardType="numeric"
            options={{format: 'DD/MM/YYYY'}}
            handleFocus={() => scrollToFocusedInput('birthdate')}
            onSubmitEditing={() => focusNextInput('admission_date')}
          />

          <InputMask
            type="datetime"
            returnKeyType="done"
            placeholder="Tempo de empresa"
            name="admission_date"
            keyboardType="numeric"
            options={{format: 'DD/MM/YYYY'}}
            handleFocus={() => scrollToFocusedInput('admission_date')}
            onSubmitEditing={() => focusNextInput('project')}
          />

          <Input
            autoCorrect={false}
            name="project"
            placeholder="Projetos que participou"
            autoCapitalize="none"
            returnKeyType="next"
            handleFocus={() => scrollToFocusedInput('project')}
            onSubmitEditing={() => focusNextInput('url')}
          />

          <Input
            autoCorrect={false}
            name="url"
            placeholder="URL da foto do naver"
            autoCapitalize="none"
            returnKeyType="done"
            handleFocus={() => scrollToFocusedInput('url')}
            onSubmitEditing={() => formRef.current.submitForm()}
          />

          <StyledButton
            label="Salvar"
            onPress={() => formRef.current.submitForm()}
          />
        </Content>
      </Form>

      <AlertModal
        visible={modalVisible}
        title="Naver adicionado"
        label="Naver adicionado com sucesso!"
        handleClose={() => setModalVisible(false)}
      />
    </Container>
  );
}
