import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getDataFormatada } from '../../util/data';

export default function DespesaItem({ descricao, valor, data, categoria, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressionado}>
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{getDataFormatada(data)}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagTexto}>{categoria}</Text>
          </View>
        </View>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>R$ {Number(valor).toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressionado: { opacity: 0.7 },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#3b2f8f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 3,
  },
  info: { flex: 1, gap: 4 },
  descricao: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  data: { color: '#d6d2f5' },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5e5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 2,
  },
  tagTexto: { fontSize: 12, color: '#333', fontWeight: '600' },
  valorContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },
  valor: { fontWeight: 'bold', color: '#3b2f8f' },
});
