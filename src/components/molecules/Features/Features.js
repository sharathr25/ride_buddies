import React from 'react';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';

import LocationIllustration from '../../../images/illustrations/location-tracking.svg';
import ReceiptIllustration from '../../../images/illustrations/receipt.svg';
import ChatIllustration from '../../../images/illustrations/share-opinion.svg';

const ILLUSTRATION_SIZE = 75;
const DETAILS_FLEX = 0.95;

const Features = () => (
  <Box>
    <Box
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <Box style={{ flex: DETAILS_FLEX }}>
        <Text variant="subHeader">Real Time Map</Text>
        <Text>
          Keep track of your friends during road trips and outdoor adventures with our real-time
          location sharing.
        </Text>
      </Box>
      <Box>
        <LocationIllustration width={ILLUSTRATION_SIZE} height={ILLUSTRATION_SIZE} />
      </Box>
    </Box>
    <Box margin="s" />
    <Box
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <Box style={{ flex: DETAILS_FLEX }}>
        <Text variant="subHeader">Real Time Events</Text>
        <Text>
          Stay connected and informed during your road trip with our real-time event sharing
          feature.
        </Text>
      </Box>
      <Box>
        <ChatIllustration width={ILLUSTRATION_SIZE} height={ILLUSTRATION_SIZE} />
      </Box>
    </Box>
    <Box margin="s" />
    <Box
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <Box style={{ flex: DETAILS_FLEX }}>
        <Text variant="subHeader">Expense Tracking</Text>
        <Text>
          Easily split the bill for group meals, hotel rooms, and activities with our real-time
          expense tracking.
        </Text>
      </Box>
      <Box>
        <ReceiptIllustration width={ILLUSTRATION_SIZE} height={ILLUSTRATION_SIZE} />
      </Box>
    </Box>
  </Box>
);

export default Features;
