import { createContext, useContext, useState } from 'react';
import { DESPESAS_INICIAIS } from '../data/despesas';

const DespesasContext = createContext();

export function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(dados) {
    const id = String(Date.now());
    setDespesas((atual) => [{ ...dados, id }, ...atual]);
  }

  function atualizarDespesa(id, dados) {
    setDespesas((atual) => atual.map((d) => (d.id === id ? { ...d, ...dados } : d)));
  }

  function removerDespesa(id) {
    setDespesas((atual) => atual.filter((d) => d.id !== id));
  }

  return (
    <DespesasContext.Provider value={{ despesas, adicionarDespesa, atualizarDespesa, removerDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}

export const useDespesas = () => useContext(DespesasContext);