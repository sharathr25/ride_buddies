import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Icon from '../../components/atoms/Icon';
import Loader from '../../components/atoms/Loader';
import Button from '../../components/molecules/Button';
import DonutChart from '../../components/molecules/DonutChart';
import { ThemeContext } from '../../ThemeContext';
import useService from '../../hooks/useService';
import { currencyFormatter } from '../../utils/formators';
import { getExpensesInDetail } from '../../api/trips';
import { selectRidersMap } from '../../redux/slices/tripSlice';

import ErrorIllustration from '../../images/illustrations/error.svg';
import NoDataIllustration from '../../images/illustrations/no-data.svg';

const TripExpensesDetails = ({ navigation }) => {
  const { tripCode, ridersMap } = useSelector((state) => ({
    tripCode: state.trip.code,
    ridersMap: selectRidersMap(state),
  }));
  const { data, loading, error, refetch } = useService({
    initialData: null,
    service: getExpensesInDetail,
    serviceParams: tripCode,
  });

  const { theme } = useContext(ThemeContext);

  if (loading)
    return (
      <Box
        backgroundColor="background"
        padding="l"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Loader />
      </Box>
    );

  if (error)
    return (
      <Box
        backgroundColor="background"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <ErrorIllustration width="50%" height="50%" />
        <Text color="danger" variant="subHeader">
          Something went wrong!
        </Text>
        <Box margin="s" />
        <Button rightIconName="refresh" size="xs" onPress={refetch} />
      </Box>
    );

  if (!data)
    return (
      <Box
        backgroundColor="background"
        padding="l"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <NoDataIllustration width="50%" height="50%" />
        <Text>No Expenses</Text>
      </Box>
    );

  const { totalExpenditure, ridersBalance, suggestedPayments } = data;

  const expensesDataPie = Object.keys(totalExpenditure).map((uid) => ({
    value: totalExpenditure[uid],
    stroke: ridersMap[uid].color,
    strokeWidth: 10,
    title: ridersMap[uid].name,
  }));

  const renderTotalExpenditure = () => {
    return <DonutChart data={expensesDataPie} size={200} formatter={currencyFormatter.format} />;
  };

  const renderBalance = () => {
    return Object.keys(ridersBalance).map((uid) => (
      <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={uid}>
        <Text>{ridersMap[uid].name}</Text>
        <Text bold>{currencyFormatter.format(ridersBalance[uid])}</Text>
      </Box>
    ));
  };

  const renderSuggestedPayments = () => {
    if (suggestedPayments.length === 0)
      return (
        <Box style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Box margin="s" />
          <NoDataIllustration width="100%" height={100} />
          <Box margin="s" />
          <Text>No suggested payments</Text>
          <Box margin="m" />
        </Box>
      );

    return suggestedPayments.map(({ from, to, amount }, i) => (
      <Box style={{ flexDirection: 'row', alignItems: 'center' }} key={from + to + i}>
        <Text>{ridersMap[from].name}</Text>
        <Icon name="menu-right-outline" size={20} />
        <Text>{ridersMap[to].name}</Text>
        <Text bold style={{ marginLeft: 'auto' }}>
          {currencyFormatter.format(amount)}
        </Text>
      </Box>
    ));
  };

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background, flexGrow: 1 }}>
      <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
        <Box margin="m" />
        <Text variant="subHeader">Total Expenditure</Text>
        {renderTotalExpenditure()}
        <Box margin="m" />
        <Text variant="subHeader">Balance</Text>
        {renderBalance()}
        <Box margin="m" />
        <Text variant="subHeader">Suggested Payments</Text>
        {renderSuggestedPayments()}
        <Box margin="xs" />
        {suggestedPayments.length ? (
          <Box style={{ alignItems: 'flex-end' }}>
            <Button
              title="settle up"
              onPress={() => navigation.push('SettleUp', { suggestedPayments })}
            />
          </Box>
        ) : null}
      </Box>
    </ScrollView>
  );
};

export default TripExpensesDetails;
