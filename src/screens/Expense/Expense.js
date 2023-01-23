import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Button from '../../components/molecules/Button';
import ApiStatusModal from '../../components/molecules/ApiStatusModal';
import Avatar from '../../components/molecules/Avatar/Avatar';
import { selectExpenses, selectRidersMap } from '../../redux/slices/tripSlice';
import { currencyFormatter } from '../../utils/formators';
import { sendDataToSocket } from '../../api/socket';

const Expense = ({ navigation, route }) => {
  const { expenseId } = route.params;
  const { tripCode, ridersMap, expenses } = useSelector((state) => ({
    tripCode: state.trip.code,
    ridersMap: selectRidersMap(state),
    expenses: selectExpenses(state),
  }));
  const expense = expenses.find((e) => e._id === expenseId);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const deleteExpense = async () => {
    setLoading(true);
    const data = await sendDataToSocket('DELETE_EXPENSE', { _id: expense._id, tripCode });
    if ('error' in data) {
      setErr(data.error);
    } else {
      setMsg(data.msg);
    }
    setLoading(false);
  };

  const gotoUpdateExpenseScreen = () => {
    navigation.push('ExpenseForm', { tripCode, expenseId });
  };

  reportActionClick = () => {
    if (err) setErr(null);
    if (msg) {
      setMsg(null);
      navigation.goBack();
    }
  };

  const renderExpense = () => {
    if (!expense) return null;

    const { title, amount, creation, by, for: forRiders } = expense;
    const expenseCreatedOn = new Date(creation.on);

    return (
      <>
        <Text variant="header">{title}</Text>
        <Text color="danger" variant="subHeader">
          {currencyFormatter.format(amount)}
        </Text>
        <Box margin="s" />
        <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text bold>Created by</Text>
          <Text>{ridersMap[by]?.name}</Text>
        </Box>
        <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text bold>Paid by</Text>
          <Text>{ridersMap[by]?.name}</Text>
        </Box>
        <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text bold>On</Text>
          <Text style={{ textAlign: 'right' }}>
            {format(expenseCreatedOn, 'hh : mm a')}
            {'\n'}
            {format(expenseCreatedOn, 'd MMM yyyy')}
          </Text>
        </Box>
        <Box margin="s" />
        <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text bold>For</Text>
          <Text>
            {forRiders.length === 0
              ? 'All'
              : `${forRiders.length} Person${forRiders.length === 1 ? '' : 's'}`}
          </Text>
        </Box>
        <Box margin="xs" />

        <ScrollView>
          {forRiders
            .map((uid) => ridersMap[uid])
            .map(({ name, color }, i) => (
              <Box key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar initial={name.charAt(0)} backgroundColor={color} />
                <Box margin="xs" />
                <Text>{name}</Text>
              </Box>
            ))}
        </ScrollView>

        <Box margin="s" />

        <Box style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button title="delete" onPress={deleteExpense} outline color="danger" />
          <Box margin="s" />
          <Button title="edit" onPress={gotoUpdateExpenseScreen} />
        </Box>
      </>
    );
  };

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <ApiStatusModal
        loading={loading}
        error={err}
        success={msg}
        reportActionClick={reportActionClick}
      />

      {renderExpense()}
    </Box>
  );
};

export default Expense;
