import React, {
  useRef,
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';

import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Yup from '~/config/yup';
import moment from '~/config/Moment';

import api from '~/services/api';

import AlertModal from '~/components/AlertModal';
import BackButton from '~/components/BackButton';
import Form from '~/components/Form';
import Input from '~/components/Form/Input';
import ImageTitle from '~/components/ImageTitle';
import InputMask from '~/components/Form/InputMask';

import { Container, Title, StyledButton, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  job_role: Yup.string().required(),
  admission_date: Yup.string().required(),
  birthdate: Yup.string().required(),
  project: Yup.string().required(),
  url: Yup.string().required(),
});

export default function Edit({
  route: {
    params: {id},
  },
}) {
  const navigation = useNavigation();
  const formRef = useRef(null);

  const [inputSelected, setInputSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [displayErrorModal, setDisplayErrorModal] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/navers/${id}`, data);
      setModalVisible(true);
    } catch (err) {
      console.tron.log(err);
      const errors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.map((error) => {
          errors[error.path] = error.message;
        });
        formRef.current.setErrors(errors);
      } else {
        setError("Erro ao atualizar Naver!");
        setDisplayErrorModal(true);
      }
    }
  }, []);

  const scrollToFocusedInput = useCallback((inputName) => {
    setInputSelected(inputName);
  }, []);

  const focusNextInput = useCallback((inputName) => {
    formRef.current.getFieldRef(inputName).focus();
  }, []);

  const loadData = useCallback(async (id) => {
    try {
      const naver = await api.get(`/navers/${id}`);

      formRef.current.setData({
        name: naver.data.name,
        job_role: naver.data.job_role,
        admission_date: moment(naver.data.admission_date, 'YYYY-MM-DD').format(
          'DD/MM/YYYY',
        ),
        birthdate: moment(naver.data.birthdate, 'YYYY-MM-DD').format(
          'DD/MM/YYYY',
        ),
        project: naver.data.project,
        url: naver.data.url,
      });
    } catch (err) {
      setError("Erro ao buscar Naver!");
      setDisplayErrorModal(true);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    navigation.push('NaversList');
  }, []);

  const handleCloseErrorModal = useCallback(() => {
    setDisplayErrorModal(false);
    setError("");
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton callback={() => navigation.pop()} />,
      headerTitle: () => <ImageTitle />,
      headerRight: () => <View />,
    });
  }, [navigation]);

  useEffect(() => {
    loadData(id);
  }, [id]);

  return (
    <Container>
      <Title>Editar naver</Title>

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
        title="Naver editado"
        label="Naver editado com sucesso!"
        handleClose={() => handleCloseModal()}
      />

      <AlertModal
        visible={displayErrorModal}
        title="Erro"
        label={error}
        handleClose={() => handleCloseErrorModal()}
      />
    </Container>
  );
}
