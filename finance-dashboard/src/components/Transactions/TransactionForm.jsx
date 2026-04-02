import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; 

export default function TransactionForm({ isOpen, onClose, editData, onSubmit }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: 'Groceries',
    type: 'expense',
    amount: ''
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: 'Groceries',
        type: 'expense',
        amount: ''
      });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

    const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      ...form, 
      amount: parseFloat(form.amount), 
      id: editData?.id || uuidv4() 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-700 relative overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{editData ? 'Edit' : 'Add'} Transaction</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
            <div className="flex gap-4">
              {['income', 'expense'].map(t => (
                <label key={t} className={`flex-1 text-center py-2 px-4 rounded-lg cursor-pointer border transition-colors ${form.type === t ? (t === 'income' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-rose-50 border-rose-500 text-rose-700') : 'border-slate-300 dark:border-slate-600 text-slate-500'}`}>
                  <input type="radio" name="type" value={t} checked={form.type === t} onChange={() => setForm({...form, type: t})} className="hidden" />
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
              <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full p-2 rounded-lg border dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount</label>
              <input type="number" placeholder="0.00" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className="w-full p-2 rounded-lg border dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full p-2 rounded-lg border dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-violet-500">
              <option value="Groceries">Groceries</option>
              <option value="Salary">Salary</option>
              <option value="Rent">Rent</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <input type="text" placeholder="Coffee at Starbucks" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-2 rounded-lg border dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" required />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors shadow-sm">
              {editData ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}