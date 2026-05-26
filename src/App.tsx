import { useState } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-50 text-slate-950 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-emerald-400">MDTU Academic</h2>
        <nav className="space-y-2">
          <button 
            onClick={() => setCurrentView('dashboard')} 
            className={`w-full text-left py-2 px-3 rounded ${currentView === 'dashboard' ? 'bg-emerald-600' : 'hover:bg-slate-800'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentView('siswa')} 
            className={`w-full text-left py-2 px-3 rounded ${currentView === 'siswa' ? 'bg-emerald-600' : 'hover:bg-slate-800'}`}
          >
            Data Siswa
          </button>
        </nav>
      </aside>

      {/* KONTEN */}
      <main className="flex-1 p-8 overflow-y-auto">
        {currentView === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-slate-800">Selamat Datang di Sistem Akademik Santri</h1>
            <p className="text-slate-600">Sistem ini siap digunakan untuk mengelola data lembaga MDTU Anda.</p>
          </div>
        )}
        {currentView === 'siswa' && (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-slate-800">Data Siswa / Santri</h1>
            <p className="text-slate-600">Halaman pengelolaan data santri aktif.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
