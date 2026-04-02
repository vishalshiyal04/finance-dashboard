import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Coins, DollarSign, Clock, Shield, AlertCircle } from 'lucide-react';

const getMarketStatus = () => {
  const now = new Date();
  
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const utcTimeMinutes = utcHours * 60 + utcMinutes;

  let istTimeMinutes = utcTimeMinutes + (5 * 60 + 30);
  
  let istDay = now.getUTCDay(); 
  
  if (istTimeMinutes >= 1440) {
    istTimeMinutes = istTimeMinutes - 1440;
    istDay = (istDay + 1) % 7; 
  }

  const marketOpen = 9 * 60 + 15;
  const marketClose = 15 * 60 + 30;

  if (istDay === 0 || istDay === 6) {
    return 'Closed (Weekend)';
  }

  if (istTimeMinutes >= marketOpen && istTimeMinutes < marketClose) {
    return 'Open';
  } else if (istTimeMinutes < marketOpen) {
    return 'Pre-Market';
  } else {
    return 'Closed';
  }
};

const fluctuate = (base, volatility = 0.0005) => {
  const change = base * volatility * (Math.random() - 0.5);
  return base + change;
};

const baseStocks = [
  { symbol: 'NIFTY 50', base: 22500 },
  { symbol: 'SENSEX', base: 74000 },
  { symbol: 'NIFTY BANK', base: 48200 },
  { symbol: 'RELIANCE', base: 2990 },
  { symbol: 'TCS', base: 3860 },
  { symbol: 'HDFC BANK', base: 1660 },
  { symbol: 'INFOSYS', base: 1460 },
  { symbol: 'ICICI BANK', base: 1100 },
];


const MiniCard = ({ title, value, change, up, icon: Icon }) => (
  <div className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
    <div className={`p-2.5 rounded-lg ${up ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-rose-100 dark:bg-rose-900/30'}`}>
      <Icon className={`w-5 h-5 ${up ? 'text-emerald-600' : 'text-rose-600'}`} />
    </div>
    <div className="flex-1">
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-base font-bold text-slate-800 dark:text-white">{value}</h3>
        {change && (
          <span className={`text-xs font-medium ${up ? 'text-emerald-600' : 'text-rose-600'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  </div>
);

const TickerItem = ({ symbol, price, change, up }) => (
  <div className="flex items-center mx-4 space-x-2 group">
    <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{symbol}</span>
    <span className="text-slate-600 dark:text-slate-400 font-mono text-xs">{price}</span>
    <span className={`flex items-center text-xs font-medium px-1.5 py-0.5 rounded ${up ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-rose-700 bg-rose-50 dark:bg-rose-900/30 dark:text-rose-400'}`}>
      {up ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
      {change}
    </span>
  </div>
);


export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const [marketStatus, setMarketStatus] = useState('Calculating...');
  const [equityData, setEquityData] = useState([]);

  useEffect(() => {
    const updateStatus = () => {
      setMarketStatus(getMarketStatus());
    };
    updateStatus(); 
    const interval = setInterval(updateStatus, 1000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updatePrices = () => {
      const data = baseStocks.map(stock => {
        const currentPrice = fluctuate(stock.base);
        const changePercent = ((currentPrice - stock.base) / stock.base) * 100;
        return {
          symbol: stock.symbol,
          price: `₹${currentPrice.toFixed(2)}`,
          change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
          up: changePercent >= 0
        };
      });
      setEquityData(data);
    };

    updatePrices(); 
    const interval = setInterval(updatePrices, 2000);
    return () => clearInterval(interval);
  }, []);

  const statusStyles = {
    Open: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400' },
    Closed: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-400' },
    'Closed (Weekend)': { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-400' },
    default: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400' }
  };
  const style = statusStyles[marketStatus] || statusStyles.default;

  return (
    <footer className="mt-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        
        <div className="bg-white dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 py-2 overflow-hidden">
            <div className="flex animate-ticker whitespace-nowrap">
                {equityData.length > 0 && [...equityData, ...equityData].map((item, idx) => (
                    <TickerItem key={idx} {...item} />
                ))}
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            
            <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <p className="text-xs text-amber-700 dark:text-amber-400">
                    <span className="font-bold">IMPORTANT:</span> Data is simulated for demonstration purposes only. Not real market data. <br/>All information is fictional and should not be used for actual trading or financial decisions. Always verify with official sources before acting on any financial information.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-3">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Market Status</p>
                        <div className={`p-1.5 rounded-full ${style.bg}`}>
                            <Clock className={`w-4 h-4 ${style.text}`} />
                        </div>
                    </div>
                    <h3 className={`text-xl font-bold ${style.text}`}>{marketStatus}</h3>
                    <p className="text-xs text-slate-400 mt-1">Indian Standard Time (IST)</p>
                </div>

                <MiniCard 
                    title="Gold (24K)" 
                    value="₹71,250" 
                    change="+0.15%" 
                    up={true} 
                    icon={Coins} 
                />

                <MiniCard 
                    title="USD / INR" 
                    value="83.45" 
                    change="+0.05%" 
                    up={true} 
                    icon={DollarSign} 
                />

                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-3">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Regulators</p>
                        <div className="p-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30">
                            <Shield className="w-4 h-4 text-violet-600" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a href="https://www.sebi.gov.in" target="_blank" rel="noreferrer" className="text-sm text-violet-600 hover:underline font-medium">SEBI</a>
                        <a href="https://www.nseindia.com" target="_blank" rel="noreferrer" className="text-sm text-slate-600 dark:text-slate-300 hover:text-violet-600">NSE India</a>
                        <a href="https://www.bseindia.com" target="_blank" rel="noreferrer" className="text-sm text-slate-600 dark:text-slate-300 hover:text-violet-600">BSE India</a>
                    </div>
                </div>
            </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                    <Activity className="w-4 h-4" />
                    <span>Finance Board © {currentYear}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>Privacy Policy</span>
                    <span>•</span>
                    <span>Terms of Service</span>
                </div>
            </div>
        </div>
    </footer>
  );
}