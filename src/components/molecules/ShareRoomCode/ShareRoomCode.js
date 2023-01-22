import React from 'react';
import { Share } from 'react-native';
import Button from '../Button';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import { boldCode } from '../../../utils/formators';

const ShareRoomCode = ({ code }) => {
  const share = async () => {
    await Share.share({
      message: `use this code ${boldCode(code)} to join your ride buddies`,
    });
  };

  return (
    <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>{code}</Text>
      <Box margin="xs" />
      <Button leftIconName="share-variant" outline size="xs" onPress={share} />
    </Box>
  );
};

export default ShareRoomCode;
