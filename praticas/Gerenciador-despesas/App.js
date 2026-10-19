import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TodasDespesas from './screens/TodasDespesas'
import DespesasRecentes from './screens/DespesasRecentes';
import GerenciarDespesa from './screens/GerenciarDespesa';
import { DESPESAS_INICIAIS } from './data/despesas';

export default function App() {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);
  const [tela, setTela] = useState('todas');
  const [editandoId, setEditandoId] = useState(null);

  const despesaEditando = despesas.find((d) => d.id === editandoId);

  function abrirGerenciar(id = null) {
    setEditandoId(id);
    setTela('gerenciar');
  }

  function salvar(despesa) {
    setDespesas((atual) =>
      atual.some((d) => d.id === despesa.id)
        ? atual.map((d) => (d.id === despesa.id ? despesa : d))
        : [despesa, ...atual]
    );
    setTela('todas');
  }

  function excluir(id) {
    setDespesas((atual) => atual.filter((d) => d.id !== id));
    setTela('todas');
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Pressable onPress={() => setTela('recentes')}>
            <Text style={[styles.aba, tela === 'recentes' && styles.abaAtiva]}>Recentes</Text>
          </Pressable>
          <Pressable onPress={() => setTela('todas')}>
            <Text style={[styles.aba, tela === 'todas' && styles.abaAtiva]}>Todas</Text>
          </Pressable>
          <Pressable onPress={() => abrirGerenciar()}>
            <Text style={styles.aba}>＋ Nova</Text>
          </Pressable>
        </View>

        {tela === 'todas' && <TodasDespesas despesas={despesas} onSelecionar={abrirGerenciar} />}
        {tela === 'recentes' && <DespesasRecentes despesas={despesas} onSelecionar={abrirGerenciar} />}
        {tela === 'gerenciar' && (
          <GerenciarDespesa
            key={editandoId ?? 'nova'}
            despesaEditando={despesaEditando}
            onSalvar={salvar}
            onExcluir={excluir}
            onCancelar={() => setTela('todas')}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-around', padding: 14, backgroundColor: '#3e04c3' },
  aba: { color: '#d9c8fb', fontSize: 16 },
  abaAtiva: { color: '#fff', fontWeight: 'bold', textDecorationLine: 'underline' },
});