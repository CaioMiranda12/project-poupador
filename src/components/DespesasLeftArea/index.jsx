/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

import despesasGastoPrevisto from '../../services/DespesasGastoPrevisto.json';
import { formatCurrency } from '../../utils/formatCurrency';

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const { name, gasto, previsto } = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        <p>
          <strong>{name}</strong>
        </p>
        <p>
          Gasto: <span style={{ color: 'red' }}>{formatCurrency(gasto)}</span>
        </p>
        <p>
          Previsto:{' '}
          <span style={{ color: 'gray' }}>{formatCurrency(previsto)}</span>
        </p>
      </div>
    );
  }
  return null;
}

function CustomBar(props) {
  const { x, y, width, height, previsto, gasto } = props;

  // Calcula o preenchimento proporcional para o gasto, mas a largura não deve ultrapassar o valor do previsto
  const gastoWidth = Math.min((gasto / previsto) * width, width); // Não ultrapassa a largura total do gráfico
  const percentage = previsto > 0 ? ((gasto / previsto) * 100).toFixed(1) : 0; // Calcula a porcentagem do gasto sobre o previsto

  return (
    <>
      {/* Parte preenchida (Gasto) */}
      <rect x={x} y={y} width={gastoWidth} height={height} fill="red" />

      {/* Parte não preenchida (restante do Previsto) */}
      <rect
        x={x + gastoWidth} // Inicia após o gasto
        y={y}
        width={width - gastoWidth} // Preenche o restante da largura até o valor previsto
        height={height}
        fill="gray"
      />

      {/* Exibe a porcentagem no final da barra de Gasto */}
      <text
        x={x + gastoWidth + 5} // Posiciona um pouco após a barra de gasto
        y={y + height / 2 + 5} // Centraliza verticalmente
        fill="#fff"
        fontSize="18px"
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    </>
  );
}

export function DespesasLeftArea() {
  const { despesas } = despesasGastoPrevisto;

  const newDespesas = despesas.map((item) => ({
    ...item,
    PrevistoTotal: item.previsto || item.gasto, // Garante que o total seja baseado no Previsto
    Diferenca: item.gasto - item.previsto,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={newDespesas}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        layout="vertical"
        barGap={20}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 'dataMax + 500']} />
        <YAxis type="category" dataKey="name" />
        <Tooltip content={<CustomTooltip />} />

        <Bar
          dataKey="PrevistoTotal"
          fill="gray"
          barSize={30}
          shape={(props) => (
            <CustomBar
              {...props}
              previsto={props.payload.PrevistoTotal}
              gasto={props.payload.gasto}
            />
          )}
          isAnimationActive={false}
        >
          {/* LabelList mostra a diferença ao final */}
          <LabelList
            dataKey="Diferenca"
            position="right"
            formatter={(value) =>
              value > 0
                ? `+${formatCurrency(value)}`
                : `${formatCurrency(value)}`
            }
            style={{
              fill: '#000',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

CustomBar.propTypes = {
  // fill: PropTypes.string, // Cor de preenchimento
  x: PropTypes.number.isRequired, // Posição X
  y: PropTypes.number.isRequired, // Posição Y
  width: PropTypes.number.isRequired, // Largura da barra
  height: PropTypes.number.isRequired, // Altura da barra
  previsto: PropTypes.number.isRequired, // Valor total previsto
  gasto: PropTypes.number.isRequired, // Valor recebido
  payload: PropTypes.shape({
    PrevistoTotal: PropTypes.number.isRequired, // Valor total previsto
    Recebido: PropTypes.number.isRequired, // Valor recebido
  }).isRequired, // Dados associados à barra
};

CustomTooltip.propTypes = {
  active: PropTypes.bool, // Indica se o tooltip está ativo
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string, // Nome da barra
      value: PropTypes.number, // Valor recebido ou previsto
      payload: PropTypes.shape({
        name: PropTypes.string.isRequired, // Nome da categoria
        Recebido: PropTypes.number.isRequired, // Valor recebido
        Previsto: PropTypes.number.isRequired, // Valor previsto
      }),
    }),
  ),
};
