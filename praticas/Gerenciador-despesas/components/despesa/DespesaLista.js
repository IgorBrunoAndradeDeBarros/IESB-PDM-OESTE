import { FlatList, StyleSheet, Text } from 'react-native';
import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas, onPressItem }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DespesaItem {...item} onPress={() => onPressItem && onPressItem(item)} />
      )}
      ListEmptyComponent={<Text style={styles.vazio}>Nenhuma despesa encontrada.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  vazio: { textAlign: 'center', marginTop: 32, color: '#666' },
});
