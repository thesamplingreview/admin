import { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import { stringToColor } from '@/helpers/utils';

export default function MChartHorizontalBar({ dataset, maxCount, ...props }) {
  const getMaxCount = useMemo(() => {
    if (maxCount) {
      return maxCount;
    }
    return dataset.reduce((acc, data) => (acc > data.count ? acc : data.count), 0);
  }, [dataset, maxCount]);

  return (
    <Box
      {...props}
      display="flex"
      flexDirection="column"
    >
      {dataset.map((data) => (
        <BarItem
          key={data.id}
          data={data}
          max={getMaxCount}
          color={data.color || stringToColor(data.label)}
        />
      ))}
    </Box>
  );
}

function BarItem({ data, color, max }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(((data.count / max) * 100));
  }, [data.count, max]);

  return (
    <Box display="flex" alignItems="center">
      <Box
        flex="0 0 auto"
        width="100px"
        fontSize="0.75em"
        textAlign="right"
        className="truncate"
        borderRight="1px solid var(--border-500)"
        title={data.label}
        py={1}
        px={1}
      >
        {data.label}
      </Box>
      <Box flexGrow="1" pr={3}>
        <Box width="100%" height="12px">
          <Box
            position="relative"
            title={data.label}
            height="100%"
            width={`${percentage}%`}
            bgcolor={color}
            borderRadius="0 10px 10px 0"
            sx={{
              transition: 'width .5s ease-out, opacity .3s',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            {data.count > 0 && (
              <Box
                position="absolute"
                fontSize="0.75em"
                left="100%"
                top="50%"
                textAlign="center"
                width="24px"
                sx={{ transform: 'translateY(-50%)' }}
              >
                {data.count}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
