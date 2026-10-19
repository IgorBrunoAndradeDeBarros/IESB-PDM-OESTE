export function getDataFormatada(data) {
  return data.toLocaleDateString('pt-BR');
}

export function getDataMenosDias(data, dias) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() - dias);
}