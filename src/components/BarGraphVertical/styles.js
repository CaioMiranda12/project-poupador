import styled from 'styled-components';

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

export const TopPart = styled.div`
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

export const GraphBarVerticalInfo = styled.div`
  div {
    display: flex;
    align-items: center;
    width: 100%;

    gap: 20px;
  }
`;
