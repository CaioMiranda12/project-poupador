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
  margin-top: 40px;

  display: grid;
  grid-template-columns: 65% 33%;
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

export const SaldoText = styled.p`
  color: #20b7d9;

  span {
    font-weight: bold;
    color: #000;
  }
`;

export const GraphShowContainer = styled.div`
  height: 80%;
  width: 100%;
  padding: 20px 0;
`;
