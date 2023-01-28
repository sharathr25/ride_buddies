import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Icon from '../../components/atoms/Icon';
import DonutChart from '../../components/molecules/DonutChart';
import Avatar from '../../components/molecules/Avatar';
import ShareRoomCode from '../../components/molecules/ShareRoomCode';
import useAuth from '../../hooks/useAuth';
import { ThemeContext } from '../../ThemeContext';
import { selectTrip } from '../../redux/slices/tripSlice';
import { capitalize, currencyFormatter } from '../../utils/formators';

import NoDataIllustration from '../../images/illustrations/no-data.svg';
import VoidIllustration from '../../images/illustrations/void.svg';

const Trip = () => {
  const trip = useSelector(selectTrip);
  const {
    code,
    name,
    creation,
    totalExpenditure,
    eventsCount,
    ridersBalance,
    suggestedPayments,
    ridersMap,
  } = trip;
  const { by: organiser, on: createdOn } = creation;
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const { uid } = user || {};

  const expensesDataPie = Object.keys(totalExpenditure).map((uid) => ({
    value: totalExpenditure[uid],
    stroke: ridersMap[uid].color,
    strokeWidth: 10,
    title: ridersMap[uid].name,
  }));

  const icons = {
    CUSTOM: 'cog',
    SIGHTSEEING: 'binoculars',
    REFUELING: 'fuel',
    COFFEE_BREAK: 'coffee',
    REPAIR: 'wrench',
    GOT_LOST: 'compass',
    PULL_OVER: 'police-badge',
  };

  const renderEvents = () => {
    if (Object.keys(eventsCount).length === 0)
      return (
        <Box style={{ justifyContent: 'center', alignItems: 'center' }}>
          <VoidIllustration width="100%" height={100} />
          <Box margin="s" />
          <Text>No events</Text>
        </Box>
      );

    return (
      <Box style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Object.keys(eventsCount).map((event) => (
          <Box
            key={event}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: `${theme.colors.foreground}40`,
            }}
            margin="xs"
            padding="s"
          >
            <Icon name={icons[event]} size={16} />
            <Text style={{ marginHorizontal: 5 }}>{capitalize(event).replace('_', ' ')}</Text>
            <Text color="success">{eventsCount[event]}</Text>
          </Box>
        ))}
      </Box>
    );
  };

  const renderNoData = (msg) => (
    <Box style={{ justifyContent: 'center', alignItems: 'center' }}>
      <NoDataIllustration width="100%" height={100} />
      <Box margin="s" />
      <Text>{msg}</Text>
      <Box margin="m" />
    </Box>
  );

  const renderTotalExpenditure = () => {
    if (expensesDataPie.length === 0) return renderNoData('No Expenses');

    return <DonutChart data={expensesDataPie} size={200} formatter={currencyFormatter.format} />;
  };

  const renderBalance = () => {
    if (expensesDataPie.length === 0) return renderNoData('No Balance');

    return Object.keys(ridersBalance).map((uid) => (
      <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={uid}>
        <Text>{ridersMap[uid].name}</Text>
        <Text bold>{currencyFormatter.format(ridersBalance[uid])}</Text>
      </Box>
    ));
  };

  const renderSuggestedPayments = () => {
    if (expensesDataPie.length === 0) return renderNoData('No Suggested Payments');

    return suggestedPayments.map(({ from, to, amount }, i) => (
      <Box style={{ flexDirection: 'row' }} key={from + to + i}>
        <Box style={{ flex: 0.35 }}>
          <Text>{ridersMap[from].name}</Text>
        </Box>
        <Box style={{ flex: 0.05, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="arrow-right" />
        </Box>
        <Box style={{ alignItems: 'flex-end', flex: 0.35 }}>
          <Text>{ridersMap[to].name}</Text>
        </Box>
        <Box style={{ alignItems: 'flex-end', flex: 0.25 }}>
          <Text bold>{currencyFormatter.format(amount)}</Text>
        </Box>
      </Box>
    ));
  };

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background }}>
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

        <Box margin="s" />

        <Box>
          <Text variant="subHeader">Total Expenditure</Text>
          {renderTotalExpenditure()}
          <Box margin="xs" />
          <Text variant="subHeader">Balance</Text>
          {renderBalance()}
          <Box margin="xs" />
          <Text variant="subHeader">Suggested Payments</Text>
          {renderSuggestedPayments()}
        </Box>

        <Box margin="s" />

        <Box>
          <Text variant="subHeader">Overview of Events</Text>
          <Box margin="xs" />
          {renderEvents()}
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Trip;
