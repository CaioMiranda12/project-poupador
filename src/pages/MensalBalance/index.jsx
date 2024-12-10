import { useRef, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { TbTargetArrow, TbChecklist } from 'react-icons/tb';
import { VscGraphLine } from 'react-icons/vsc';

import Logo from '../../assets/Versões_Eu Poupador_57.svg';
import { ReceitasLeftArea } from '../../components/ReceitasLeftArea';
import { ReceitasRightArea } from '../../components/ReceitasRightArea';
import { SaldoLeftArea } from '../../components/SaldoLeftArea';
import { SaldoRightArea } from '../../components/SaldoRightArea';
import receitasRecebidoPrevisto from '../../services/ReceitasRecebidoPrevisto.json';
import saldoAcumuladoPrevisto from '../../services/SaldoAcumuladoPrevisto.json';
import saldoReceitasDespesas from '../../services/SaldoReceitasDespesas.json';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import {
  Container,
  Item,
  RightContainer,
  GraphsContainer,
  GraphItem,
  RightPart,
  LeftPart,
  GraphInfo,
  SaldoText,
  GraphShowContainer,
} from './styles';

export function MensalBalance() {
  const { productSales } = saldoReceitasDespesas;

  const dataRight = saldoAcumuladoPrevisto.data;

  const { receitas } = receitasRecebidoPrevisto;

  const DateProductSales = productSales.map((item) => item.name);

  const [selectedDate, setSelectedDate] = useState(productSales[0].name);
  const [receitaMensal, setReceitaMensal] = useState(productSales[0].Receitas);
  const [despesaMensal, setDespesaMensal] = useState(productSales[0].Despesas);

  const findSelectedDate = productSales.find(
    (item) => item.name === selectedDate,
  );

  const carouselRef = useRef(null);

  function handleButtonNextDate() {
    setReceitaMensal(findSelectedDate.Receitas);
    setDespesaMensal(findSelectedDate.Despesas);

    console.log(findSelectedDate.Receitas);
  }

  const totalAcumulado = dataRight.reduce(
    (acc, item) => item.acumulado + acc,
    0,
  );

  const totalPrevisto = dataRight.reduce((acc, item) => acc + item.previsto, 0);

  const totalRecebido = receitas.reduce((acc, item) => item.Recebido + acc, 0);

  const totalPrevistoDeRecebido = receitas.reduce(
    (acc, item) => acc + item.Previsto,
    0,
  );

  return (
    <Container>
      <nav>
        <div>
          <a href="/">
            <TbChecklist color="#20b7d9" size={70} />
          </a>

          <a href="/">
            <TbTargetArrow color="#20b7d9" size={70} />
          </a>

          <a href="/">
            <VscGraphLine color="#20b7d9" size={70} />
          </a>
        </div>

        <img alt="logo eu-poupador" src={Logo} />
      </nav>

      <RightContainer>
        <h1>Balanço Mensal</h1>

        <Carousel
          itemsToShow={1}
          pagination={false}
          ref={carouselRef}
          onNextEnd={handleButtonNextDate}
        >
          {DateProductSales.map((item) => (
            <Item>{formatDate(item)}</Item>
          ))}
        </Carousel>

        <GraphsContainer>
          <GraphItem>
            <GraphInfo>
              <LeftPart>
                <h3>Saldo: Receitas vs Despesas</h3>
                <button>Alterar Visualização</button>
              </LeftPart>

              <RightPart>
                <div>
                  <div
                    style={{
                      backgroundColor: '#20b7d9',
                      height: 10,
                      width: 200,
                    }}
                  />
                  <p>Receitas: {formatCurrency(receitaMensal)}</p>
                </div>
                <div>
                  <div
                    style={{ backgroundColor: 'red', height: 10, width: 200 }}
                  />
                  <p>Despesas: {formatCurrency(despesaMensal)}</p>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    style={{ backgroundColor: 'green', height: 10, width: 200 }}
                  />
                  <SaldoText>
                    <span>Saldo</span>:{' '}
                    {formatCurrency(receitaMensal - despesaMensal)}
                  </SaldoText>
                </div>
              </RightPart>
            </GraphInfo>

            <GraphShowContainer>
              <SaldoLeftArea />
            </GraphShowContainer>
          </GraphItem>

          <GraphItem>
            <GraphInfo>
              <LeftPart>
                <h3>Saldo: Acumulado vs Previsto</h3>

                <p>Acumulado: {formatCurrency(totalAcumulado)}</p>
                <p>Previsto: {formatCurrency(totalPrevisto)}</p>
                <SaldoText>
                  <span>Diferença</span>:{' '}
                  {formatCurrency(totalAcumulado - totalPrevisto)}
                </SaldoText>
              </LeftPart>
            </GraphInfo>

            <GraphShowContainer>
              <SaldoRightArea />
            </GraphShowContainer>
          </GraphItem>
        </GraphsContainer>

        <GraphsContainer>
          <GraphItem>
            <GraphInfo>
              <LeftPart>
                <h3>Receitas: Recebido vs Previsto</h3>
              </LeftPart>

              <RightPart>
                <div>
                  <div
                    style={{
                      backgroundColor: '#20b7d9',
                      height: 20,
                      width: 200,
                    }}
                  />
                  <p>Recebido: {formatCurrency(totalRecebido)}</p>
                </div>
                <div>
                  <div
                    style={{ backgroundColor: 'gray', height: 20, width: 200 }}
                  />
                  <p>Previsto: {formatCurrency(totalPrevistoDeRecebido)}</p>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    style={{
                      backgroundColor: 'transparent',
                      height: 20,
                      width: 200,
                    }}
                  />
                  <SaldoText>
                    <span>Diferença</span>:{' '}
                    {formatCurrency(totalRecebido - totalPrevistoDeRecebido)}
                  </SaldoText>
                </div>
              </RightPart>
            </GraphInfo>

            <GraphShowContainer>
              <ReceitasLeftArea />
            </GraphShowContainer>
          </GraphItem>

          {/* falta alterar os valores */}
          <GraphItem>
            <GraphInfo>
              <LeftPart>
                <h3>Receitas: Recebido vs Previsto</h3>

                <p>Acumulado: {formatCurrency(totalAcumulado)}</p>
                <p>Previsto: {formatCurrency(totalPrevisto)}</p>
                <SaldoText>
                  <span>Diferença</span>:{' '}
                  {formatCurrency(totalAcumulado - totalPrevisto)}
                </SaldoText>
              </LeftPart>
            </GraphInfo>

            <GraphShowContainer>
              <ReceitasRightArea />
            </GraphShowContainer>
          </GraphItem>
        </GraphsContainer>
      </RightContainer>
    </Container>
  );
}
