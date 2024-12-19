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

import despesasGastoPrevisto from '../../services/DespesasGastoPrevisto.json';

export function DespesasRightArea({ selectedDate }) {
  const { despesas } = despesasGastoPrevisto;

  // Filtrar os dados para o mês selecionado
  const despesasFiltradas = despesas.filter(
    (item) => item.mes === selectedDate,
  );

  // Somar valores para o mês selecionado
  const dadosDespesasAgrupados = despesasFiltradas.reduce(
    (acc, item) => {
      acc.gasto += item.gasto;
      acc.previsto += item.previsto;
      return acc;
    },
    { mes: selectedDate, gasto: 0, previsto: 0 },
  );

  // Preparar os dados para o gráfico
  const chartDataDespesas = [dadosDespesasAgrupados]; // Apenas um objeto com os valores do mês selecionado

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={chartDataDespesas}
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
          dataKey="gasto"
          fill="red"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        >
          <LabelList
            dataKey="gasto"
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

DespesasRightArea.propTypes = {
  selectedDate: PropTypes.string.isRequired,
};
