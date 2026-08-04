# 💻 Prática 05: FlatList, Persistência e TaskCard

Nesta prática o To-Do fica mais profissional: lista eficiente, dados que sobrevivem ao fechar o app, e código organizado em componente.

## 🎯 Objetivos

* Substituir `.map()` por `FlatList`.
* Salvar e carregar tarefas com AsyncStorage + `useEffect`.
* Extrair o card para `src/components/TaskCard`.
* Garantir que o comportamento continue igual (teste de regressão).

---

## 📦 Fluxo Git

1. Crie a Issue da **Prática 05**.
2. Branch:

```bash
git checkout -b feature/pratica05
```

3. Trabalhe em `praticas/pratica05` (evolua a base da Prática 04).

```bash
npm install
npx expo start
```

---

## 🛠️ Parte A — FlatList

1. Remova o `.map()` da lista.
2. Importe `FlatList` de `react-native`.
3. Configure:

* `data={tasks}`
* `keyExtractor={(item) => item.id}`
* `renderItem={...}` desenhando cada tarefa

4. Teste adicionando **muitas** tarefas e confirme a rolagem suave.

---

## 🛠️ Parte B — AsyncStorage

1. Pare o bundler (Ctrl+C) e instale:

```bash
npx expo install @react-native-async-storage/async-storage
```

2. Crie `saveTasks` (async): grave a lista com `setItem` + `JSON.stringify`.
3. Chame `saveTasks` após adicionar e após deletar (com a lista já atualizada).
4. Crie `loadTasks` (async): leia com `getItem`, faça `JSON.parse` se houver valor, e use `setTasks`.
5. No `useEffect` com `[]`, chame `loadTasks()` na montagem.

### Teste extremo

Adicione 3 tarefas → feche o app por completo (remover dos recentes) → abra de novo → as tarefas devem continuar lá.

---

## 🛠️ Parte C — Componente `TaskCard`

1. Crie a pasta `src/components`.
2. Crie `src/components/TaskCard.js` (ou `.jsx`).
3. Recorte o JSX do card (e os estilos dele) para esse arquivo.
4. O componente deve receber props: `{ title, onDelete }`.
5. No `App`, importe e use na `FlatList`:

```javascript
import { TaskCard } from './src/components/TaskCard';

// ...
renderItem={({ item }) => (
  <TaskCard
    title={item.title}
    onDelete={() => handleDelete(item.id)}
  />
)}
```

> Se na prática anterior o campo se chamava `task` em vez de `title`, padronize para `title` **ou** adapte a prop — o importante é pai e filho falarem a mesma língua.

---

## ✅ Critérios de entrega

* [ ] `FlatList` rolando com muitos itens
* [ ] Persistência: fechar e reabrir mantém as tarefas
* [ ] `TaskCard` em `src/components` com props
* [ ] App continua adicionando/deletando normalmente
* [ ] Issue, branch `feature/pratica05`, commit, push e Pull Request

### Commit sugerido

```bash
git add .
git commit -m "Feat: Adiciona FlatList, AsyncStorage e componente TaskCard"
git push origin feature/pratica05
```

Parabéns: ao final desta trilha você saiu do zero (conceito + ambiente) até um To-Do multiplataforma com persistência e código organizado.
