import React, {
  useRef,
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';

import {Modal, View, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Yup from '../../../config/yup';
import moment from '../../../config/Moment';

import api from '../../../services/api';

import BackButton from '../../../components/BackButton';
import Form from '../../../components/Form';
import Input from '../../../components/Form/Input';
import ImageTitle from '../../../components/ImageTitle';

import {
  Container,
  Title,
  StyledButton,
  Content,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalCloseIcon,
  ModalLabel,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  job_role: Yup.string().required(),
  admission_date: Yup.string().required(),
  birthdate: Yup.string().required(),
  project: Yup.string().required(),
  url: Yup.string().required(),
});

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 21,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 328,
  },
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
        admission_date: String(
          moment(naver.data.admission_date).format('DD/MM/YYYY'),
        ),
        birthdate: String(moment(naver.data.birthdate).format('DD/MM/YYYY')),
        project: naver.data.project,
        url: naver.data.url,
      });
    } catch (err) {}
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    navigation.push('NaversList');
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton callback={() => navigation.pop()} />,
      headerTitle: <ImageTitle />,
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
            onSubmitEditing={() => focusNextInput('birthdate')}
          />

          <Input
            autoCorrect={false}
            name="birthdate"
            placeholder="Idade"
            autoCapitalize="none"
            returnKeyType="next"
            handleFocus={() => scrollToFocusedInput('birthdate')}
            onSubmitEditing={() => focusNextInput('admission_date')}
          />

          <Input
            autoCorrect={false}
            name="admission_date"
            placeholder="Tempo de empresa"
            autoCapitalize="none"
            returnKeyType="next"
            handleFocus={() => scrollToFocusedInput('admission_date')}
            onSubmitEditing={() => focusNextInput('job_role')}
          />

          <Input
            autoCorrect={false}
            name="job_role"
            placeholder="Cargo"
            autoCapitalize="none"
            returnKeyType="next"
            handleFocus={() => scrollToFocusedInput('job_role')}
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

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => {}}>
        <ModalContainer style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ModalHeader>
              <ModalTitle>Naver editado</ModalTitle>

              <ModalCloseButton onPress={() => handleCloseModal()}>
                <ModalCloseIcon />
              </ModalCloseButton>
            </ModalHeader>

            <ModalLabel>Naver editado com sucesso!</ModalLabel>
          </View>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
