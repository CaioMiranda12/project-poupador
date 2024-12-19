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
  const previstoWidth = width; // Barra completa baseada no valor previsto

  return (
    <>
      {/* Parte preenchida (Previsto) */}
      <rect x={x} y={y} width={previstoWidth} height={height} fill="gray" />

      {/* Parte preenchida (Gasto) */}
      <rect x={x} y={y} width={gastoWidth} height={height} fill="red" />

      {/* Exibe os valores ao lado das barras */}
      <text
        x={x + previstoWidth + 5} // Posiciona após a barra de previsto
        y={y + height / 2 + 5} // Centraliza verticalmente
        fill="#000"
        fontSize="14px"
        fontWeight="bold"
      >
        {`${formatCurrency(previsto - gasto)}`}
      </text>
    </>
  );
}

export function DespesasTypeArea() {
  const { despesas } = despesasGastoPrevisto;

  // Agrupar os gastos por tipo
  const despesasAgrupadas = despesas.reduce((acc, item) => {
    const tipoExistente = acc.find((d) => d.tipo === item.tipo);
    if (tipoExistente) {
      tipoExistente.gasto += item.gasto;
      tipoExistente.previsto += item.previsto;
    } else {
      acc.push({
        tipo: item.tipo,
        gasto: item.gasto,
        previsto: item.previsto,
      });
    }
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={despesasAgrupadas}
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
        <YAxis type="category" dataKey="tipo" />
        <Tooltip content={<CustomTooltip />} />

        {/* Barra personalizada combinada */}
        <Bar
          dataKey="previsto"
          shape={(props) => (
            <CustomBar
              {...props}
              previsto={props.payload.previsto}
              gasto={props.payload.gasto}
            />
          )}
          barSize={30}
          isAnimationActive={false}
        />
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
