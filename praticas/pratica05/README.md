# MetasSemestre

App de metas acadêmicas em React Native (Expo) com persistência local via AsyncStorage.

## Funcionalidades

- Cadastro de metas (com validação de texto vazio via Alert)
- Remoção de metas
- Marcar meta como concluída (estilo riscado)
- Contador: `X pendentes / Y concluídas`
- Dados persistem ao fechar e reabrir o app

## Estrutura

```
components/
├── MetaInput.js   -> input + botão de adicionar
└── MetaList.js    -> lista (FlatList) dos itens
App.js             -> estado, useEffects e composição
```

## Persistência (AsyncStorage)

Chave: `@metas_semestre`

- **useEffect de carga** — em `App.js`, dependência `[]`. Roda na montagem e carrega as metas salvas.
- **useEffect de salvamento** — em `App.js`, dependência `[metas, carregando]`. Roda sempre que a lista muda e salva no AsyncStorage.

## Prints

### Lista vazia
![Lista vazia](./screenshots/lista-vazia.png)

### Lista com itens
![Lista com itens](./screenshots/lista-com-itens.png)

### Após reabrir o app
> _(adicionar print)_

## Como rodar

```bash
npm install
npx expo start
```

## Pull Request

> _(link do PR)_
