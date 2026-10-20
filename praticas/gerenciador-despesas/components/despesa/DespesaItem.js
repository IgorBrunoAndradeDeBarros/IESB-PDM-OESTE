import { Pressable, View, Text, StyleSheet, Platform, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../constants/theme';

export default function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const theme = useColorScheme() === 'dark' ? GlobalStyles.colors.dark : GlobalStyles.colors.light;

  function gerenciarDespesaHandler() {
    navigation.navigate('GerenciarDespesa', { expenseId: id });
  }

  const dataFormatada = new Date(date).toLocaleDateString('pt-BR');

  return (
    <Pressable onPress={gerenciarDespesaHandler} style={({pressed}) => pressed && styles.pressed}>
      <View style={[styles.item, { backgroundColor: theme.card }, Platform.select({
        ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
        android: { elevation: 3 }
      })]}>
        <View>
          <Text style={[styles.description, { color: theme.text }]}>{description}</Text>
          <Text style={{ color: theme.placeholder }}>{dataFormatada}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>R$ {amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.7 },
  item: { padding: 12, marginVertical: 8, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between' },
  description: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  amountContainer: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#3f51b5', padding: 10, borderRadius: 8 },
  amount: { color: 'white', fontWeight: 'bold' },
  categoryBadge: { marginTop: 4, backgroundColor: '#e0e0e0', alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  categoryText: { fontSize: 12, color: '#333' }
});