import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Pressable, ScrollView } from 'react-native';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import ApiStatusModal from '../../components/molecules/ApiStatusModal';
import Modal from '../../components/molecules/Modal';
import { currencyFormatter } from '../../utils/formators';
import { ThemeContext } from '../../ThemeContext';
import { selectRidersMap } from '../../redux/slices/tripSlice';
import Button from '../../components/molecules/Button';
import { selectLocation } from '../../redux/slices/locationSlice';
import { sendDataToSocket } from '../../api/socket';

import NoDataIllustration from '../../images/illustrations/no-data.svg';

const SettleUp = ({ route }) => {
  const { tripCode, ridersMap, myLocation } = useSelector((state) => ({
    tripCode: state.trip.code,
    ridersMap: selectRidersMap(state),
    myLocation: selectLocation(state),
  }));
  const [suggestedPayments, setSuggestedPayments] = useState(route.params.suggestedPayments);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const [payment, setPayment] = useState(null);
  const { theme } = useContext(ThemeContext);

  const renderSuggestedPayments = () => {
    return suggestedPayments.map(({ from, to, amount }, i) => (
      <Pressable
        key={from + to + i}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: `${theme.colors.foreground}40`,
          marginVertical: theme.spacing.s,
          padding: theme.spacing.s,
        }}
        onPress={() => setPayment({ from, to, amount, index: i })}
      >
        <Box>
          <Text>From</Text>
          <Text variant="subHeader">{ridersMap[from].name}</Text>
          <Box margin="xs" />
          <Text>To</Text>
          <Text variant="subHeader">{ridersMap[to].name}</Text>
        </Box>
        <Box>
          <Text variant="header" color="success">
            {currencyFormatter.format(amount)}
          </Text>
        </Box>
      </Pressable>
    ));
  };

  const reportActionClick = () => {
    setSuggestedPayments((prev) => prev.filter((_, i) => i !== payment.index));
    setPayment(null);
    if (err) setErr(null);
    if (msg) setMsg(null);
  };

  const settle = async () => {
    if (!payment) return null;
    setLoading(true);
    const data = await sendDataToSocket('ADD_SETTLEMENT', {
      expense: {
        from: payment.from,
        to: payment.to,
        amount: payment.amount,
        type: 'SETTLEMENT',
        location: myLocation,
      },
      tripCode,
    });

    if ('error' in data) {
      setErr(data.error);
    } else {
      setMsg(data.msg);
    }
    setLoading(false);
  };

  const renderSettleMent = () => {
    if (!payment) return null;

    const { from, to, amount } = payment;

    return (
      <Box>
        <Text>From</Text>
        <Text variant="subHeader">{ridersMap[from].name}</Text>
        <Box margin="xs" />
        <Text>To</Text>
        <Text variant="subHeader">{ridersMap[to].name}</Text>
        <Text variant="header" color="success">
          {currencyFormatter.format(amount)}
        </Text>
        <Box margin="s" />
        <Box style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button title="cancel" outline onPress={() => setPayment(null)} />
          <Box margin="s" />
          <Button title="settle" onPress={settle} />
        </Box>
      </Box>
    );
  };

  if (suggestedPayments.length === 0)
    return (
      <Box
        backgroundColor="background"
        padding="l"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <NoDataIllustration width="50%" height="50%" />
        <Text>No Suggested Payments</Text>
      </Box>
    );

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background, flexGrow: 1 }}>
      <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
        <Box margin="m" />
        <Text variant="subHeader">Suggested Payments</Text>
        {renderSuggestedPayments()}
        <ApiStatusModal
          loading={loading}
          error={err}
          success={msg}
          reportActionClick={reportActionClick}
        />
        <Modal
          visible={payment !== null}
          hideModal={() => setPayment(null)}
          header={<Text variant="header">Settle</Text>}
        >
          {renderSettleMent()}
        </Modal>
      </Box>
    </ScrollView>
  );
};

export default SettleUp;
