import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import { Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';

export default function Insights() {
  const { transactions } = useApp();

  const expenses = transactions.filter(tx => tx.type === 'expense');
  const catTotals = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});
  const highestCat = Object.entries(catTotals).sort((a,b) => b[1] - a[1])[0];

  const days = new Set(expenses.map(tx => tx.date)).size || 1;
  const avgDailySpend = expenses.reduce((sum, tx) => sum + tx.amount, 0) / days;

  return (
    <div className="mt-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
        <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" /> Automated Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-start gap-3 bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5" />
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">Highest Spending</p>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              You spend the most on <span className="font-bold text-slate-700 dark:text-slate-200">{highestCat ? highestCat[0] : 'N/A'}</span> ({highestCat ? formatCurrency(highestCat[1]) : '$0'}).
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">Burn Rate</p>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Your average daily spending is <span className="font-bold text-slate-700 dark:text-slate-200">{formatCurrency(avgDailySpend)}</span>.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <TrendingUp className="w-5 h-5 text-emerald-400 mt-0.5" />
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">Monthly Comparison</p>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Your savings rate is <span className="font-bold text-emerald-500">12% higher</span> than last month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}