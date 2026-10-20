import { useExpenses } from '../store/expenses-context';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();

  const despesasRecentes = expenses.filter((expense) => {
    const hoje = new Date();
    const dataDespesa = new Date(expense.date);
    const diferencaDias = (hoje - dataDespesa) / (1000 * 60 * 60 * 24);
    return diferencaDias <= 7 && diferencaDias >= 0;
  });

  return <DespesaSaida despesas={despesasRecentes} periodoNome="Últimos 7 Dias" />;
}