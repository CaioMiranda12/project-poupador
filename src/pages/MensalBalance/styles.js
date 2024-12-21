import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #20b7d9;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;

  display: flex;
  gap: 2%;

  nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    border-radius: 0 20px 20px 0;
    background-color: #fff;
    width: 10%;
    padding: 10px 0;
    min-height: calc(100vh - 20px);

    div {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
`;

export const RightContainer = styled.div`
  width: 88%;

  h1 {
    color: #20b7d9;
    font-size: 40px;
    background-color: #fff;
    padding: 20px;
    border-radius: 30px;
    text-align: center;
    margin-bottom: 50px;
  }

  .bXaxBg {
    width: 45%;

    @media (max-width: 720px) {
      width: 85%;
    }
  }

  .dPOFGc {
    background-color: #fff;

    &:hover {
      color: #fff;
      background-color: #000;
    }

    &:focus {
      color: #fff;
      background-color: #000;
    }
  }

  .dtpISB {
    background-color: #fff;

    &:hover {
      color: #fff;
      background-color: #000;
    }

    &:focus {
      color: #fff;
      background-color: #000;
    }
  }
`;

export const Item = styled.div`
  background-color: #fff;
  color: #20b7d9;
  font-size: 30px;
  padding: 20px;
  border-radius: 30px;
  width: 80%;
  text-align: center;
`;

export const GraphsContainer = styled.div`
  margin-top: 20px;

  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
`;

export const GraphItem = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 30px;
`;

export const GraphInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20%;

  margin-bottom: 20px;
`;

export const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    color: #20b7d9;
    font-weight: bold;
    font-size: 30px;
  }

  button {
    background-color: #20b7d9;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    width: max-content;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }

  p {
    font-size: 20px;
  }
`;

export const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-size: 20px;
    color: #000;
    margin-left: 20px;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

export const SaldoText = styled.p``;

export const GraphShowContainer = styled.div`
  height: 80%;
  width: 100%;
  padding: 20px 0;
`;

export const PopUpContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const PopUp = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 500px;
  text-align: left;

  input {
    width: 25px;
    height: 25px;
  }

  label {
    font-size: 24px;
    display: flex;
    gap: 10px;
  }
`;

export const TopPopUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 40px;

  h3 {
    font-size: 30px;
    font-weight: bold;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }
`;

export const BottomPopUp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GraphBarVerticalInfo = styled.div`
  div {
    display: flex;
    align-items: center;
    width: 100%;

    gap: 20px;
  }
`;

export const PieChartGraphsContainer = styled.div`
  margin: 20px 0 20px 0;

  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  gap: 20px;

  h3 {
    color: #20b7d9;
    font-size: 26px;
    font-weight: bold;
    margin: 0 20px 20px 20px;
  }

  div {
    background-color: #fff;
  }
`;

export const TopInfoPieChart = styled.div`
  height: auto;
  min-height: 500px;
  width: 100%;

  display: flex;
  justify-content: center;

  .recharts-surface {
    overflow: visible;
  }
`;

export const BottomInfoPieChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 20px;

  div {
    display: flex;
    justify-content: space-between;

    p {
      color: #000;
      font-size: 18px;
    }
  }
`;
