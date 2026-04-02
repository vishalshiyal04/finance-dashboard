import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateTransactions } from '../data/mockData';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState('viewer');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance-data');
    return saved ? JSON.parse(saved) : generateTransactions(50);
  });

  useEffect(() => {
    localStorage.setItem('finance-data', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const addTransaction = (tx) => setTransactions([tx, ...transactions]);
  const deleteTransaction = (id) => setTransactions(transactions.filter(tx => tx.id !== id));
  const updateTransaction = (id, updatedTx) =>
    setTransactions(transactions.map(tx => (tx.id === id ? { ...updatedTx, id } : tx)));

  // LOGIN LOGIC :-
  // Fixed User: admin
  // Fixed Pass: admin123
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setRole('admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole('viewer');
  };

  return (
    <AppContext.Provider value={{
      role, setRole,
      darkMode, setDarkMode,
      transactions, addTransaction, updateTransaction, deleteTransaction,
      isLoggedIn, login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
};