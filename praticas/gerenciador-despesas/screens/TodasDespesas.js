import { useState, useMemo } from 'react';
import { View, TextInput, StyleSheet, useColorScheme } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useDebounce } from '../hooks/useDebounce';
import { GlobalStyles } from '../constants/theme';

export default function TodasDespesas() {
  const { expenses } = useExpenses();
  const [busca, setBusca] = useState('');
  const buscaDebounced = useDebounce(busca, 500);
  const theme = useColorScheme() === 'dark' ? GlobalStyles.colors.dark : GlobalStyles.colors.light;

  const despesasFiltradas = useMemo(() => {
    if (!buscaDebounced) return expenses;
    return expenses.filter(exp =>
      exp.description.toLowerCase().includes(buscaDebounced.toLowerCase())
    );
  }, [expenses, buscaDebounced]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
        placeholder="Buscar despesa..."
        placeholderTextColor={theme.placeholder}
        value={busca}
        onChangeText={setBusca}
      />
      <DespesaSaida despesas={despesasFiltradas} periodoNome="Total" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: { margin: 16, padding: 12, borderRadius: 8, borderWidth: 1 }
});