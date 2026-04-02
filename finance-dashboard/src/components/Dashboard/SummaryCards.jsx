import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Card = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color} text-white`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        {trend > 0 
          ? <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" /> 
          : <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />}
        <span className={trend > 0 ? 'text-green-500' : 'text-red-500'}>{Math.abs(trend)}%</span>
        <span className="text-slate-400 ml-1.5">vs last month</span>
      </div>
    )}
  </div>
);

export default function SummaryCards() {
  const { transactions } = useApp();
  
  const totals = transactions.reduce((acc, tx) => {
    if (tx.type === 'income') acc.income += tx.amount;
    else acc.expense += tx.amount;
    return acc;
  }, { income: 0, expense: 0 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Total Balance" value={formatCurrency(totals.income - totals.expense)} icon={Wallet} color="bg-violet-500" trend={8.2} />
      <Card title="Total Income" value={formatCurrency(totals.income)} icon={TrendingUp} color="bg-emerald-500" trend={12.5} />
      <Card title="Total Expenses" value={formatCurrency(totals.expense)} icon={TrendingDown} color="bg-rose-500" trend={-4.1} />
    </div>
  );
}