import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

import { Form as CustomForm } from '@unform/mobile';

import KeyboardController from '~/common/KeyboardController';
import useDebounce from '~/common/useDebounce';

import { Container } from './styles';

export default function Form({
  handleSubmit,
  children,
  inputSelected,
  formRef,
  initialData,
  schema,
  handleKeyboardLayout,
  scrollEnabled,
}) {
  const scrollRef = useRef(null);
  const headerHeight = useHeaderHeight();

  const [offset, setOffset] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const debouncedKeyboard = useDebounce(keyboardHeight, 300);

  useEffect(() => {
    if (inputSelected !== '' && keyboardHeight > 0) {
      formRef.current
        .getFieldRef(inputSelected)
        .measure((fx, fy, width, height, px, py) => {
          scrollRef.current.scrollTo({
            x: 0,
            y: offset + py - headerHeight - 25,
            animated: true,
          });
        });
    }
  }, [inputSelected, debouncedKeyboard]);

  const handleScroll = useCallback((event) => {
    setOffset(event.nativeEvent.contentOffset.y);
  }, []);

  const handleKeyboardCallback = useCallback(
    ({keyboardHeight: height, layoutAnimationConfig}) => {
      if (Platform.OS === 'ios') {
        handleKeyboardLayout({height, layoutAnimationConfig});
        setKeyboardHeight(height);
      } else {
        handleKeyboardLayout({height, layoutAnimationConfig});
      }
    },
    [handleKeyboardLayout],
  );

  return (
    <Container
      scrollEnabled={!scrollEnabled ? debouncedKeyboard > 0 : true}
      showsVerticalScrollIndicator={false}
      ref={scrollRef}
      debouncedKeyboard={debouncedKeyboard}
      onScroll={handleScroll}>
      <KeyboardController callback={handleKeyboardCallback}>
        <CustomForm
          initialData={initialData}
          schema={schema}
          ref={formRef}
          onSubmit={handleSubmit}>
          {children}
        </CustomForm>
      </KeyboardController>
    </Container>
  );
}

Form.defaultProps = {
  handleKeyboardLayout: () => {},
  scrollEnabled: true,
};
