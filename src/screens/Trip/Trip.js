import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Icon from '../../components/atoms/Icon';
import Avatar from '../../components/molecules/Avatar';
import ShareRoomCode from '../../components/molecules/ShareRoomCode';
import useAuth from '../../hooks/useAuth';
import { ThemeContext } from '../../ThemeContext';
import { selectTrip } from '../../redux/slices/tripSlice';
import { currencyFormatter } from '../../utils/formators';

const Trip = ({ navigation }) => {
  const trip = useSelector(selectTrip);
  const { code, name, creation, riders, events, numberOfExpenses, totalAmountForExpenses } = trip;
  const { by: organiser, on: createdOn } = creation;
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const { uid } = user || {};

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <Box margin="s" />
      <Text variant="header">{name}</Text>
      <ShareRoomCode code={code} />

      <Box margin="s" />

      <Box>
        <Text variant="subHeader">Organiser</Text>
        <Box margin="xs" />
        <Box
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box style={{ flex: 0.1 }}>
            <Avatar initial={organiser?.name[0] || ''} backgroundColor={organiser.color} />
          </Box>
          <Box style={{ flex: 0.85 }}>
            <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginLeft: 5 }} bold>
                Created by
              </Text>
              <Text> {organiser.name}</Text>
              {organiser.uid === uid && (
                <Text color="success" style={{ marginLeft: 'auto' }}>
                  You
                </Text>
              )}
            </Box>
            <Box style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ marginLeft: 5 }} bold>
                On
              </Text>
              <Text> {format(new Date(createdOn), 'dd MMM yyyy')}</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box margin="m" />

      <Box style={{ flexDirection: 'row', flex: 1 }}>
        <Box
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${theme.colors.foreground}40`,
            flex: 0.5,
          }}
          padding="l"
        >
          <Text bold variant="header">
            {riders.length}
          </Text>
          <Text>Rider{riders.length === 1 ? '' : 's'}</Text>
        </Box>
        <Box margin="s" />
        <Box
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${theme.colors.foreground}40`,
            flex: 0.5,
          }}
          padding="l"
        >
          <Text bold variant="header">
            {numberOfExpenses}
          </Text>
          <Text>Expense{numberOfExpenses === 1 ? '' : 's'}</Text>
        </Box>
      </Box>

      <Box margin="s" />

      <Box style={{ flexDirection: 'row', flex: 1 }}>
        <Pressable
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${theme.colors.foreground}40`,
            flex: 0.5,
            padding: theme.spacing.l,
          }}
          onPress={() => navigation.push('TripExpensesDetails', { code })}
        >
          <Text bold variant="header">
            {currencyFormatter.format(totalAmountForExpenses)}
          </Text>
          <Text>Total Amount</Text>
          <Text color="link">
            View in Detail
            <Icon name="arrow-right" size={16} color={theme.colors.link} />
          </Text>
        </Pressable>
        <Box margin="s" />
        <Pressable
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${theme.colors.foreground}40`,
            flex: 0.5,
            padding: theme.spacing.l,
          }}
          onPress={() => navigation.push('TripEventsDetails', { code })}
        >
          <Text bold variant="header">
            {events.length}
          </Text>
          <Text>Event{events.length === 1 ? '' : 's'}</Text>
          <Text color="link">
            View in Detail
            <Icon name="arrow-right" size={16} color={theme.colors.link} />
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};

export default Trip;
