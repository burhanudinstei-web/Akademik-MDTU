import React, { useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DataSiswa from './components/DataSiswa';
import CetakSKL from './components/CetakSKL';
import Pengaturan from './components/Pengaturan';
import { ViewState, Siswa, ProfilLembaga } from './types';
import { mockDataSiswa } from './data';

const DEFAULT_LEMBAGA: ProfilLembaga = {
  nama: "Madrasah Diniyah Takmiliyah Ula (MDTU) Darul Ilmi",
  nsdt: "12345678901234",
  alamat: "Jl. Pendidikan Keagamaan No. 99, Kota Santri, Indonesia",
  kepala: "K.H. Burhanudin, S.Pd.I.",
  nip: "19800101 200501 1 001",
  tempatDitetapkan: "Kota Santri",
  titimangsa: "25 Mei 2026"
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [dataSantri, setDataSantri] = useState<Siswa[]>(mockDataSiswa);
  const [lembaga, setLembaga] = useState<ProfilLembaga>(DEFAULT_LEMBAGA);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const handleUpdate = (updatedSiswa: Siswa) => {
    setDataSantri(prev => prev.map(s => s.id === updatedSiswa.id ? updatedSiswa : s));
  };
  
  const handleAdd = (newSiswa: Siswa) => {
    setDataSantri(prev => [...prev, newSiswa]);
  };

  const handleBatchAdd = (newSiswas: Siswa[]) => {
    setDataSantri(prev => [...prev, ...newSiswas]);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data santri ini?')) {
      setDataSantri(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900 font-sans">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} onLogout={() => setIsAuthenticated(false)} />
      
      <main className="flex-1 overflow-y-auto p-8 relative">
        {currentView === 'dashboard' && <Dashboard data={dataSantri} />}
        {currentView === 'data-siswa' && (
          <DataSiswa data={dataSantri} onAdd={handleAdd} onBatchAdd={handleBatchAdd} onUpdate={handleUpdate} onDelete={handleDelete} />
        )}
        {currentView === 'cetak-skl' && <CetakSKL data={dataSantri} lembaga={lembaga} />}
        {currentView === 'pengaturan' && (
          <Pengaturan lembaga={lembaga} onUpdateLembaga={setLembaga} />
        )}
      </main>
    </div>
  );
            {currentView === 'dashboard' && <Dashboard data={dataSantri} />}
            {currentView === 'data-siswa' && (
              <DataSiswa 
                data={dataSantri} 
                onAdd={handleAdd}
                onBatchAdd={handleBatchAdd}
                onUpdate={handleUpdate} 
                onDelete={handleDelete} 
              />
            )}
            {currentView === 'cetak-skl' && <CetakSKL data={dataSantri} lembaga={lembaga} />}
            {currentView === 'pengaturan' && (
              <Pengaturan 
                lembaga={lembaga} 
                onUpdateLembaga={setLembaga} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

