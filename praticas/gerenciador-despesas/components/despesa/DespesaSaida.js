import { View, StyleSheet, useColorScheme } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';
import { GlobalStyles } from '../../constants/theme';

export default function DespesaSaida({ despesas, periodoNome }) {
  const theme = useColorScheme() === 'dark' ? GlobalStyles.colors.dark : GlobalStyles.colors.light;
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <DespesaSumario despesas={despesas} periodoNome={periodoNome} />
      <DespesaLista despesas={despesas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 0 }
});