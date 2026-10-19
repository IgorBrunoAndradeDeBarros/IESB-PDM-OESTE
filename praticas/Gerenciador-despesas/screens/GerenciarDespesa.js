import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CATEGORIAS } from '../data/despesas';
import getDataFormatada from '../util/data';

export default function GerenciarDespesa({ despesaEditando, onSalvar, onExcluir, onCancelar }) {
  const editando = !!despesaEditando;

  const [descricao, setDescricao] = useState(despesaEditando?.descricao ?? '');
  const [valor, setValor] = useState(despesaEditando ? String(despesaEditando.valor) : '');
  const [data, setData] = useState(despesaEditando?.data ?? new Date());
  const [categoria, setCategoria] = useState(despesaEditando?.categoria ?? '');
  const [mostrarData, setMostrarData] = useState(false);

  function tratarValor(texto) {
    const texto2 = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(texto2)) {
      setValor(texto2);
    }
  }

  function aoMudarData(evento, dataSelecionada) {
    setMostrarData(false);
    if (evento.type === 'set' && dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function confirmar() {
    const valorNumerico = parseFloat(valor);
    if (!descricao.trim() || !valor || isNaN(valorNumerico) || valorNumerico <= 0 || !categoria) {
      Alert.alert('Dados inválidos', 'Preencha descrição, valor e categoria.');
      return;
    }
    onSalvar({
      id: despesaEditando?.id ?? String(Date.now()),
      descricao: descricao.trim(),
      valor: valorNumerico,
      data,
      categoria,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{editando ? 'Editar despesa' : 'Nova despesa'}</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Supermercado"
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={tratarValor}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />

      <Text style={styles.label}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarData(true)}>
        <Text>{getDataFormatada(data)}</Text>
      </Pressable>
      {mostrarData && (
        <DateTimePicker value={data} mode="date" onChange={aoMudarData} />
      )}

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((cat) => {
          const ativa = categoria === cat;
          return (
            <Pressable
              key={cat}
              onPress={() => setCategoria(cat)}
              style={[styles.chip, ativa && styles.chipAtivo]}
            >
              <Text style={[styles.chipTexto, ativa && styles.chipTextoAtivo]}>{cat}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.botoes}>
        <Pressable style={[styles.botao, styles.cancelar]} onPress={onCancelar}>
          <Text style={styles.botaoTexto}>Cancelar</Text>
        </Pressable>
        <Pressable style={[styles.botao, styles.confirmar]} onPress={confirmar}>
          <Text style={styles.botaoTexto}>{editando ? 'Atualizar' : 'Adicionar'}</Text>
        </Pressable>
      </View>

      {editando && (
        <Pressable style={styles.excluir} onPress={() => onExcluir(despesaEditando.id)}>
          <Text style={styles.excluirTexto}>Excluir despesa</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#3b2f8f', marginBottom: 12 },
  label: { marginTop: 12, marginBottom: 4, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
  },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#e5e5e5',
  },
  chipAtivo: { backgroundColor: '#3b2f8f' },
  chipTexto: { color: '#333' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
  botoes: { flexDirection: 'row', gap: 12, marginTop: 24 },
  botao: { flex: 1, padding: 12, borderRadius: 6, alignItems: 'center' },
  cancelar: { backgroundColor: '#999' },
  confirmar: { backgroundColor: '#3b2f8f' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  excluir: { marginTop: 24, alignItems: 'center' },
  excluirTexto: { color: 'red', fontWeight: 'bold' },
});
