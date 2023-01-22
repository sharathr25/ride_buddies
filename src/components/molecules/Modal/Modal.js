import React, { useContext } from 'react';
import { Modal as RNModal } from 'react-native';
import Box from '../../../components/atoms/Box';
import { ThemeContext } from '../../../ThemeContext';
import Button from '../Button';

const Modal = ({ visible, hideModal = () => {}, children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <RNModal visible={visible} transparent>
      <Box
        style={{
          flex: 1,
          backgroundColor: `${theme.colors.background}90`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          backgroundColor="background"
          style={{
            borderWidth: 2,
            borderColor: theme.colors.foreground,
            borderRadius: 10,
            width: '75%',
          }}
          padding="l"
        >
          <Button
            color="danger"
            leftIconName="close"
            size="xs"
            style={{ position: 'absolute', top: -2, right: -2, zIndex: 1 }}
            onPress={hideModal}
          />
          {children}
        </Box>
      </Box>
    </RNModal>
  );
};

export default Modal;
