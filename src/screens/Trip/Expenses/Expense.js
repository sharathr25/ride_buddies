import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import Box from '../../../components/atoms/Box';
import Text from '../../../components/atoms/Text';
import Button from '../../../components/molecules/Button';
import { selectExpenses, selectRidersMap } from '../../../redux/slices/tripSlice';
import { ThemeContext } from '../../../ThemeContext';
import { currencyFormatter } from '../../../utils/formators';
import Avatar from '../../../components/molecules/Avatar/Avatar';
import { sendDataToSocket } from '../../../api/socket';
import Loader from '../../../components/atoms/Loader';

const Expense = ({ expenseId, setShowExpenseFormModal, setExpenseId }) => {
  const { theme } = useContext(ThemeContext);
  const { code, ridersMap, expenses } = useSelector((state) => ({
    code: state.trip.code,
    ridersMap: selectRidersMap(state),
    expenses: selectExpenses(state),
  }));
  const expense = expenses.find((e) => e._id === expenseId);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const { _id, title, amount, creation, by, forAll, for: forRiders = [] } = expense;
  const expenseCreatedOn = new Date(creation.on);

  const deleteExpense = async () => {
    setLoading(true);
    const data = await sendDataToSocket('DELETE_EXPENSE', { _id, tripCode: code });
    if ('error' in data) {
      setErr(data.error);
    } else {
      setExpense(null);
      setErr(null);
    }
    setLoading(false);
  };

  return (
    <Box
      backgroundColor="background"
      style={{ borderWidth: 2, borderColor: theme.colors.foreground, borderRadius: 10 }}
      padding="l"
    >
      <Text variant="header">{title}</Text>
      <Text color="danger" variant="subHeader">
        {currencyFormatter.format(amount)}
      </Text>
      <Box margin="s" />
      <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Created by</Text>
        <Text style={{ fontWeight: '500' }}>{ridersMap[by].name}</Text>
      </Box>
      <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Paid by</Text>
        <Text style={{ fontWeight: '500' }}>{ridersMap[expense.by].name}</Text>
      </Box>
      <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>On</Text>
        <Text style={{ fontWeight: '500' }}>{format(expenseCreatedOn, 'hh:mm a, d MMM yyyy')}</Text>
      </Box>
      <Box margin="s" />
      <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>For</Text>
        <Text style={{ fontWeight: '500' }}>
          {forAll ? 'All' : `${forRiders.length} Person${forRiders.length === 1 ? '' : 's'}`}
        </Text>
      </Box>
      <Box margin="xs" />
      {forRiders.length !== 0 && (
        <Box style={{ height: 80 }}>
          <ScrollView horizontal>
            {forRiders
              .map((uid) => ridersMap[uid])
              .map(({ name, color }, i) => (
                <Box key={i} style={{ width: 40, marginRight: 10 }}>
                  <Avatar initial={name.charAt(0)} backgroundColor={color} />
                  <Text variant="info" numberOfLines={2}>
                    {name}
                  </Text>
                </Box>
              ))}
          </ScrollView>
        </Box>
      )}

      <Box margin="s" />

      <Box style={{ flexDirection: 'row' }}>
        <Button title="close" outline onPress={() => setExpenseId(null)} />
        <Box margin="xs" />
        <Button title="delete" onPress={deleteExpense} outline color="danger" />
        <Box margin="xs" />
        <Button title="edit" onPress={() => setShowExpenseFormModal(true)} />
      </Box>

      <Box margin="s" />

      {err && <Text color="danger">{err}</Text>}
    </Box>
  );
};

export default Expense;
