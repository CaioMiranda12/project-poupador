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
  LabelList,
} from 'recharts';

import receitasRecebidoPrevisto from '../../services/ReceitasRecebidoPrevisto.json';
import saldoReceitasDespesas from '../../services/SaldoReceitasDespesas.json';

export function ReceitasRightArea({ selectedDate }) {
  const { receitas } = receitasRecebidoPrevisto;

  // Depois apagar tudo abaixo
  const dataRight = saldoReceitasDespesas.productSales;

  const selectedData = dataRight.find((item) => item.name === selectedDate);

  // Define os dados padrão para evitar erros de renderização
  const acumulado = selectedData
    ? selectedData.Receitas - selectedData.Despesas
    : 0;
  const previsto = selectedData ? selectedData.previsto : 0;

  const chartData = [{ name: selectedDate, acumulado, previsto }];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 30,
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
          fill="#82ca9d"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        >
          <LabelList
            dataKey="acumulado"
            position="top" // Rótulo no topo da barra
            formatter={(value) => `${value}`} // Formata o valor
            style={{ fill: '#000', fontWeight: 'bold', fontSize: 22 }}
          />
        </Bar>

        <Bar
          dataKey="previsto"
          fill="gray"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        >
          <LabelList
            dataKey="previsto"
            position="top" // Rótulo no topo da barra
            formatter={(value) => `${value}`} // Formata o valor
            style={{ fill: '#000', fontWeight: 'bold', fontSize: 22 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

ReceitasRightArea.propTypes = {
  selectedDate: PropTypes.string.isRequired,
};
