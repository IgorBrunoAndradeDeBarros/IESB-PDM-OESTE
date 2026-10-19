import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategorias, { TODAS } from '../components/despesa/FiltroCategorias';

export function filtrarPorCategoria(despesas, categoria) {
  if (categoria === TODAS) return despesas;
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

export default function TodasDespesas({ despesas, onEditar }) {
  const [categoria, setCategoria] = useState(TODAS);
  const despesasFiltradas = filtrarPorCategoria(despesas, categoria);

  return (
    <View style={styles.container}>
      <FiltroCategorias selecionada={categoria} onSelecionar={setCategoria} />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={categoria === TODAS ? 'Total' : `Total - ${categoria}`}
        onPressItem={onEditar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
