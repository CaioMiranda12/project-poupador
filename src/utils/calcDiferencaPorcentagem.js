export function calcDiferencaPorcentagem(acumulado, previsto) {
  if (previsto === 0) {
    return 'Não é possível calcular (previsto igual a zero)';
  }
  const diferenca = acumulado - previsto;
  const porcentagem = (diferenca / previsto) * 100;
  return `${porcentagem.toFixed(2)}%`;
}
