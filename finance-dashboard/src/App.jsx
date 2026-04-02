import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Layout/Header';
import SummaryCards from './components/Dashboard/SummaryCards';
import Charts from './components/Dashboard/Charts';
import Insights from './components/Dashboard/Insights';
import TransactionTable from './components/Transactions/TransactionTable';
import TransactionForm from './components/Transactions/TransactionForm';
import Footer from './components/Layout/Footer';

function Dashboard() {
  const { addTransaction, updateTransaction, role } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const handleEdit = (tx) => {
    if (role !== 'admin') return;
    setEditingTx(tx);
    setIsFormOpen(true);
  };

  const handleSubmit = (tx) => {
    if (editingTx) {
      updateTransaction(tx.id, tx);
    } else {
      addTransaction(tx);
    }
    setEditingTx(null);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingTx(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      <Header onAddClick={() => setIsFormOpen(true)} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SummaryCards />
        <Charts />
        <Insights />
        <TransactionTable onEdit={handleEdit} />
      </main>
      <Footer />
      <TransactionForm 
        isOpen={isFormOpen} 
        onClose={handleClose} 
        editData={editingTx}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}