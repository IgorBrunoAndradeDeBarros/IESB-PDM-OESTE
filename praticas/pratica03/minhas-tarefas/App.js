import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { titulo } from './util.js';
import titulo_padrao from './util.js'

export default function App() {
  return (
    <View style={styles.container}>
       <Text style={{ fontFamily: 'Lato' }}>{titulo}</Text>
      <Text style={{margin: 20}}>{titulo_padrao}</Text>
      <Text style={styles.text}>{titulo_padrao}</Text>
      <StatusBar style="auto" />
      <Button title="clique aqui"/>
       </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 20,
    fontSize: 26,
  }
});
