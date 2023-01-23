import React, { useContext } from 'react';
import { Modal } from 'react-native';
import Box from '../../atoms/Box';
import Loader from '../../atoms/Loader';
import Text from '../../atoms/Text';
import Icon from '../../atoms/Icon';
import { ThemeContext } from '../../../ThemeContext';
import Button from '../Button';

const ApiStatusModal = ({ error, success, loading, reportActionClick = () => {} }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Modal visible={loading || error !== null || success !== null} transparent>
      <Box
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000050',
        }}
      >
        <Box
          backgroundColor="foreground"
          padding="xl"
          style={{
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 200,
          }}
        >
          {loading && <Loader />}
          {error && (
            <>
              <Icon name="close-thick" color={theme.colors.danger} size={50} />
              <Text color="background" style={{ textAlign: 'center' }}>
                {error}
              </Text>
              <Box margin="xs" />
              <Button title="ok" size="xs" onPress={reportActionClick} />
            </>
          )}
          {success && (
            <>
              <Icon name="check-bold" color={theme.colors.success} size={50} />
              <Text color="background" style={{ textAlign: 'center' }}>
                {success}
              </Text>
              <Box margin="xs" />
              <Button title="ok" size="xs" onPress={reportActionClick} />
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ApiStatusModal;
