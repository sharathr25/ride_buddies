import React from 'react';
import { ScrollView } from 'react-native';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';

const TermsOfUse = () => {
  return (
    <Box backgroundColor="background" padding="xl" style={{ flex: 1 }}>
      <Text variant="header">Terms of Use</Text>
      <ScrollView contentContainerStyle={{ flex: 1 }}></ScrollView>
    </Box>
  );
};

export default TermsOfUse;
