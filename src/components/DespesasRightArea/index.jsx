import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import saldoAcumuladoPrevisto from '../../services/SaldoAcumuladoPrevisto.json';

export function DespesasRightArea({ selectedDate }) {
  const dataRight = saldoAcumuladoPrevisto.data;

  const selectedData = dataRight.find((item) => item.name === selectedDate);

  // Define os dados padrão para evitar erros de renderização
  const acumulado = selectedData ? selectedData.acumulado : 0;
  const previsto = selectedData ? selectedData.previsto : 0;

  const chartData = [{ name: selectedDate, acumulado, previsto }];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={80}
        barGap={100}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="acumulado"
          fill="red"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="previsto"
          fill="gray"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

DespesasRightArea.propTypes = {
  selectedDate: PropTypes.string.isRequired,
};
