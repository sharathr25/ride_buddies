import React, { useRef, useState } from 'react';
import { Link } from '@react-navigation/native';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import useAuth from '../../hooks/useAuth';
import Devider from '../../components/molecules/Devider';

import LocationIllustration from '../../images/illustrations/location-tracking.svg';
import ReceiptIllustration from '../../images/illustrations/receipt.svg';
import ChatIllustration from '../../images/illustrations/share-opinion.svg';

const Home = () => {
  const { user } = useAuth();
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);

  return (
    <Box
      backgroundColor="background"
      padding="l"
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      {/* <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={carouselRef}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={carouselRef}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      /> */}
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
