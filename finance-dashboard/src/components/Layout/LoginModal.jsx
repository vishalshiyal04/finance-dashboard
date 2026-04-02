import React, { useState } from 'react';
import { X, Lock, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      setError('');
      onClose();
    } else {
      setError('Invalid Username or Password');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-700 relative overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5" /> Admin Login
          </h2>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">User ID</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Enter User ID" 
                className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                placeholder="Enter Password" 
                className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">{error}</p>
          )}

          <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg transition-colors shadow-lg">
            Login Securely
          </button>
          
          <p className="text-xs text-center text-slate-400 dark:text-slate-500">
            Hint: User: <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">admin</code> Pass: <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">admin123</code>
          </p>
        </form>
      </div>
    </div>
  );
}