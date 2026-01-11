/**
 * Formata um valor numérico como moeda brasileira
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata um número como porcentagem
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(0)}%`;
}

/**
 * Formata um número como cash/moeda do jogo
 */
export function formatCash(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}
