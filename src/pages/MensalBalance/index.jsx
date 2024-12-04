import Carousel from 'react-elastic-carousel';
import { TbTargetArrow, TbChecklist } from 'react-icons/tb';
import { VscGraphLine } from 'react-icons/vsc';

import { Container, Item, RightContainer } from './styles';

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
      </RightContainer>
    </Container>
  );
}
