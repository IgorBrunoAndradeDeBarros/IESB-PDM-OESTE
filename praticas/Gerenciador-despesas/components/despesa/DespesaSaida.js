import { StyleSheet, View } from 'react-native';
import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

export default function DespesaSaida({ despesas, periodo, onPressItem }) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      <DespesaLista despesas={despesas} onPressItem={onPressItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
