import { useRef, useEffect } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from 'chart.js';
import Box from '@mui/material/Box';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
);

export default function ChartGraph({
  dataset,
  color = '#716aca',
  options,
  ...props
}) {
  const $el = useRef(null);

  useEffect(() => {
    const ctx = $el.current.getContext('2d');
    const gradientBg = ctx.createLinearGradient(0, 0, 0, 300);
    gradientBg.addColorStop(0, `${color}59`);
    gradientBg.addColorStop(1, `${color}00`);

    const chart = new Chart($el.current, {
      type: 'line',
      data: {
        labels: dataset.map((d) => d.name),
        datasets: [
          {
            data: dataset.map((d) => d.count),
            fill: true,
            backgroundColor: gradientBg,
            borderColor: dataset.map((d) => d.color || color),
            pointBorderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#fff',
            tension: 0.2,
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
        scales: {
          y: {
            min: 0,
            ticks: {
              maxTicksLimit: 10,
              stepSize: 1,
            },
            grid: {
              display: false,
            },
          },
          x: {
            ticks: {
              maxTicksLimit: 30,
              font: {
                size: 11,
              },
            },
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
