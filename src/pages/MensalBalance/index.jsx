import Carousel from 'react-elastic-carousel';
import { TbTargetArrow, TbChecklist } from 'react-icons/tb';
import { VscGraphLine } from 'react-icons/vsc';

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
} from './styles';

export function MensalBalance() {
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

        <h2>EU POUPADOR</h2>
      </nav>

      <RightContainer>
        <h1>Balanço Mensal</h1>

        <Carousel itemsToShow={1} pagination={false}>
          <Item>Novembro de 2024</Item>
          <Item>Dezembro de 2024</Item>
          <Item>Janeiro de 2025</Item>
          <Item>Fevereiro de 2025</Item>
          <Item>Março de 2025</Item>
          <Item>Abril de 2025</Item>
        </Carousel>

        <GraphsContainer>
          <GraphItem>
            <GraphInfo>
              <LeftPart>
                <h3>Saldo: Receitas vs Despesas</h3>
                <button>Alterar Visualização</button>
              </LeftPart>

              <RightPart>
                <p>Receitas: R$ 4.500,00</p>
                <p>Despesas: R$ 3.200,00</p>
                <SaldoText>
                  <span>Saldo</span>: +R$ 1.300,00
                </SaldoText>
              </RightPart>
            </GraphInfo>

            {/* DIV DO GRAFICO */}
            <div>
              <h2>Ola</h2>
            </div>
          </GraphItem>

          <GraphItem />
        </GraphsContainer>
      </RightContainer>
    </Container>
  );
}
