import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Toggle from '../../components/atoms/Toggle';
import TextInput from '../../components/molecules/TextInput';
import CheckBox from '../../components/molecules/CheckBox';
import Button from '../../components/molecules/Button';
import Avatar from '../../components/molecules/Avatar/Avatar';
import Picker from '../../components/molecules/Picker/Picker';
import ApiStatusModal from '../../components/molecules/ApiStatusModal';
import useForm from '../../hooks/useForm';
import { sendDataToSocket } from '../../api/socket';
import { selectExpenses, selectRiders } from '../../redux/slices/tripSlice';
import useAuth from '../../hooks/useAuth';

const ExpenseForm = ({ route, navigation }) => {
  const { expenseId, tripCode } = route.params;
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const { riders, expenses } = useSelector((state) => ({
    riders: selectRiders(state),
    expenses: selectExpenses(state),
  }));
  const { user } = useAuth();
  const expense = expenses.find((e) => e._id === expenseId);
  const [forRiders, setForRiders] = useState(new Set(expense ? expense.for : []));

  const onValidate = ({ title, amount }) => {
    const errors = {};

    if (title === '') errors.title = 'Title is required';
    if (amount === '') errors.amount = 'Amount is required';

    return errors;
  };

  const onSubmit = async (values) => {
    const { forAll, ...rest } = values;
    setLoading(true);
    const data = await sendDataToSocket(expense ? 'UPDATE_EXPENSE' : 'ADD_EXPENSE', {
      expense: { ...rest, for: [...forRiders.values()], _id: expense?._id },
      tripCode,
    });
    if ('error' in data) {
      setErr(data.error);
    } else {
      setMsg(data.msg);
    }
    setLoading(false);
  };

  const { form, isValid, handleSubmit, setForm, validate } = useForm({
    initialValues: {
      title: expense?.title || '',
      amount: expense?.amount ? `${expense?.amount}` : '',
      by: expense?.by || riders[0].uid,
      forAll: forRiders.size ? false : true,
    },
    onValidate,
    onSubmit,
  });

  const setForAll = (value) => {
    setForm('forAll')(value);
    if (!value) setForRiders(new Set());
  };

  const reportActionClick = () => {
    if (err) setErr(null);
    if (msg) {
      setMsg(null);
      navigation.goBack();
    }
  };

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <ApiStatusModal
        loading={loading}
        error={err}
        success={msg}
        reportActionClick={reportActionClick}
      />
      <Text variant="subHeader">New Expense</Text>

      <Box margin="s" />

      <TextInput
        label="title"
        value={form.values.title}
        error={form.errors.title}
        onChangeText={setForm('title')}
        onBlur={validate}
      />

      <Picker
        options={riders.map((r) => ({ value: r.uid, label: r.name }))}
        label="by"
        selectedValue={form.values.by}
        onValueChange={setForm('by')}
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
        <Toggle onValueChange={setForAll} value={form.values.forAll} />
      </Box>

      <Box margin="s" />

      <FlatList
        keyExtractor={(_, i) => i}
        data={riders}
        renderItem={({ item: r }) => (
          <Box style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Avatar initial={r.name.charAt(0)} backgroundColor={r.color} />
            <Box margin="xs" />
            <Text>{r.name}</Text>
            <Box margin="xs" />
            {user.uid === r.uid && <Text color="success">You</Text>}
            <Box style={{ flex: 1 }} />
            <CheckBox
              onChange={() => {
                const cloned = new Set(forRiders);
                forRiders.has(r.uid) ? cloned.delete(r.uid) : cloned.add(r.uid);
                setForRiders(cloned);
              }}
              isChecked={forRiders.has(r.uid)}
            />
          </Box>
        )}
        ItemSeparatorComponent={<Box margin="s" />}
      />

      <Button
        title="save"
        disabled={!isValid()}
        onPress={handleSubmit}
        style={{ alignSelf: 'flex-end' }}
      />
    </Box>
  );
};

export default ExpenseForm;
