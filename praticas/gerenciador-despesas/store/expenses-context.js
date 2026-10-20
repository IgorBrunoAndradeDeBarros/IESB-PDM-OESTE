import { createContext, useReducer, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date, category }) => {},
  updateExpense: (id, { description, amount, date, category }) => {},
  deleteExpense: (id) => {},
  isLoaded: false,
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [{ ...action.payload, id: new Date().toString() + Math.random() }, ...state];
    case 'UPDATE':
      return state.map(expense =>
        expense.id === action.payload.id ? { ...expense, ...action.payload.data } : expense
      );
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const storedExpenses = await AsyncStorage.getItem('@expenses');
        if (storedExpenses) {
          dispatch({ type: 'SET', payload: JSON.parse(storedExpenses) });
        }
      } catch (error) {
        console.error("Erro ao carregar despesas:", error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  useEffect(() => {
    async function saveExpenses() {
      if (isLoaded) {
        try {
          await AsyncStorage.setItem('@expenses', JSON.stringify(expensesState));
        } catch (error) {
          console.error("Erro ao salvar despesas:", error);
        }
      }
    }
    saveExpenses();
  }, [expensesState, isLoaded]);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  return (
    <ExpensesContext.Provider value={{
      expenses: expensesState,
      addExpense,
      updateExpense,
      deleteExpense,
      isLoaded
    }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses deve ser usado dentro de um ExpensesContextProvider");
  }
  return context;
}