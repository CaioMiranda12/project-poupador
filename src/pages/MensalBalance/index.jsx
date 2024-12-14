import { useRef, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { FaWindowClose } from 'react-icons/fa';
import { TbTargetArrow, TbChecklist } from 'react-icons/tb';
import { VscGraphLine } from 'react-icons/vsc';

import Logo from '../../assets/Versões_Eu Poupador_57.svg';
import { DespesasRightArea } from '../../components/DespesasRightArea';
import { ReceitasLeftArea } from '../../components/ReceitasLeftArea';
import { ReceitasRightArea } from '../../components/ReceitasRightArea';
import { SaldoLeftArea } from '../../components/SaldoLeftArea';
import { SaldoRightArea } from '../../components/SaldoRightArea';
import receitasRecebidoPrevisto from '../../services/ReceitasRecebidoPrevisto.json';
import saldoAcumuladoPrevisto from '../../services/SaldoAcumuladoPrevisto.json';
import saldoReceitasDespesas from '../../services/SaldoReceitasDespesas.json';
import { calcDiferencaPorcentagem } from '../../utils/calcDiferencaPorcentagem';
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
  GraphBarVerticalInfo,
} from './styles';

export function MensalBalance() {
  const { productSales } = saldoReceitasDespesas;

  const dataRight = saldoAcumuladoPrevisto.data;

  const { receitas } = receitasRecebidoPrevisto;

  const DateProductSales = productSales.map((item) => item.name);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [showReceitas, setShowReceitas] = useState(true);
  const [showDespesas, setShowDespesas] = useState(true);
  const [showSaldo, setShowSaldo] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dataRight[0].name);

  const [receitaMensal, setReceitaMensal] = useState(productSales[0].Receitas);
  const [despesaMensal, setDespesaMensal] = useState(productSales[0].Despesas);

  const [acumuladoMensal, setAcumuladoMensal] = useState(
    dataRight[0].acumulado,
  );
  const [previstoMensal, setPrevistoMensal] = useState(dataRight[0].previsto);

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  const handleReceitasChange = () => setShowReceitas((prev) => !prev);
  const handleDespesasChange = () => setShowDespesas((prev) => !prev);
  const handleSaldoChange = () => setShowSaldo((prev) => !prev);

  const carouselRef = useRef(null);

  const handleMonthChange = (newDate) => {
    const selectedData = productSales.find((item) => item.name === newDate);
    const selectedDataSaldoAcumuladoPrevisto = dataRight.find(
      (item) => item.name === newDate,
    );

    if (selectedData) {
      setReceitaMensal(selectedData.Receitas);
      setDespesaMensal(selectedData.Despesas);
      setSelectedDate(newDate);
      setAcumuladoMensal(selectedDataSaldoAcumuladoPrevisto.acumulado);
      setPrevistoMensal(selectedDataSaldoAcumuladoPrevisto.previsto);
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
                  <p>Receitas: {formatCurrency(receitaMensal)}</p>
                </div>
                <div>
                  <div
                    style={{ backgroundColor: 'red', height: 6, width: 200 }}
                  />
                  <p>Despesas: {formatCurrency(despesaMensal)}</p>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    style={{ backgroundColor: 'green', height: 6, width: 200 }}
                  />
                  <SaldoText>
                    <strong>Saldo</strong>:{' '}
                    {receitaMensal - despesaMensal >= 0 ? (
                      <span style={{ color: '#20b7d9' }}>
                        +{formatCurrency(receitaMensal - despesaMensal)}
                      </span>
                    ) : (
                      <span style={{ color: 'red' }}>
                        {formatCurrency(receitaMensal - despesaMensal)}
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

          <GraphItem>
            <GraphInfo>
              <LeftPart>
                <h3>Saldo: Acumulado vs Previsto</h3>

                <GraphBarVerticalInfo>
                  <div>
                    <div
                      style={{
                        backgroundColor: '#82ca9d',
                        height: 6,
                        width: 200,
                      }}
                    />
                    <p>Acumulado: {formatCurrency(acumuladoMensal)}</p>
                  </div>
                  <div>
                    <div
                      style={{
                        backgroundColor: 'gray',
                        height: 6,
                        width: 200,
                      }}
                    />
                    <p>Previsto: {formatCurrency(previstoMensal)}</p>
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

                      {acumuladoMensal - previstoMensal >= 0 ? (
                        <span style={{ color: '#20b7d9' }}>
                          +{formatCurrency(acumuladoMensal - previstoMensal)}{' '}
                          <br /> (
                          {calcDiferencaPorcentagem(
                            acumuladoMensal,
                            previstoMensal,
                          )}
                          )
                        </span>
                      ) : (
                        <span style={{ color: 'red' }}>
                          {formatCurrency(acumuladoMensal - previstoMensal)}{' '}
                          <br /> (
                          {calcDiferencaPorcentagem(
                            acumuladoMensal,
                            previstoMensal,
                          )}
                          )
                        </span>
                      )}
                    </p>
                  </div>
                </GraphBarVerticalInfo>
              </LeftPart>
            </GraphInfo>

            <GraphShowContainer>
              <SaldoRightArea selectedDate={selectedDate} />
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
                    <strong>Diferença</strong>:{' '}
                    {totalRecebido - totalPrevistoDeRecebido >= 0 ? (
                      <span style={{ color: '#20b7d9' }}>
                        +
                        {formatCurrency(
                          totalRecebido - totalPrevistoDeRecebido,
                        )}
                      </span>
                    ) : (
                      <span style={{ color: 'red' }}>
                        {formatCurrency(
                          totalRecebido - totalPrevistoDeRecebido,
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

          {/* falta alterar os valores */}
          <GraphItem>
            <GraphInfo>
              <LeftPart>
                <h3>Receitas: Recebido vs Previsto</h3>

                <GraphBarVerticalInfo>
                  <div>
                    <div
                      style={{
                        backgroundColor: '#20b7d9',
                        height: 10,
                        width: 200,
                      }}
                    />
                    <p>Recebido: {formatCurrency(acumuladoMensal)}</p>
                  </div>
                  <div>
                    <div
                      style={{
                        backgroundColor: 'gray',
                        height: 10,
                        width: 200,
                      }}
                    />
                    <p>Previsto: {formatCurrency(previstoMensal)}</p>
                  </div>
                  <div>
                    <div
                      style={{
                        backgroundColor: 'transparent',
                        height: 10,
                        width: 200,
                      }}
                    />
                    <p>
                      <strong>Diferença: </strong>

                      {acumuladoMensal - previstoMensal >= 0 ? (
                        <span style={{ color: '#20b7d9' }}>
                          +{formatCurrency(acumuladoMensal - previstoMensal)}{' '}
                          <br /> (
                          {calcDiferencaPorcentagem(
                            acumuladoMensal,
                            previstoMensal,
                          )}
                          )
                        </span>
                      ) : (
                        <span style={{ color: 'red' }}>
                          {formatCurrency(acumuladoMensal - previstoMensal)}{' '}
                          <br /> (
                          {calcDiferencaPorcentagem(
                            acumuladoMensal,
                            previstoMensal,
                          )}
                          )
                        </span>
                      )}
                    </p>
                  </div>
                </GraphBarVerticalInfo>
              </LeftPart>
            </GraphInfo>

            <GraphShowContainer>
              <ReceitasRightArea selectedDate={selectedDate} />
            </GraphShowContainer>
          </GraphItem>

          <GraphItem />

          <GraphItem>
            <GraphInfo>
              <LeftPart>
                <h3>Despesas: Gasto vs Previsto</h3>

                <GraphBarVerticalInfo>
                  <div>
                    <div
                      style={{
                        backgroundColor: 'red',
                        height: 10,
                        width: 200,
                      }}
                    />
                    <p>Recebido: {formatCurrency(acumuladoMensal)}</p>
                  </div>
                  <div>
                    <div
                      style={{
                        backgroundColor: 'gray',
                        height: 10,
                        width: 200,
                      }}
                    />
                    <p>Previsto: {formatCurrency(previstoMensal)}</p>
                  </div>
                  <div>
                    <div
                      style={{
                        backgroundColor: 'transparent',
                        height: 10,
                        width: 200,
                      }}
                    />
                    <p>
                      <strong>Diferença: </strong>

                      {acumuladoMensal - previstoMensal >= 0 ? (
                        <span style={{ color: '#20b7d9' }}>
                          +{formatCurrency(acumuladoMensal - previstoMensal)}{' '}
                          <br /> (
                          {calcDiferencaPorcentagem(
                            acumuladoMensal,
                            previstoMensal,
                          )}
                          )
                        </span>
                      ) : (
                        <span style={{ color: 'red' }}>
                          {formatCurrency(acumuladoMensal - previstoMensal)}{' '}
                          <br /> (
                          {calcDiferencaPorcentagem(
                            acumuladoMensal,
                            previstoMensal,
                          )}
                          )
                        </span>
                      )}
                    </p>
                  </div>
                </GraphBarVerticalInfo>
              </LeftPart>
            </GraphInfo>

            <GraphShowContainer>
              <DespesasRightArea selectedDate={selectedDate} />
            </GraphShowContainer>
          </GraphItem>
        </GraphsContainer>
      </RightContainer>
    </Container>
  );
}
