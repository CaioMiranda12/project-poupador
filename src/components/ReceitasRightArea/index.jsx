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

export function ReceitasRightArea({ selectedDate }) {
  const { receitas } = receitasRecebidoPrevisto;

  // Filtrar os dados para o mês selecionado
  const receitasFiltradas = receitas.filter(
    (item) => item.mes === selectedDate,
  );

  // Somar valores para o mês selecionado
  const dadosAgrupados = receitasFiltradas.reduce(
    (acc, item) => {
      acc.Recebido += item.Recebido;
      acc.Previsto += item.Previsto;
      return acc;
    },
    { mes: selectedDate, Recebido: 0, Previsto: 0 },
  );

  // Preparar os dados para o gráfico
  const chartData = [dadosAgrupados]; // Apenas um objeto com os valores do mês selecionado

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
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip formatter={(value) => value} />

        <Bar
          dataKey="Recebido"
          fill="#20b7d9"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        >
          <LabelList
            dataKey="Recebido"
            position="top" // Rótulo no topo da barra
            formatter={(value) => `${value}`} // Formata o valor
            style={{ fill: '#000', fontWeight: 'bold', fontSize: 22 }}
          />
        </Bar>

        <Bar
          dataKey="Previsto"
          fill="gray"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        >
          <LabelList
            dataKey="Previsto"
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
