import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Moon, Shield, Eye, PlusCircle, LogOut, LogIn } from 'lucide-react';
import LoginModal from './LoginModal';

export default function Header({ onAddClick }) {
  const { darkMode, setDarkMode, role, setRole, isLoggedIn, logout } = useApp();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleRoleSwitch = (newRole) => {
    if (newRole === 'admin' && !isLoggedIn) {
      setIsLoginOpen(true);
    } else if (newRole === 'viewer') {
      setRole('viewer');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2 rounded-lg shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Finance Board</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button 
                onClick={() => handleRoleSwitch('viewer')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${role === 'viewer' ? 'bg-white dark:bg-slate-700 text-violet-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <Eye className="w-3 h-3"/> Viewer
              </button>
              <button 
                onClick={() => handleRoleSwitch('admin')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${role === 'admin' ? 'bg-white dark:bg-slate-700 text-violet-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <Shield className="w-3 h-3"/> Admin
              </button>
            </div>

            {isLoggedIn && role === 'admin' ? (
              <>
                <button 
                  onClick={onAddClick}
                  className="flex items-center justify-center gap-2 p-2 sm:px-4 sm:py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                >
                  <PlusCircle className="w-5 h-5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Add Transaction</span>
                </button>
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <LogIn className="w-4 h-4" /> Login
              </button>
            )}

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}