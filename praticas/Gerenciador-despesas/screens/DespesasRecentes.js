import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategorias, { TODAS } from '../components/despesa/FiltroCategorias';
import getDataMenosDias from '../util/data';
import { filtrarPorCategoria } from './TodasDespesas';

export default function DespesasRecentes({ despesas, onEditar }) {
  const [categoria, setCategoria] = useState(TODAS);

  const limite = getDataMenosDias(new Date(), 7);
  const recentes = despesas.filter((d) => d.data >= limite);
  const despesasFiltradas = filtrarPorCategoria(recentes, categoria);

  return (
    <View style={styles.container}>
      <FiltroCategorias selecionada={categoria} onSelecionar={setCategoria} />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo="Últimos 7 dias"
        onPressItem={onEditar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
