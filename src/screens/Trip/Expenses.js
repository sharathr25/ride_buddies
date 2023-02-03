import React, { useContext } from 'react';
import { FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Button from '../../components/molecules/Button';
import { selectExpenses, selectRidersMap } from '../../redux/slices/tripSlice';
import { ThemeContext } from '../../ThemeContext';
import { currencyFormatter } from '../../utils/formators';

import NoDataIllustration from '../../images/illustrations/no-data.svg';

const Expenses = ({ navigation }) => {
  const { expenses, tripCode, ridersMap } = useSelector((state) => ({
    tripCode: state.trip.code,
    expenses: selectExpenses(state),
    ridersMap: selectRidersMap(state),
  }));
  const { theme } = useContext(ThemeContext);

  const gotoCreateExpenseScreen = () => {
    navigation.push('ExpenseForm', { tripCode });
  };

  const gotoExpenseScreen = (expenseId) => {
    navigation.push('Expense', { expenseId });
  };

  const renderExpense = ({ item: expense }) => {
    const expenseCreatedOn = new Date(expense.creation.on);
    return (
      <Pressable
        style={{
          backgroundColor: `${theme.colors.foreground}40`,
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          padding: theme.spacing.s,
          borderColor: theme.colors.success,
          borderWidth: expense.type === 'SETTLEMENT' ? 2 : 0,
        }}
        onPress={gotoExpenseScreen.bind(null, expense._id)}
      >
        <Box style={{ flex: 0.12 }}>
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
        <Box style={{ flex: 0.63 }}>
          <Text variant="subHeader">
            {expense.type === 'SETTLEMENT' ? ridersMap[expense.to].name : expense.to}
          </Text>
          <Text variant="info">{ridersMap[expense.from].name} paid</Text>
        </Box>
        <Box style={{ flex: 0.25, alignItems: 'flex-end' }}>
          <Text color={expense.type === 'SETTLEMENT' ? 'success' : 'danger'}>
            {currencyFormatter.format(expense.amount)}
          </Text>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <Box margin="m" />
      {expenses.length === 0 ? (
        <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <NoDataIllustration width="50%" height="50%" />
          <Text variant="subHeader">No Expenses</Text>
          <Box margin="s" />
        </Box>
      ) : (
        <FlatList
          ItemSeparatorComponent={<Box margin="s" />}
          ListHeaderComponent={() => (
            <Text
              variant="subHeader"
              style={{ marginBottom: 5, backgroundColor: theme.colors.background }}
            >
              Expenses
            </Text>
          )}
          stickyHeaderIndices={[0]}
          data={expenses}
          keyExtractor={(item) => item._id}
          renderItem={renderExpense}
          style={{ marginBottom: 30 }}
        />
      )}

      <Box style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Button rightIconName="plus" onPress={gotoCreateExpenseScreen} size="m" />
      </Box>
    </Box>
  );
};

export default Expenses;
