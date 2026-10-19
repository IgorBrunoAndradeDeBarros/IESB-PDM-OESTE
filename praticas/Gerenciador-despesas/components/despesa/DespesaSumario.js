import { StyleSheet, Text, View } from 'react-native';

const LIMITE = 200;

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce(
    (acumulador, item) => acumulador + Number(item.valor),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, somaDespesas > LIMITE && styles.somaAlta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#e8e6fa',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodo: { fontSize: 12, color: '#3b2f8f' },
  soma: { fontSize: 16, fontWeight: 'bold', color: '#3b2f8f' },
  somaAlta: { color: 'red' }, // Bônus: acima de R$ 200,00
});
