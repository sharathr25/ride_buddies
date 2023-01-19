import React from 'react';
import { Circle, Svg } from 'react-native-svg';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';

const DonutChart = ({ data, spacing = 0, size = 100, info = '', ...rest }) => {
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
    <Box style={{ alignItems: 'center', flexDirection: 'row' }}>
      <Box
        style={{
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
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
        <Box style={{ position: 'absolute' }}>
          <Text style={{ fontWeight: 'bold' }}>{total}</Text>
        </Box>
      </Box>
      <Box>
        {data.map(({ title, stroke, value }) => (
          <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Box style={{ width: 10, height: 10, backgroundColor: stroke }} />
            <Text style={{ marginHorizontal: 5 }}>{title}</Text>
            <Text color="primary">{value}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DonutChart;
