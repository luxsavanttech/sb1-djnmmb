import { Card, Title, AreaChart } from '@tremor/react';
import { format } from 'date-fns';

const data = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return {
    date: format(date, 'MMM dd'),
    'Heart Rate': Math.floor(Math.random() * (90 - 60) + 60),
    'Blood Pressure': Math.floor(Math.random() * (140 - 110) + 110),
    'Sleep Hours': Math.floor(Math.random() * (9 - 5) + 5),
  };
}).reverse();

export function HealthMetricsChart() {
  return (
    <Card>
      <Title>Weekly Health Trends</Title>
      <AreaChart
        className="h-72 mt-4"
        data={data}
        index="date"
        categories={['Heart Rate', 'Blood Pressure', 'Sleep Hours']}
        colors={['rose', 'blue', 'emerald']}
        valueFormatter={(value) => `${value}`}
      />
    </Card>
  );
}