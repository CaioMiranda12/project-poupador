import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';

import saldoReceitasDespesas from '../../services/SaldoReceitasDespesas.json';

export function SaldoLeftArea({ showReceitas, showDespesas, showSaldo }) {
  const { productSales } = saldoReceitasDespesas;

  const newProductSales = productSales.map((item) => ({
    name: item.name,
    Receitas: item.Receitas,
    Despesas: item.Despesas,
    Saldo: item.Receitas - item.Despesas,
  }));

  const saldos = newProductSales.map((item) => item.Saldo);

  const minSaldo = Math.min(...saldos);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={400}
        data={newProductSales}
        margin={{ right: 30 }}
      >
        <YAxis domain={[minSaldo - 500, 'dataMax']} allowDataOverflow />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />

        <Tooltip />

        {/* Mostrar Receitas apenas se showReceitas for true */}
        {showReceitas && (
          <Line
            type="monotone"
            dataKey="Receitas"
            stroke="#2563eb"
            fill="#3b82f6"
            stackId="1"
            strokeWidth={3}
          />
        )}

        {/* Mostrar Despesas apenas se showDespesas for true */}
        {showDespesas && (
          <Line
            type="monotone"
            dataKey="Despesas"
            stroke="red"
            fill="red"
            stackId="1"
            strokeWidth={3}
          />
        )}

        {/* Mostrar Saldo apenas se showSaldo for true */}
        {showSaldo && (
          <Line
            type="monotone"
            dataKey="Saldo"
            stroke="green"
            fill="green"
            stackId="1"
            strokeWidth={3}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

SaldoLeftArea.propTypes = {
  showReceitas: PropTypes.bool.isRequired,
  showDespesas: PropTypes.bool.isRequired,
  showSaldo: PropTypes.bool.isRequired,
};
