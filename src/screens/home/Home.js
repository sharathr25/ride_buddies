import React, { useRef, useState } from 'react';
import { Link } from '@react-navigation/native';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import useAuth from '../../hooks/useAuth';
import Devider from '../../components/molecules/Devider';

import LocationIllustration from '../../images/illustrations/location-tracking.svg';
import ReceiptIllustration from '../../images/illustrations/receipt.svg';
import ChatIllustration from '../../images/illustrations/share-opinion.svg';

const Home = () => {
  const { user } = useAuth();

  return (
    <Box
      backgroundColor="background"
      padding="l"
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      {user ? null : (
        <>
          <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text>Exisiting User? </Text>
            <Link to={{ screen: 'SignIn' }}>
              <Text color="link">Sign In</Text>
            </Link>
          </Box>
          <Devider width="20%" />
          <Box style={{ flexDirection: 'row' }}>
            <Text>New User? </Text>
            <Link to={{ screen: 'SignUp' }}>
              <Text color="link">Sign Up</Text>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;
