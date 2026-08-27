# Meu Diário Acadêmico

Aplicativo simples em React Native (Expo) para cadastro de disciplinas, desenvolvido como atividade prática de layout e componentes.

## 🚀 Comando usado para criar o projeto

```bash
npx create-expo-app MeuDiarioAcademico
```

Bibliotecas adicionadas com:

```bash
npx expo install react-native-safe-area-context
```

## ▶️ Como rodar

```bash
cd MeuDiarioAcademico
npm install
npx expo start
```

Escaneie o QR Code com o app Expo Go (Android/iOS) ou rode em um emulador.

## 📱 Prints da tela

> Substitua os placeholders abaixo pelos prints reais do app rodando.

![Tela principal](./prints/tela-principal.png)

![Botão pressionado](./prints/botao-pressionado.png)

## 🧩 Explicação breve

- **`labels.js`**: centraliza todos os textos da interface (título do app, placeholder, texto do botão, título da lista, label do switch), exportados como constantes e importados em `App.js`.
- **`App.js`**:
    - Usa `SafeAreaView` (de `react-native-safe-area-context`) para evitar sobreposição com a área de notch/status bar.
    - Cabeçalho com o título do app.
    - Linha (`flexDirection: 'row'`) contendo `TextInput` (~70% de largura) e um botão `Pressable` (~30%, via `flex: 1`) para adicionar disciplinas.
    - `Switch` opcional "Mostrar apenas obrigatórias" (ainda sem lógica de filtro).
    - Lista estática de disciplinas renderizada com `.map`, exibida abaixo do formulário.
- **Estilos (`StyleSheet.create`)**: organizados por seção (container, header, row, input, button, switch, list, item), com comentários explicando o uso de `justifyContent` e `alignItems` em cada bloco.
- **Dimensões**: uso de largura percentual (`width: '68%'` no input) e uso de `flex` (`flex: 1` no container e no botão), conforme exigido.

## ✅ Requisitos atendidos

- [x] Projeto sobe com `npx expo start`
- [x] Import/export de rótulos (`labels.js`)
- [x] Layout com Flexbox (row + column)
- [x] StyleSheet organizado e legível
- [x] `Pressable` com estilo de pressionado (desafio opcional)
- [x] `Switch` "Mostrar apenas obrigatórias" (desafio opcional)
- [x] README com prints e explicação

## 🔗 Pull Request

> Cole aqui o link do PR do projeto.