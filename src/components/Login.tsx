import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'guru' && password === 'rahasia123') {
      onLogin();
    } else {
      setError('Username atau password salah.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-blue-600 p-8 text-white text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Portal Akademik Guru</h1>
          <p className="text-blue-200 mt-2 text-sm">Masuk untuk mengelola nilai santri</p>
        </div>
        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm font-medium border border-red-100">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900"
                  placeholder="Contoh: guru"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900"
                  placeholder="Contoh: rahasia123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-200 outline-none"
            >
              Masuk
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-slate-500">
            <p>Gunakan kredensial default untuk demo:</p>
            <p className="font-mono mt-1 bg-slate-100 inline-block px-2 py-1 rounded">guru / rahasia123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
