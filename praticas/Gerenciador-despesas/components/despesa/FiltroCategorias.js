import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { CATEGORIAS } from '../../data/despesas';

const TODAS = 'Todas';

export default function FiltroCategorias({ selecionada, onSelecionar }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {[TODAS, ...CATEGORIAS].map((cat) => {
        const ativa = selecionada === cat;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelecionar(cat)}
            style={[styles.chip, ativa && styles.chipAtivo]}
          >
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>{cat}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export { TODAS };

const styles = StyleSheet.create({
  scroll: { flexGrow: 0, marginVertical: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e5e5e5',
    marginRight: 8,
  },
  chipAtivo: { backgroundColor: '#3b2f8f' },
  texto: { color: '#333' },
  textoAtivo: { color: '#fff', fontWeight: 'bold' },
});
