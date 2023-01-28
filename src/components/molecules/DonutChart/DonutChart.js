import React from 'react';
import { Circle, Svg } from 'react-native-svg';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';

const DonutChart = ({
  data,
  spacing = 0,
  size = 75,
  info = '',
  formatter = (value) => value,
  ...rest
}) => {
  const total = data.reduce((prev, current) => current.value + prev, 0);
  const width = size / 2;
  const center = {
    x: width / 2,
    y: width / 2,
  };
  const diameter = size;
  const radius = diameter / (2 * Math.PI);
  let percentAcc = 0;

  return (
    <Box>
      <Box
        style={{
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <Svg viewBox={`0 0 ${width} ${width}`} {...rest}>
          {data.map((d, i) => {
            const percent = Math.round((d.value / Math.ceil(total)) * diameter);
            const DashArrayPercent =
              spacing < 0 || percent - spacing < 0 ? percent : percent - spacing;
            const DashArraylength =
              spacing < 0 || percent + spacing > diameter
                ? diameter - percent
                : diameter - percent + spacing;
            const strokeDasharray = `${DashArrayPercent} ${DashArraylength}`;
            const strokeDashoffset = i === 0 ? 0 : diameter - percentAcc;
            percentAcc += percent;

            return (
              percent > 0 && (
                <Circle
                  key={i}
                  cx={center.x}
                  cy={center.y}
                  r={radius}
                  fill="none"
                  stroke={d.stroke}
                  strokeWidth={d.strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                />
              )
            );
          })}
        </Svg>
        <Box style={{ position: 'absolute', alignItems: 'center' }}>
          <Text bold>Total</Text>
          <Text bold>{formatter(total)}</Text>
        </Box>
      </Box>
      <Box>
        {data.map(({ title, stroke, value }, i) => (
          <Box
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            key={i}
          >
            <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Box style={{ width: 10, height: 10, backgroundColor: stroke }} />
              <Text style={{ marginLeft: 5 }}>{title}</Text>
            </Box>
            <Text bold>{formatter(value)}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DonutChart;
