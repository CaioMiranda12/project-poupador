/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import { formatCurrency } from '../../utils/formatCurrency';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#AF19FF',
  '#FF4563',
  'gray',
];

export function PieChartDespesaByCategory({ data }) {
  // Calcular o total das despesas
  const totalGasto = data.reduce((acc, item) => acc + item.gasto, 0);

  // Adicionar porcentagem ao dataset
  const dataWithPercentage = data.map((item) => ({
    ...item,
    percentage: ((item.gasto / totalGasto) * 100).toFixed(2),
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={dataWithPercentage}
        dataKey="gasto"
        nameKey="categoria"
        cx="50%"
        cy="50%"
        outerRadius={60}
        fill="#8884d8"
        label={(entry) => `${entry.categoria}: ${entry.percentage}%`}
        labelLine={false}
      >
        {dataWithPercentage.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value) => formatCurrency(value)}
        contentStyle={{ backgroundColor: '#f4f4f4', borderRadius: '5px' }}
      />
    </PieChart>
  );
}

PieChartDespesaByCategory.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      categoria: PropTypes.string.isRequired,
      gasto: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
