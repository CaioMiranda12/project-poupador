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
} from 'recharts';

import receitasRecebidoPrevisto from '../../services/ReceitasRecebidoPrevisto.json';

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const { name, Recebido, Previsto } = payload[0].payload;

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

        <br />

        <p>
          Recebido: <span style={{ color: '#20b7d9' }}>{Recebido}</span>
        </p>

        <br />

        <p>
          Previsto: <span style={{ color: 'gray' }}>{Previsto}</span>
        </p>
      </div>
    );
  }
  return null;
}

function CustomBar(props) {
  const { fill, x, y, width, height, previsto, recebido } = props;

  // Calcula o preenchimento proporcional
  const recebidoWidth = (recebido / previsto) * width;

  return (
    <>
      {/* Parte preenchida (Recebido) */}
      <rect x={x} y={y} width={recebidoWidth} height={height} fill="#20b7d9" />

      {/* Parte não preenchida (restante do Previsto) */}
      <rect
        x={x + recebidoWidth}
        y={y}
        width={width - recebidoWidth}
        height={height}
        fill="gray"
      />
    </>
  );
}

export function ReceitasLeftArea() {
  const { receitas } = receitasRecebidoPrevisto;

  const newReceitas = receitas.map((item) => ({
    ...item,
    PrevistoTotal: item.Previsto || item.Recebido, // Garante que o total seja baseado no Previsto
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
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip content={<CustomTooltip />} />

        <Bar
          dataKey="PrevistoTotal" // Total sempre baseado no Previsto
          shape={(props) => (
            <CustomBar
              {...props}
              previsto={props.payload.PrevistoTotal} // Tamanho total da barra
              recebido={props.payload.Recebido} // Tamanho preenchido (Recebido)
            />
          )}
          isAnimationActive={false}
          barSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

CustomBar.propTypes = {
  fill: PropTypes.string, // Cor de preenchimento
  x: PropTypes.number.isRequired, // Posição X
  y: PropTypes.number.isRequired, // Posição Y
  width: PropTypes.number.isRequired, // Largura da barra
  height: PropTypes.number.isRequired, // Altura da barra
  previsto: PropTypes.number.isRequired, // Valor total previsto
  recebido: PropTypes.number.isRequired, // Valor recebido
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
