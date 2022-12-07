import React, { useRef, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import Text from '../../atoms/Text';

const Error = ({ error = '' }) => {
  const viewElement = useRef(null);

  useEffect(() => {
    if (error) {
      viewElement.current.animate('shake', 500);
    } else {
      viewElement.current.animate('bounceOut', 500);
    }
  }, [error]);

  const viewStyles = [{ opacity: 0 }];

  if (error) {
    viewStyles.push({ opacity: 1 });
  }

  return (
    <Animatable.View style={viewStyles} ref={viewElement}>
      <Text color="danger" variant="info">
        {error}
      </Text>
    </Animatable.View>
  );
};

export default Error;
