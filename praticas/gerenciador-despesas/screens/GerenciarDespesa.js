import { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable, Platform, KeyboardAvoidingView, ScrollView, Modal, Button, useColorScheme } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useExpenses } from '../store/expenses-context';
import { GlobalStyles, CATEGORIES } from '../constants/theme';

export default function GerenciarDespesa() {
  const navigation = useNavigation();
  const route = useRoute();
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const theme = useColorScheme() === 'dark' ? GlobalStyles.colors.dark : GlobalStyles.colors.light;

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const despesaAtual = isEditing ? expenses.find(e => e.id === expenseId) : null;

  const [form, setForm] = useState({
    description: despesaAtual?.description || '',
    amount: despesaAtual?.amount?.toString() || '',
    date: despesaAtual ? new Date(despesaAtual.date) : new Date(),
    category: despesaAtual?.category || ''
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa'
    });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: null }));
  }

  function validate(values) {
    let newErrors = {};
    if (!values.description || values.description.trim().length < 3) {
      newErrors.description = 'A descrição deve ter no mínimo 3 caracteres.';
    }
    const amountVal = parseFloat(values.amount);
    if (isNaN(amountVal) || amountVal <= 0) {
      newErrors.amount = 'O valor deve ser maior que zero.';
    }
    if (values.date > new Date()) {
      newErrors.date = 'A data não pode ser futura.';
    }
    if (!values.category) {
      newErrors.category = 'A categoria é obrigatória.';
    }
    return newErrors;
  }

  function handleSave() {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const expenseData = {
      description: form.description,
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category
    };

    if (isEditing) {
      updateExpense(expenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Atenção', 'Deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        }
      }
    ]);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: theme.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Descrição */}
        <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: errors.description ? theme.error : theme.border }]}
          value={form.description}
          onChangeText={(val) => handleChange('description', val)}
        />
        {errors.description && <Text style={[styles.errorText, { color: theme.error }]}>{errors.description}</Text>}

        {/* Valor */}
        <Text style={[styles.label, { color: theme.text }]}>Valor</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: errors.amount ? theme.error : theme.border }]}
          value={form.amount}
          onChangeText={(val) => {
            if (/^\d*\.?\d{0,2}$/.test(val)) handleChange('amount', val);
          }}
          keyboardType="decimal-pad"
        />
        {errors.amount && <Text style={[styles.errorText, { color: theme.error }]}>{errors.amount}</Text>}

        {/* Data */}
        <Text style={[styles.label, { color: theme.text }]}>Data</Text>
        <Pressable onPress={() => setShowDatePicker(true)} style={[styles.input, { backgroundColor: theme.card, borderColor: errors.date ? theme.error : theme.border }]}>
          <Text style={{ color: theme.text }}>{form.date.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) handleChange('date', selectedDate);
            }}
          />
        )}
        {errors.date && <Text style={[styles.errorText, { color: theme.error }]}>{errors.date}</Text>}

        {/* Categoria Modal */}
        <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
        <Pressable onPress={() => setModalVisible(true)} style={[styles.input, { backgroundColor: theme.card, borderColor: errors.category ? theme.error : theme.border }]}>
          <Text style={{ color: form.category ? theme.text : theme.placeholder }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
        </Pressable>
        {errors.category && <Text style={[styles.errorText, { color: theme.error }]}>{errors.category}</Text>}

        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
              {CATEGORIES.map(cat => (
                <Pressable key={cat} style={styles.modalItem} onPress={() => { handleChange('category', cat); setModalVisible(false); }}>
                  <Text style={{ color: theme.text, fontSize: 18 }}>{cat}</Text>
                </Pressable>
              ))}
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

        <View style={styles.buttons}>
          <Button title="Cancelar" onPress={() => navigation.goBack()} />
          <Button title="Salvar" onPress={handleSave} color={theme.primary} />
        </View>

        {isEditing && (
          <View style={styles.deleteContainer}>
            <Button title="Excluir Despesa" color="#ef5350" onPress={handleDelete} />
          </View>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  label: { fontSize: 16, marginBottom: 4, fontWeight: 'bold' },
  input: { padding: 12, borderRadius: 6, borderWidth: 1, marginBottom: 4 },
  errorText: { fontSize: 12, marginBottom: 16 },
  buttons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 24 },
  deleteContainer: { marginTop: 24, borderTopWidth: 1, borderTopColor: '#ccc', paddingTop: 24 },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { padding: 24, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  modalItem: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center' }
});