import PropTypes from 'prop-types';

import { GraphShowContainer } from '../../pages/MensalBalance/styles';
import saldoReceitasDespesas from '../../services/SaldoReceitasDespesas.json';
import { calcDiferencaPorcentagem } from '../../utils/calcDiferencaPorcentagem';
import { formatCurrency } from '../../utils/formatCurrency';
import { SaldoRightArea } from '../SaldoRightArea';
import { GraphBarVerticalInfo, GraphInfo, GraphItem, TopPart } from './styles';

export function BarGraphVertical({
  firstMensalValue,
  secondMensalValue,
  firstName,
  secondName,
  selectedDate,
}) {
  // firstMensalValue = receitaMensal - despesaMensal (acumuladoMensal = saldoMensal)
  // secondMensalValue = previstoMensal

  return (
    <GraphItem>
      <GraphInfo>
        <TopPart>
          <h3>
            Saldo: {firstName} vs {secondName}
          </h3>

          <GraphBarVerticalInfo>
            <div>
              <div
                style={{
                  backgroundColor: '#82ca9d',
                  height: 6,
                  width: 200,
                }}
              />
              <p>
                {firstName}: {formatCurrency(firstMensalValue)}
              </p>
            </div>
            <div>
              <div
                style={{
                  backgroundColor: 'gray',
                  height: 6,
                  width: 200,
                }}
              />
              <p>
                {secondName}: {formatCurrency(secondMensalValue)}
              </p>
            </div>
            <div>
              <div
                style={{
                  backgroundColor: 'transparent',
                  height: 6,
                  width: 200,
                }}
              />
              <p>
                <strong>Diferença: </strong>

                {firstMensalValue - secondMensalValue >= 0 ? (
                  <span style={{ color: '#20b7d9' }}>
                    +{formatCurrency(firstMensalValue - secondMensalValue)}{' '}
                    <br /> (
                    {calcDiferencaPorcentagem(
                      firstMensalValue,
                      secondMensalValue,
                    )}
                    )
                  </span>
                ) : (
                  <span style={{ color: 'red' }}>
                    {formatCurrency(firstMensalValue - secondMensalValue)}{' '}
                    <br /> (
                    {calcDiferencaPorcentagem(
                      firstMensalValue,
                      secondMensalValue,
                    )}
                    )
                  </span>
                )}
              </p>
            </div>
          </GraphBarVerticalInfo>
        </TopPart>
      </GraphInfo>

      <GraphShowContainer>
        <SaldoRightArea selectedDate={selectedDate} />
      </GraphShowContainer>
    </GraphItem>
  );
}

BarGraphVertical.propTypes = {
  firstMensalValue: PropTypes.number,
  secondMensalValue: PropTypes.number,
  firstName: PropTypes.string,
  secondName: PropTypes.string,
  selectedDate: PropTypes.string,
};
