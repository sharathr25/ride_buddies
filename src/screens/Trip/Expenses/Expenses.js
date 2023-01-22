import React, { useContext, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import ExpenseForm from './ExpenseForm';
import Expense from './Expense';
import Box from '../../../components/atoms/Box';
import Text from '../../../components/atoms/Text';
import Button from '../../../components/molecules/Button';
import { selectExpenses, selectRidersMap } from '../../../redux/slices/tripSlice';
import { ThemeContext } from '../../../ThemeContext';
import { currencyFormatter } from '../../../utils/formators';

import NoDataIllustration from '../../../images/illustrations/no-data.svg';
import Modal from '../../../components/molecules/Modal';

const Expenses = () => {
  const { expenses, code, ridersMap } = useSelector((state) => ({
    code: state.trip.code,
    expenses: selectExpenses(state),
    ridersMap: selectRidersMap(state),
  }));
  const { theme } = useContext(ThemeContext);
  const [showExpenseFormModal, setShowExpenseFormModal] = useState(false);
  const [expenseId, setExpenseId] = useState(null);

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
        }}
        onPress={() => setExpenseId(expense._id)}
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
          <Text variant="subHeader">{expense.title}</Text>
          <Text variant="info">{ridersMap[expense.by].name} paid</Text>
        </Box>
        <Box style={{ flex: 0.25, alignItems: 'flex-end' }}>
          <Text color="danger">{currencyFormatter.format(expense.amount)}</Text>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
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

      <Modal visible={expenseId !== null} hideModal={() => setExpenseId(null)}>
        <Expense
          expenseId={expenseId}
          setShowExpenseFormModal={setShowExpenseFormModal}
          setExpenseId={setExpenseId}
        />
      </Modal>

      <Modal visible={showExpenseFormModal} hideModal={() => setShowExpenseFormModal(false)}>
        <ExpenseForm
          expenseId={expenseId}
          setShowExpenseFormModal={setShowExpenseFormModal}
          code={code}
        />
      </Modal>

      <Box style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Button leftIconName="plus" onPress={() => setShowExpenseFormModal(true)} size="m" />
      </Box>
    </Box>
  );
};

export default Expenses;
