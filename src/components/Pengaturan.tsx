import React from 'react';
import { ProfilLembaga } from '../types';
import { motion } from 'motion/react';
import { Building, Save } from 'lucide-react';

interface PengaturanProps {
  lembaga: ProfilLembaga;
  onUpdateLembaga: (lembaga: ProfilLembaga) => void;
}

export default function Pengaturan({ lembaga, onUpdateLembaga }: PengaturanProps) {
  const [formData, setFormData] = React.useState<ProfilLembaga>(lembaga);
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLembaga(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Pengaturan Lembaga</h1>
        <p className="text-slate-500 mt-1">Sesuaikan identitas lembaga untuk keperluan cetak dokumen.</p>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center space-x-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Building size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Profil Madrasah Diniyah</h2>
            <p className="text-sm text-slate-500">Data ini akan ditampilkan pada KOP surat SKL / Rapot</p>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lembaga</label>
                <input
                  required
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Contoh: MDTU Darul Ilmi"
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">NSDT</label>
                <input
                  required
                  type="text"
                  value={formData.nsdt}
                  onChange={(e) => setFormData({ ...formData, nsdt: e.target.value })}
                  placeholder="Nomor Statistik Diniyah Takmiliyah"
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                />
                <p className="text-xs text-slate-500 mt-1">Nomor Statistik Diniyah Takmiliyah</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Kepala Lembaga</label>
                <input
                  required
                  type="text"
                  value={formData.kepala}
                  onChange={(e) => setFormData({ ...formData, kepala: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap</label>
                <textarea
                  required
                  rows={2}
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">NIP Kepala Lembaga (Opsional)</label>
                <input
                  type="text"
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  placeholder="Kosongkan jika tidak ada"
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tempat Ditetapkan</label>
                <input
                  required
                  type="text"
                  value={formData.tempatDitetapkan}
                  onChange={(e) => setFormData({ ...formData, tempatDitetapkan: e.target.value })}
                  placeholder="Contoh: Kota Santri"
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Titimangsa / Tanggal Dokumen</label>
                <input
                  required
                  type="text"
                  value={formData.titimangsa}
                  onChange={(e) => setFormData({ ...formData, titimangsa: e.target.value })}
                  placeholder="Contoh: 25 Mei 2026"
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                />
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                {isSaved && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-green-600 text-sm font-medium flex items-center"
                  >
                    Profil berhasil disimpan!
                  </motion.span>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-sm"
              >
                <Save size={18} />
                <span>Simpan Pengaturan</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
