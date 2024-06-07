import { useRef, useEffect } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';
import Box from '@mui/material/Box';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
);

export default function ChartGraph({
  dataset,
  color = '#716aca',
  options,
  ...props
}) {
  const $el = useRef(null);

  useEffect(() => {
    const chart = new Chart($el.current, {
      type: 'line',
      data: {
        labels: dataset.map((d) => d.name),
        datasets: [
          {
            data: dataset.map((d) => d.count),
            borderColor: dataset.map((d) => d.color || color),
            backgroundColor: dataset.map((d) => d.color || color),
          },
        ],
      },
      options: {
        ...options,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [dataset, color, options]);

  return (
    <Box {...props}>
      <canvas ref={$el} />
    </Box>
  );
}
