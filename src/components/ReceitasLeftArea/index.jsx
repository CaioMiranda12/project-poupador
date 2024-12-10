/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import receitasRecebidoPrevisto from '../../services/ReceitasRecebidoPrevisto.json';

export function ReceitasLeftArea() {
  const { receitas } = receitasRecebidoPrevisto;

  const newReceitas = receitas.map((item) => ({
    ...item,
    PrevistoDisplay: item.Recebido > item.Previsto ? null : item.Previsto,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={newReceitas}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Recebido" stackId="a" fill="#20b7d9" />
        <Bar dataKey="PrevistoDisplay" stackId="a" fill="gray" />
      </BarChart>
    </ResponsiveContainer>
  );
}
