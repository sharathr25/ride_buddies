import React, { useCallback, useContext, useRef } from 'react';
import { FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { ThemeContext } from '../../ThemeContext';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Button from '../../components/molecules/Button';
import Avatar from '../../components/molecules/Avatar';
import { selectEvents, selectRidersMap, updateEventsAsSeen } from '../../redux/slices/tripSlice';
import { EVENT_TYPES } from '../../constants';

import NoDataIllustration from '../../images/illustrations/void.svg';
import Sightseeing from '../../images/illustrations/sightseeing.svg';
import CoffeeBreak from '../../images/illustrations/coffee_break.svg';
import GotLost from '../../images/illustrations/got_lost.svg';
import Police from '../../images/illustrations/police.svg';
import Custom from '../../images/illustrations/custom.svg';
import Repair from '../../images/illustrations/towing.svg';
import Refueling from '../../images/illustrations/city_driver.svg';

const illustrations = {
  [EVENT_TYPES.CUSTOM]: Custom,
  [EVENT_TYPES.GOT_LOST]: GotLost,
  [EVENT_TYPES.PULL_OVER]: Police,
  [EVENT_TYPES.REPAIR]: Repair,
  [EVENT_TYPES.COFFEE_BREAK]: CoffeeBreak,
  [EVENT_TYPES.REFUELING]: Refueling,
  [EVENT_TYPES.SIGHTSEEING]: Sightseeing,
};

const viewabilityConfig = {
  itemVisiblePercentThreshold: 100,
  minimumViewTime: 2000,
};

const Events = ({ navigation }) => {
  const { events, ridersMap } = useSelector((state) => ({
    events: selectEvents(state),
    ridersMap: selectRidersMap(state),
  }));
  const { theme } = useContext(ThemeContext);
  const flatList = useRef(null);
  const dispatch = useDispatch();

  const gotoCreateEventScreen = () => {
    navigation.push('EventForm');
  };

  const gotoEventScreen = (eventId) => {
    navigation.push('Event', { eventId });
  };

  const renderEvent = ({ item: event }) => {
    const expenseCreatedOn = new Date(event.on);
    const rider = ridersMap[event.by];

    const Illustration = illustrations[event.type] || <></>;

    return (
      <Pressable
        style={{
          backgroundColor: `${theme.colors.foreground}40`,
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          padding: theme.spacing.s,
        }}
        onPress={gotoEventScreen.bind(null, event._id)}
      >
        {!event.seen && (
          <Text
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              paddingHorizontal: 5,
              backgroundColor: theme.colors.success,
            }}
          >
            New
          </Text>
        )}
        <Box style={{ flex: 0.15 }}>
          <Text>
            {format(expenseCreatedOn, 'd')}
            {'\n'}
            {format(expenseCreatedOn, 'MMM')}
            {'\n'}
            {format(expenseCreatedOn, 'yyyy')}
          </Text>
        </Box>
        <Box
          margin="s"
          style={{ width: 1, backgroundColor: `${theme.colors.foreground}40`, height: '75%' }}
        />
        <Box style={{ flex: 0.1 }}>
          <Text>
            {format(expenseCreatedOn, 'h')}
            {'\n'}
            {format(expenseCreatedOn, 'mm')}
            {'\n'}
            {format(expenseCreatedOn, 'a')}
          </Text>
        </Box>
        <Box
          margin="s"
          style={{ width: 1, backgroundColor: `${theme.colors.foreground}40`, height: '75%' }}
        />
        <Box style={{ flex: 0.75, zIndex: 1 }}>
          <Text variant="subHeader">{event.type.replace('_', ' ')}</Text>
          {event.title && <Text>{event.title}</Text>}
          <Box margin="xs" />
          <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar initial={rider.name.charAt(0)} backgroundColor={rider.color} />
            <Box margin="xs" />
            <Text variant="info">{rider.name}</Text>
          </Box>
        </Box>

        <Box
          style={{
            width: 80,
            height: 80,
            position: 'absolute',
            right: 0,
            bottom: 0,
            opacity: 0.5,
          }}
        >
          <Illustration width="100%" height="100%" />
        </Box>
      </Pressable>
    );
  };

  const onViewableItemsChanged = useCallback((info) => {
    dispatch(updateEventsAsSeen(info.viewableItems.map((vi) => vi.item._id)));
  }, []);

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <Box margin="m" />
      {events.length === 0 ? (
        <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <NoDataIllustration width="50%" height="50%" />
          <Text variant="subHeader">No Events</Text>
          <Box margin="s" />
        </Box>
      ) : (
        <FlatList
          ref={flatList}
          initialScrollIndex={events.length - 1}
          data={events}
          keyExtractor={(item) => item.on}
          renderItem={renderEvent}
          ItemSeparatorComponent={<Box margin="s" />}
          ListHeaderComponent={() => (
            <Text
              variant="header"
              style={{ marginBottom: 5, backgroundColor: theme.colors.background }}
            >
              Events
            </Text>
          )}
          stickyHeaderIndices={[0]}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              flatList.current?.scrollToIndex({ index: info.index, animated: true });
            });
          }}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      )}

      <Box style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Button rightIconName="plus" onPress={gotoCreateEventScreen} size="m" />
      </Box>
    </Box>
  );
};

export default Events;
