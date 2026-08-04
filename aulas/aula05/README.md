# 📚 Aula 05: Listas Eficientes, Persistência e Componentes

Com o To-Do interativo, aparecem três problemas típicos de app real:

1. Listas grandes com `.map()` pesam na performance e na rolagem.
2. Fechar o app **apaga** tudo (estado vive só na memória).
3. O `App.js` começa a ficar grande demais — hora de **componentizar**.

## 🎯 Objetivos da Aula

* Trocar `.map()` por `<FlatList>` para listas longas.
* Persistir dados com `@react-native-async-storage/async-storage`.
* Carregar dados na abertura com `useEffect`.
* Extrair UI reutilizável com **props** (`TaskCard`).

---

## 📜 Por que `FlatList`?

`.map()` tenta desenhar **todos** os itens de uma vez. Em listas longas isso trava a UI.

A `FlatList` renderiza sob demanda (virtualização): só o que está (aproximadamente) visível na tela.

Props essenciais:

| Prop | Função |
| :--- | :--- |
| `data={tasks}` | Array de origem |
| `keyExtractor={(item) => item.id}` | Identificador único |
| `renderItem={({ item }) => ...}` | Como desenhar cada linha |

```javascript
<FlatList
  data={tasks}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View>
      <Text>{item.title}</Text>
    </View>
  )}
/>
```

---

## 💾 AsyncStorage (persistência local)

`useState` mora na RAM: fechou o app, perdeu os dados.

O AsyncStorage funciona como um **gaveteiro chave → valor** no aparelho. Só grava **strings**.

* Salvar objeto/array: `JSON.stringify(...)`
* Ler de volta: `JSON.parse(...)`
* Operações são **assíncronas** (`async` / `await`)

```bash
npx expo install @react-native-async-storage/async-storage
```

Ideia geral:

```javascript
await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
const raw = await AsyncStorage.getItem('@tasks');
const parsed = raw ? JSON.parse(raw) : [];
```

---

## ⏱️ `useEffect` — carregar ao abrir

Para buscar as tarefas salvas **quando a tela monta**:

```javascript
import { useEffect } from 'react';

useEffect(() => {
  loadTasks();
}, []); // [] = executar uma vez na montagem
```

Salve também sempre que a lista mudar (após add/delete), chamando sua função `saveTasks`.

---

## 🧱 Componentização e Props

Em vez de um único arquivo gigante, separe pedaços reutilizáveis.

### Estrutura sugerida

```text
src/
  components/   → pedaços de UI (TaskCard, etc.)
  screens/      → telas inteiras (quando o app crescer)
  services/     → storage, APIs (quando fizer sentido)
```

### Props = parâmetros entre componentes

O pai (`App`) guarda o estado; o filho (`TaskCard`) só desenha e avisa eventos.

**Pai:**

```javascript
<TaskCard title={item.title} onDelete={() => handleDelete(item.id)} />
```

**Filho:**

```javascript
export function TaskCard({ title, onDelete }) {
  return (
    <View>
      <Text>{title}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
}
```

Vantagem: se o visual do card mudar, você edita um arquivo só — sem bagunçar a lógica da lista.

---

## ✅ Checklist de compreensão

1. Quais 3 props básicas a `FlatList` exige?
2. Por que AsyncStorage precisa de `JSON.stringify`?
3. O que o `[]` no `useEffect` significa?
4. O que são props na comunicação pai → filho?

Na **Prática 05**, você aplica FlatList + persistência e extrai o `TaskCard` para `src/components`.
