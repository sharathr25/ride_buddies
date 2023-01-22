import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Box from '../../../components/atoms/Box';
import Text from '../../../components/atoms/Text';
import Icon from '../../../components/atoms/Icon';
import Toggle from '../../../components/atoms/Toggle';
import TextInput from '../../../components/molecules/TextInput';
import Button from '../../../components/molecules/Button';
import Avatar from '../../../components/molecules/Avatar/Avatar';
import Picker from '../../../components/molecules/Picker/Picker';
import { ThemeContext } from '../../../ThemeContext';
import useForm from '../../../hooks/useForm';
import { sendDataToSocket } from '../../../api/socket';
import { selectExpenses, selectRiders } from '../../../redux/slices/tripSlice';

const ExpenseForm = ({ expenseId, setShowExpenseFormModal, code }) => {
  const { theme } = useContext(ThemeContext);
  const [err, setErr] = useState(null);
  const { riders, expenses } = useSelector((state) => ({
    riders: selectRiders(state),
    expenses: selectExpenses(state),
  }));
  const [forRiders, setForRiders] = useState(new Set(expense?.for || []));

  const expense = expenses.find((e) => e._id === expenseId);

  const onValidate = ({ title, amount }) => {
    const errors = {};

    if (title === '') errors.title = 'Title is required';
    if (amount === '') errors.amount = 'Amount is required';

    return errors;
  };

  const onSubmit = async (values) => {
    const { forAll, ...rest } = values;
    const data = await sendDataToSocket(expense ? 'UPDATE_EXPENSE' : 'ADD_EXPENSE', {
      expense: { ...rest, for: [...forRiders.values()], _id: expense?._id },
      tripCode: code,
    });
    if ('error' in data) {
      setErr(data.error);
    } else {
      setShowExpenseFormModal(false);
    }
  };

  const { form, isValid, handleSubmit, setForm } = useForm({
    initialValues: {
      title: expense?.title || '',
      amount: expense?.amount ? `${expense?.amount}` : '',
      by: expense?.by || riders[0].uid,
      forAll: forRiders.size ? false : true,
    },
    onValidate,
    onSubmit,
  });

  return (
    <Box
      backgroundColor="background"
      style={{ borderWidth: 1, borderColor: theme.colors.foreground, borderRadius: 10 }}
      padding="l"
    >
      <Text variant="subHeader">New Expense</Text>

      <Box margin="s" />

      <TextInput
        label="title"
        value={form.values.title}
        error={form.errors.title}
        onChangeText={setForm('title')}
      />

      <Picker
        options={riders.map((r) => ({ value: r.uid, label: r.name }))}
        label="by"
        selectedValue={form.values.by}
      />

      <Box margin="s" />

      <TextInput
        label="amount"
        keyboardType="phone-pad"
        value={form.values.amount}
        error={form.errors.amount}
        onChangeText={setForm('amount')}
      />

      <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>For All</Text>
        <Toggle onValueChange={setForm('forAll')} value={form.values.forAll} />
      </Box>

      <Box margin="s" />

      {!form.values.forAll && (
        <Box style={{ height: 60 }}>
          <ScrollView horizontal>
            {riders.map((r, i) => (
              <Box key={i} style={{ width: 40, marginRight: 10, alignItems: 'center', zIndex: 1 }}>
                <Avatar
                  initial={r.name.charAt(0)}
                  backgroundColor={r.color}
                  onPress={() => {
                    const cloned = new Set(forRiders);
                    forRiders.has(r.uid) ? cloned.delete(r.uid) : cloned.add(r.uid);
                    setForRiders(cloned);
                  }}
                />
                <Text variant="info" ellipsizeMode="tail" numberOfLines={1}>
                  {r.name}
                </Text>
                {forRiders.has(r.uid) && (
                  <Box
                    style={{
                      position: 'absolute',
                      right: 0,
                      width: 0,
                      height: 0,
                      borderLeftWidth: 20,
                      borderTopWidth: 20,
                      borderLeftColor: 'transparent',
                      borderTopColor: theme.colors.success,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon
                      name="check"
                      color={theme.colors.white}
                      style={{ position: 'absolute', top: -20, right: 0 }}
                    />
                  </Box>
                )}
              </Box>
            ))}
          </ScrollView>
        </Box>
      )}

      <Box margin="s" />

      {err && <Text color="danger">{err}</Text>}

      <Box style={{ flexDirection: 'row' }}>
        <Button title="cancel" outline onPress={() => setShowExpenseFormModal(false)} />
        <Box margin="s" />
        <Button title="save" disabled={!isValid()} onPress={handleSubmit} />
      </Box>
    </Box>
  );
};

export default ExpenseForm;
