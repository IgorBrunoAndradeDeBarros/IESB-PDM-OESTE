import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import {rotulo_btn_cadastro_meta, rotulo_input_meta,rotulo_lista_metas} from './mensagens';
import { useState } from 'react';

export default function App() {
  const [inputMetaText, setInputMetaText] = useState('');
  const [metas, setMetas] = useState([]);

  function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  }

  function adicionarMetaHandler() {
    setMetas([...metas, inputMetaText]);
  }

  return (
    <View style={styles.mainContainer}>

      <View style={styles.formContainer}>
        <View style={{ width: '65%' }}>
          <TextInput
            style={styles.inputText}
            placeholder={rotulo_input_meta}
            onChangeText={metaInputHandler}
          />
        </View>

        <View style={{ width: '30%' }}>
          <Button
            title={rotulo_btn_cadastro_meta}
            onPress={adicionarMetaHandler}
          />
        </View>
      </View>

      <ScrollView style={styles.metaContainer}>
        {metas.map((meta, index) => (
          <Text key={index} style={styles.item}>
            {meta}
          </Text>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
  },

  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputText: {
    borderColor: '#cccccc',
    borderWidth: 1,
  },

  metaContainer: {
    flex: 1,
  },

  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'lightblue',
  },
});