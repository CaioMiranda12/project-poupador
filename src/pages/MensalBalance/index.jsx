import { useRef, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { FaWindowClose } from 'react-icons/fa';
import { TbTargetArrow, TbChecklist } from 'react-icons/tb';
import { VscGraphLine } from 'react-icons/vsc';

import Logo from '../../assets/Versões_Eu Poupador_57.svg';
import {
  SaldoRightArea,
  SaldoLeftArea,
  DespesasLeftArea,
  DespesasRightArea,
  ReceitasLeftArea,
  ReceitasRightArea,
  BarGraphVertical,
} from '../../components';
import despesasGastoPrevisto from '../../services/DespesasGastoPrevisto.json';
import receitasRecebidoPrevisto from '../../services/ReceitasRecebidoPrevisto.json';
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
  PopUpContainer,
  PopUp,
  TopPopUp,
  BottomPopUp,
} from './styles';

const { productSales } = saldoReceitasDespesas;
const { receitas } = receitasRecebidoPrevisto;
const { despesas } = despesasGastoPrevisto;

export function MensalBalance() {
  const carouselRef = useRef(null);

  // Estado de mostrar Alterar Visualização (Pop-Up)
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Estados de mostrar valores no SaldoLeftArea
  const [showReceitas, setShowReceitas] = useState(true);
  const [showDespesas, setShowDespesas] = useState(true);
  const [showSaldo, setShowSaldo] = useState(true);

  // Estados para pegar a data do carrousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(productSales[0].name);

  // Primeiro Gráfico: ========================================================

  // Estados para valores da saldoReceitaMensal e da saldoDespesaMensal do primeiro gráfico
  const [saldoReceitaMensal, setSaldoReceitaMensal] = useState(
    productSales[0].Receitas,
  );
  const [saldoDespesaMensal, setSaldoDespesaMensal] = useState(
    productSales[0].Despesas,
  );

  // Estados para valores de saldoAcumuladoMensal e saldoPrevistoMensal
  const [saldoAcumuladoMensal, setSaldoAcumuladoMensal] = useState(
    productSales[0].Receitas - productSales[0].Despesas,
  );
  const [saldoPrevistoMensal, setSaldoPrevistoMensal] = useState(
    productSales[0].previsto,
  );

  // Segundo Gráfico: ========================================================

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

  // Terceiro Gráfico: ========================================================

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

  // ===========================================================================
  // Funções de alterar visualização (Pop-up)
  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };
  const handleReceitasChange = () => setShowReceitas((prev) => !prev);
  const handleDespesasChange = () => setShowDespesas((prev) => !prev);
  const handleSaldoChange = () => setShowSaldo((prev) => !prev);

  // Funções do carrousel
  const DateProductSales = productSales.map((item) => item.name);

  const handleMonthChange = (newDate) => {
    const saldoSelectData = productSales.find((item) => item.name === newDate);
    const receitasSelectData = receitas.find((item) => item.mes === newDate);

    // Info de Saldo
    if (saldoSelectData) {
      setSelectedDate(newDate);

      setSaldoReceitaMensal(saldoSelectData.Receitas);
      setSaldoDespesaMensal(saldoSelectData.Despesas);
      setSaldoAcumuladoMensal(
        saldoSelectData.Receitas - saldoSelectData.Despesas,
      );
      setSaldoPrevistoMensal(saldoSelectData.previsto);
    }

    // Info de Receitas
    if (receitasSelectData) {
      setSelectedDate(newDate);
    }
  };
  const handlePreviousMonth = (currentItem) => {
    if (currentIndex > 0) {
      // const newIndex = currentIndex - 1; versao antiga (pior)
      const newIndex = currentItem.index;
      setCurrentIndex(newIndex);
      const newDate = DateProductSales[newIndex];
      handleMonthChange(newDate);
    }
  };
  const handleNextMonth = (currentItem) => {
    const newIndex = currentItem.index;
    setCurrentIndex(newIndex);
    const newDate = DateProductSales[newIndex];
    handleMonthChange(newDate);
  };

  // Filtrar os dados do gráfico para os últimos 12 meses (incluindo o mês atual)
  const filteredProductSales = productSales.slice(
    Math.max(currentIndex - 11, 0), // Índice inicial (até 11 meses anteriores ou início)
    currentIndex + 1, // Índice final (mês atual incluído)
  );

  // Apagar daqui pra baixo depois
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
          onPrevEnd={handlePreviousMonth}
          onNextEnd={handleNextMonth}
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
                <button onClick={togglePopup}>Alterar Visualização</button>
              </LeftPart>

              <RightPart>
                <div>
                  <div
                    style={{
                      backgroundColor: '#20b7d9',
                      height: 6,
                      width: 200,
                    }}
                  />
                  <p>Receitas: {formatCurrency(saldoReceitaMensal)}</p>
                </div>
                <div>
                  <div
                    style={{ backgroundColor: 'red', height: 6, width: 200 }}
                  />
                  <p>Despesas: {formatCurrency(saldoDespesaMensal)}</p>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    style={{ backgroundColor: 'green', height: 6, width: 200 }}
                  />
                  <SaldoText>
                    <strong>Saldo</strong>:{' '}
                    {saldoReceitaMensal - saldoDespesaMensal >= 0 ? (
                      <span style={{ color: '#20b7d9' }}>
                        +
                        {formatCurrency(
                          saldoReceitaMensal - saldoDespesaMensal,
                        )}
                      </span>
                    ) : (
                      <span style={{ color: 'red' }}>
                        {formatCurrency(
                          saldoReceitaMensal - saldoDespesaMensal,
                        )}
                      </span>
                    )}
                  </SaldoText>
                </div>
              </RightPart>
            </GraphInfo>

            <GraphShowContainer>
              <SaldoLeftArea
                showReceitas={showReceitas}
                showDespesas={showDespesas}
                showSaldo={showSaldo}
                productSales={filteredProductSales} // Apenas os últimos 12 meses
              />
            </GraphShowContainer>
          </GraphItem>

          {isPopupVisible && (
            <PopUpContainer className="popup-overlay">
              <PopUp className="popup">
                <TopPopUp>
                  <h3>Configurar Visualização</h3>
                  <button onClick={togglePopup}>
                    <FaWindowClose size={30} color="red" />
                  </button>
                </TopPopUp>
                <BottomPopUp>
                  <label>
                    <input
                      type="checkbox"
                      checked={showReceitas}
                      onChange={handleReceitasChange}
                    />
                    Mostrar as receitas
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={showDespesas}
                      onChange={handleDespesasChange}
                    />
                    Mostrar as despesas
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={showSaldo}
                      onChange={handleSaldoChange}
                    />
                    Mostrar os saldos
                  </label>
                </BottomPopUp>
              </PopUp>
            </PopUpContainer>
          )}

          <BarGraphVertical
            selectedDate={selectedDate}
            title="Saldo"
            firstName="Acumulado"
            secondName="Previsto"
            firstMensalValue={saldoReceitaMensal - saldoDespesaMensal}
            secondMensalValue={saldoPrevistoMensal}
            Graph={SaldoRightArea}
            firstBg="#82ca9d"
            secondBg="gray"
          />
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
                      height: 6,
                      width: 200,
                    }}
                  />
                  <p>Recebido: {formatCurrency(chartData[0].Recebido)}</p>
                </div>
                <div>
                  <div
                    style={{ backgroundColor: 'gray', height: 6, width: 200 }}
                  />
                  <p>Previsto: {formatCurrency(chartData[0].Previsto)}</p>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    style={{
                      backgroundColor: 'transparent',
                      height: 6,
                      width: 200,
                    }}
                  />
                  <SaldoText>
                    <strong>Diferença</strong>:{' '}
                    {chartData[0].Recebido - chartData[0].Previsto >= 0 ? (
                      <span style={{ color: '#20b7d9' }}>
                        +
                        {formatCurrency(
                          chartData[0].Recebido - chartData[0].Previsto,
                        )}
                      </span>
                    ) : (
                      <span style={{ color: 'red' }}>
                        {formatCurrency(
                          chartData[0].Recebido - chartData[0].Previsto,
                        )}
                      </span>
                    )}
                  </SaldoText>
                </div>
              </RightPart>
            </GraphInfo>

            <GraphShowContainer>
              <ReceitasLeftArea />
            </GraphShowContainer>
          </GraphItem>

          <BarGraphVertical
            selectedDate={selectedDate}
            title="Receitas"
            firstName="Recebido"
            secondName="Previsto"
            firstMensalValue={chartData[0].Recebido}
            secondMensalValue={chartData[0].Previsto}
            Graph={ReceitasRightArea}
            firstBg="#20b7d9"
            secondBg="gray"
          />

          <GraphItem>
            <GraphInfo>
              <LeftPart>
                <h3>Despesas: Gasto vs Previsto</h3>
              </LeftPart>

              <RightPart>
                <div>
                  <div
                    style={{
                      backgroundColor: 'red',
                      height: 6,
                      width: 200,
                    }}
                  />
                  <p>Gasto: {formatCurrency(chartDataDespesas[0].gasto)}</p>
                </div>
                <div>
                  <div
                    style={{ backgroundColor: 'gray', height: 6, width: 200 }}
                  />
                  <p>
                    Previsto: {formatCurrency(chartDataDespesas[0].previsto)}
                  </p>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    style={{
                      backgroundColor: 'transparent',
                      height: 6,
                      width: 200,
                    }}
                  />
                  <SaldoText>
                    <strong>Diferença</strong>:{' '}
                    {chartDataDespesas[0].gasto -
                      chartDataDespesas[0].previsto <=
                    0 ? (
                      <span style={{ color: '#20b7d9' }}>
                        +
                        {formatCurrency(
                          chartDataDespesas[0].previsto -
                            chartDataDespesas[0].gasto,
                        )}
                      </span>
                    ) : (
                      <span style={{ color: 'red' }}>
                        {formatCurrency(
                          chartDataDespesas[0].previsto -
                            chartDataDespesas[0].gasto,
                        )}
                      </span>
                    )}
                  </SaldoText>
                </div>
              </RightPart>
            </GraphInfo>

            <GraphShowContainer>
              <DespesasLeftArea />
            </GraphShowContainer>
          </GraphItem>

          <BarGraphVertical
            selectedDate={selectedDate}
            title="Despesas"
            firstName="Gasto"
            secondName="Previsto"
            firstMensalValue={chartDataDespesas[0].gasto}
            secondMensalValue={chartDataDespesas[0].previsto}
            Graph={SaldoRightArea}
            firstBg="red"
            secondBg="gray"
          />
        </GraphsContainer>
      </RightContainer>
    </Container>
  );
}
