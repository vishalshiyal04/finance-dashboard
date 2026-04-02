import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate, convertToCSV, downloadFile } from '../../utils/helpers';
import { Search, Filter, Edit2, Trash2, ArrowUpDown, Download, FileJson, FileSpreadsheet, X, ChevronRight } from 'lucide-react';

export default function TransactionTable({ onEdit }) {
  const { transactions, role, deleteTransaction } = useApp();
  
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [groupBy, setGroupBy] = useState('none'); 

  const canModify = role === 'admin';

  const categories = useMemo(() => {
    const cats = new Set(transactions.map(tx => tx.category));
    return ['all', ...Array.from(cats)];
  }, [transactions]);

  const filteredTx = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = tx.description.toLowerCase().includes(search.toLowerCase()) || 
                            tx.category.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'all' || tx.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || tx.category === categoryFilter;
      
      const txDate = new Date(tx.date);
      const matchesStart = startDate ? txDate >= new Date(startDate) : true;
      const matchesEnd = endDate ? txDate <= new Date(endDate) : true;

      return matchesSearch && matchesType && matchesCategory && matchesStart && matchesEnd;
    });
  }, [transactions, search, typeFilter, categoryFilter, startDate, endDate]);

  const sortedTx = useMemo(() => {
    return [...filteredTx].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredTx, sortConfig]);

  const groupedTx = useMemo(() => {
    if (groupBy === 'none') return null;

    return sortedTx.reduce((acc, tx) => {
      const key = tx[groupBy]; 
      if (!acc[key]) acc[key] = [];
      acc[key].push(tx);
      return acc;
    }, {});
  }, [sortedTx, groupBy]);

  const handleExportJSON = () => {
    const json = JSON.stringify(sortedTx, null, 2);
    downloadFile(json, 'transactions.json', 'application/json');
  };

  const handleExportCSV = () => {
    const csv = convertToCSV(sortedTx);
    downloadFile(csv, 'transactions.csv', 'text/csv');
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setStartDate('');
    setEndDate('');
  };

  const TableRow = ({ tx }) => (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
      <td className="p-4 text-slate-600 dark:text-slate-300 text-sm">{formatDate(tx.date)}</td>
      <td className="p-4 font-medium text-slate-900 dark:text-white text-sm">{tx.description}</td>
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          tx.type === 'income' 
            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
            : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
        }`}>
          {tx.category}
        </span>
      </td>
      <td className={`p-4 text-right font-mono font-medium text-sm ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
      </td>
      {canModify && (
        <td className="p-4 flex justify-center gap-2">
          <button 
            onClick={() => onEdit(tx)}
            className="p-1.5 rounded text-slate-500 hover:text-violet-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => deleteTransaction(tx.id)}
            className="p-1.5 rounded text-slate-500 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </td>
      )}
    </tr>
  );

  return (
    <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <h3 className="font-semibold">Transactions</h3>
            <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{sortedTx.length} records</span>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto flex-wrap justify-end">
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 border dark:border-slate-600 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                <Download className="w-4 h-4" /> Export
              </button>
              <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                <button onClick={handleExportCSV} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500"/> Export as CSV
                </button>
                <button onClick={handleExportJSON} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                  <FileJson className="w-4 h-4 text-blue-500"/> Export as JSON
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-violet-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select 
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm outline-none"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select 
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm outline-none"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          >
            <option value="none">No Grouping</option>
            <option value="category">Group by Category</option>
            <option value="type">Group by Type</option>
          </select>

          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-violet-600 font-medium flex items-center gap-1 whitespace-nowrap"
          >
            <Filter className="w-4 h-4" /> Advanced
          </button>
        </div>

        {showAdvanced && (
          <div className="flex flex-wrap gap-3 items-center p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-600 mt-2">
            <select 
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500 dark:text-slate-400">From:</label>
              <input 
                type="date" 
                className="px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500 dark:text-slate-400">To:</label>
              <input 
                type="date" 
                className="px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <button onClick={clearFilters} className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 ml-auto">
              <X className="w-3 h-3" /> Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-700/30 text-slate-500 dark:text-slate-400 text-xs uppercase">
            <tr>
              <th className="p-4 cursor-pointer hover:text-violet-500" onClick={() => requestSort('date')}>
                <div className="flex items-center gap-1">Date <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="p-4">Description</th>
              <th className="p-4 cursor-pointer hover:text-violet-500" onClick={() => requestSort('category')}>
                 <div className="flex items-center gap-1">Category <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="p-4 text-right cursor-pointer hover:text-violet-500" onClick={() => requestSort('amount')}>
                 <div className="flex items-center justify-end gap-1">Amount <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              {canModify && <th className="p-4 text-center">Actions</th>}
            </tr>
          </thead>
          
          {groupBy === 'none' ? (
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {sortedTx.length > 0 ? sortedTx.map(tx => (
                <TableRow key={tx.id} tx={tx} />
              )) : (
                <tr><td colSpan="5" className="text-center p-10 text-slate-400">No transactions found.</td></tr>
              )}
            </tbody>
          ) : (
            Object.entries(groupedTx || {}).map(([group, items]) => (
              <tbody key={group} className="border-b-4 border-slate-100 dark:border-slate-700">
                <tr className="bg-slate-100 dark:bg-slate-700/50">
                  <td colSpan={canModify ? 5 : 4} className="p-3 font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    {group} 
                    <span className="text-xs font-normal bg-slate-200 dark:bg-slate-600 px-2 py-0.5 rounded-full ml-2">
                      {items.length} items
                    </span>
                  </td>
                </tr>
                {items.map(tx => <TableRow key={tx.id} tx={tx} />)}
              </tbody>
            ))
          )}
        </table>
      </div>
    </div>
  );
}