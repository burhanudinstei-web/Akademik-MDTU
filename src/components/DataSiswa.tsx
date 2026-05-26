import React, { useState, useMemo, useRef } from 'react';
import { Siswa, calculateNilaiAkhir, SUBJECT_KEYS, SUBJECT_LABELS, NilaiMDTU } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Plus, Edit2, Trash2, X, Download, Upload } from 'lucide-react';

interface DataSiswaProps {
  data: Siswa[];
  onAdd: (siswa: Siswa) => void;
  onBatchAdd?: (siswas: Siswa[]) => void;
  onUpdate: (siswa: Siswa) => void;
  onDelete: (id: string) => void;
}

export default function DataSiswa({ data, onAdd, onBatchAdd, onUpdate, onDelete }: DataSiswaProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKelas, setFilterKelas] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState<Siswa | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const classes = ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4'];

  const filteredData = useMemo(() => {
    return data.filter(s => {
      const matchName = s.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        s.nis.includes(searchTerm);
      const matchKelas = filterKelas === 'Semua' || s.kelas === filterKelas;
      const matchStatus = filterStatus === 'Semua' || s.statusKeterangan === filterStatus;
      return matchName && matchKelas && matchStatus;
    });
  }, [data, searchTerm, filterKelas, filterStatus]);

  const handleOpenModal = (siswa?: Siswa) => {
    if (siswa) {
      setEditingSiswa(siswa);
    } else {
      setEditingSiswa({
        id: Math.random().toString(36).substr(2, 9),
        nis: '',
        nama: '',
        kelas: 'Kelas 1',
        statusKeterangan: 'NAIK KELAS',
        catatan: '',
        nilai: {
          bahasaArab: { rapot: 0, ujian: 0 },
          tarikh: { rapot: 0, ujian: 0 },
          alquran: { rapot: 0, ujian: 0 },
          hadist: { rapot: 0, ujian: 0 },
          fiqih: { rapot: 0, ujian: 0 },
          aqidah: { rapot: 0, ujian: 0 },
          akhlak: { rapot: 0, ujian: 0 },
        }
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSiswa(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSiswa) return;
    
    if (data.some(s => s.id === editingSiswa.id)) {
      onUpdate(editingSiswa);
    } else {
      onAdd(editingSiswa);
    }
    closeModal();
  };

  const handleNilaiChange = (subject: keyof NilaiMDTU, field: 'rapot' | 'ujian', value: string) => {
    if (!editingSiswa) return;
    setEditingSiswa({
      ...editingSiswa,
      nilai: {
        ...editingSiswa.nilai,
        [subject]: {
          ...editingSiswa.nilai[subject],
          [field]: Number(value)
        }
      }
    });
  };

  const handleDownloadTemplate = () => {
    const headers = [
      'NIS', 'Nama', 'Kelas', 'Status', 'Catatan',
      'Rapot_BahasaArab', 'Ujian_BahasaArab',
      'Rapot_Tarikh', 'Ujian_Tarikh',
      'Rapot_AlQuran', 'Ujian_AlQuran',
      'Rapot_Hadist', 'Ujian_Hadist',
      'Rapot_Fiqih', 'Ujian_Fiqih',
      'Rapot_Aqidah', 'Ujian_Aqidah',
      'Rapot_Akhlak', 'Ujian_Akhlak'
    ];
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + '\n' +
      "2026101,Ahmad,Kelas 1,NAIK KELAS,Catatan baik,80,85,82,80,90,88,85,86,84,88,88,90,90,95";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'template_nilai_santri.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n');
      if (lines.length < 2) return;

      const newSantris: Siswa[] = [];
      
      const parseCSVRow = (text: string) => {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          if (char === '"' && text[i+1] === '"') {
            current += '"'; i++;
          } else if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
          } else {
            current += char;
          }
        }
        result.push(current);
        return result;
      };

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = parseCSVRow(line);
        if (values.length >= 19) {
          const siswa: Siswa = {
            id: Math.random().toString(36).substr(2, 9),
            nis: values[0],
            nama: values[1],
            kelas: values[2],
            statusKeterangan: values[3] as any,
            catatan: values[4],
            nilai: {
              bahasaArab: { rapot: Number(values[5]), ujian: Number(values[6]) },
              tarikh:     { rapot: Number(values[7]), ujian: Number(values[8]) },
              alquran:    { rapot: Number(values[9]), ujian: Number(values[10]) },
              hadist:     { rapot: Number(values[11]), ujian: Number(values[12]) },
              fiqih:      { rapot: Number(values[13]), ujian: Number(values[14]) },
              aqidah:     { rapot: Number(values[15]), ujian: Number(values[16]) },
              akhlak:     { rapot: Number(values[17]), ujian: Number(values[18]) },
            }
          };
          newSantris.push(siswa);
        }
      }

      if (newSantris.length > 0 && onBatchAdd) {
        onBatchAdd(newSantris);
        alert(`${newSantris.length} data santri berhasil diimpor!`);
      } else {
        alert('Gagal mengimpor data. Pastikan format CSV sesuai dengan template.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Data Santri MDTU</h1>
          <p className="text-slate-500 mt-1">Kelola data dan input nilai santri.</p>
        </div>
        <div className="flex bg-white rounded-lg shadow-sm font-medium text-sm flex-wrap">
          <input 
            type="file" 
            accept=".csv" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
          />
          <button
            onClick={handleDownloadTemplate}
            className="text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-l-lg border border-slate-200 transition-colors flex items-center space-x-2 whitespace-nowrap"
          >
            <Download size={16} />
            <span>Template CSV</span>
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-green-700 hover:bg-green-50 px-4 py-2 border-y border-r border-slate-200 transition-colors flex items-center space-x-2 whitespace-nowrap"
          >
            <Upload size={16} />
            <span>Import CSV</span>
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg border border-transparent transition-colors flex items-center space-x-2 whitespace-nowrap"
          >
            <Plus size={16} />
            <span>Tambah Santri</span>
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 bg-slate-50">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Cari nama atau NIS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none"
            >
              <option value="Semua">Semua Kelas</option>
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none"
            >
              <option value="Semua">Semua Status</option>
              <option value="LULUS">Lulus</option>
              <option value="TIDAK LULUS">Tidak Lulus</option>
              <option value="NAIK KELAS">Naik Kelas</option>
              <option value="TINGGAL KELAS">Tinggal Kelas</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-medium">NIS</th>
                <th className="p-4 font-medium">Nama Santri</th>
                <th className="p-4 font-medium">Kelas</th>
                <th className="p-4 font-medium text-center">Nilai Rata-rata</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredData.length > 0 ? (
                filteredData.map((siswa, index) => (
                  <motion.tr 
                    key={siswa.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 font-mono text-slate-500">{siswa.nis}</td>
                    <td className="p-4 font-medium text-slate-900">{siswa.nama}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-semibold">
                        {siswa.kelas}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-slate-900">
                      {calculateNilaiAkhir(siswa.nilai)}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        siswa.statusKeterangan.includes('LULUS') || siswa.statusKeterangan.includes('NAIK')
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {siswa.statusKeterangan}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(siswa)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded bg-white border border-slate-200 shadow-sm transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => onDelete(siswa.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded bg-white border border-slate-200 shadow-sm transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Tidak ada data yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-sm text-slate-500 text-right">
          Menampilkan {filteredData.length} dari {data.length} santri
        </div>
      </div>

      {/* Modal Edit / Tambah */}
      <AnimatePresence>
        {isModalOpen && editingSiswa && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800">
                  {data.some(s => s.id === editingSiswa.id) ? 'Edit Data Santri' : 'Tambah Santri Baru'}
                </h2>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-700 bg-white border border-slate-200 p-1 rounded-md">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <form id="siswa-form" onSubmit={handleSave} className="space-y-8">
                  {/* Info Dasar */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                      <input 
                        required
                        type="text" 
                        value={editingSiswa.nama}
                        onChange={e => setEditingSiswa({...editingSiswa, nama: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">NIS</label>
                      <input 
                        required
                        type="text" 
                        value={editingSiswa.nis}
                        onChange={e => setEditingSiswa({...editingSiswa, nis: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Kelas</label>
                      <select
                        value={editingSiswa.kelas}
                        onChange={e => setEditingSiswa({...editingSiswa, kelas: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                      >
                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Status Akademik</label>
                      <select
                        value={editingSiswa.statusKeterangan}
                        onChange={e => setEditingSiswa({...editingSiswa, statusKeterangan: e.target.value as any})}
                        className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                      >
                        <option value="LULUS">LULUS</option>
                        <option value="TIDAK LULUS">TIDAK LULUS</option>
                        <option value="NAIK KELAS">NAIK KELAS</option>
                        <option value="TINGGAL KELAS">TINGGAL KELAS</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Catatan Wali Kelas</label>
                      <textarea
                        rows={2}
                        value={editingSiswa.catatan}
                        onChange={e => setEditingSiswa({...editingSiswa, catatan: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Input Nilai */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Input Nilai Mata Pelajaran</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {SUBJECT_KEYS.map((key) => (
                        <div key={key} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                          <h4 className="font-semibold text-slate-800 mb-3">{SUBJECT_LABELS[key]}</h4>
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-slate-500 mb-1">Nilai Rapot</label>
                              <input 
                                type="number"
                                min="0" max="100"
                                value={editingSiswa.nilai[key].rapot}
                                onChange={e => handleNilaiChange(key, 'rapot', e.target.value)}
                                className="w-full border border-slate-300 rounded-md p-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-slate-500 mb-1">Nilai Ujian</label>
                              <input 
                                type="number"
                                min="0" max="100"
                                value={editingSiswa.nilai[key].ujian}
                                onChange={e => handleNilaiChange(key, 'ujian', e.target.value)}
                                className="w-full border border-slate-300 rounded-md p-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  form="siswa-form"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Simpan Data
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
