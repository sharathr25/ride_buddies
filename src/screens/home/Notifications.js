import React from 'react';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';

import NoDataIllustration from '../../images/illustrations/void.svg';

const Notifications = () => {
  return (
    <Box
      backgroundColor="background"
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <NoDataIllustration width="50%" height="50%" />
      <Text>No Notifications</Text>
    </Box>
  );
};

export default Notifications;
