import PropTypes from 'prop-types';

import { GraphShowContainer } from '../../pages/MensalBalance/styles';
import { calcDiferencaPorcentagem } from '../../utils/calcDiferencaPorcentagem';
import { formatCurrency } from '../../utils/formatCurrency';
import { GraphBarVerticalInfo, GraphInfo, GraphItem, TopPart } from './styles';

export function BarGraphVertical({
  firstMensalValue,
  secondMensalValue,
  title,
  firstName,
  secondName,
  selectedDate,
  Graph,
  firstBg,
  secondBg,
}) {
  return (
    <GraphItem>
      <GraphInfo>
        <TopPart>
          <h3>
            {title}: {firstName} vs. {secondName}
          </h3>

          <GraphBarVerticalInfo>
            <div>
              <div
                style={{
                  backgroundColor: `${firstBg}`,
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
                  backgroundColor: `${secondBg}`,
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
        {Graph && <Graph selectedDate={selectedDate} />}
      </GraphShowContainer>
    </GraphItem>
  );
}

BarGraphVertical.propTypes = {
  firstMensalValue: PropTypes.number,
  secondMensalValue: PropTypes.number,
  title: PropTypes.string,
  firstName: PropTypes.string,
  secondName: PropTypes.string,
  selectedDate: PropTypes.string,
  Graph: PropTypes.elementType, // Um componente React
  firstBg: PropTypes.string,
  secondBg: PropTypes.string,
};
