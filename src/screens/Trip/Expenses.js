import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import { selectExpenses } from '../../redux/slices/tripSlice';

import NoDataIllustration from '../../images/illustrations/no-data.svg';

const Expenses = () => {
  const expenses = useSelector(selectExpenses);

  if (expenses.length === 0)
    return (
      <Box
        backgroundColor="background"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <NoDataIllustration width="50%" height="50%" />
        <Text variant="subHeader">No Expenses</Text>
        <Box margin="s" />
      </Box>
    );

  const renderExpense = ({ item: expense }) => null;

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.uid}
        renderItem={renderExpense}
        ListHeaderComponent={() => (
          <Text variant="subHeader" style={{ marginBottom: 5 }}>
            Expenses
          </Text>
        )}
      />
    </Box>
  );
};

export default Expenses;
