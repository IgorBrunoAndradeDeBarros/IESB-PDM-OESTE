import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { GlobalStyles } from '../../constants/theme';

export default function DespesaSumario({ despesas, periodoNome }) {
  const theme = useColorScheme() === 'dark' ? GlobalStyles.colors.dark : GlobalStyles.colors.light;

  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + parseFloat(item.amount), 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <Text style={styles.period}>{periodoNome}</Text>
      <Text style={styles.sum}>R$ {somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  period: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  sum: { fontSize: 18, color: '#fff', fontWeight: 'bold' }
});