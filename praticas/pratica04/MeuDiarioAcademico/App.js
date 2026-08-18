import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {APP_TITLE,INPUT_PLACEHOLDER,BUTTON_TEXT,LIST_TITLE,} from './labels';

const disciplinas = [
  'Estrutura de Dados',
  'Banco de Dados',
  'Engenharia de Software',
  'Redes de Computadores',
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{APP_TITLE}</Text>
      </View>

      {}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={INPUT_PLACEHOLDER}
        />
        <View style={styles.buttonWrapper}>
          <Button title={BUTTON_TEXT} onPress={() => {}} />
        </View>
      </View>

      {}
      <Text style={styles.listTitle}>{LIST_TITLE}</Text>
      <View style={styles.list}>
        {disciplinas.map((disciplina, index) => (
          <View key={index} style={styles.item}>
            <Text>{disciplina}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 8,
  },
  buttonWrapper: {
    width: '28%',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  list: {
    flex: 1,
  },
  item: {
    margin: 4,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
});