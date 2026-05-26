import React, { useState, useRef } from 'react';
import { Siswa, calculateNilaiAkhir, SUBJECT_KEYS, SUBJECT_LABELS, ProfilLembaga } from '../types';
import { useReactToPrint } from 'react-to-print';
import { motion } from 'motion/react';
import { Printer, FileBadge, Search } from 'lucide-react';

interface CetakSKLProps {
  data: Siswa[];
  lembaga: ProfilLembaga;
}

export default function CetakSKL({ data, lembaga }: CetakSKLProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: 'Dokumen_Nilai_MDTU',
  });

  const selectedSiswa = data.find(s => s.id === selectedStudentId);

  const filteredData = data.filter(s => 
    s.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.nis.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 flex flex-col md:flex-row gap-8">
      {/* Kolom Kiri: Pilihan Santri */}
      <div className="w-full md:w-1/3 flex flex-col space-y-4">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">Cetak SKL / Rapot</h1>
          <p className="text-slate-500 mt-1 mb-4">Pilih santri untuk mencetak dokumen nilai.</p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Cari santri..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
          
          <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
            {filteredData.map(siswa => (
              <button
                key={siswa.id}
                onClick={() => setSelectedStudentId(siswa.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedStudentId === siswa.id 
                    ? 'border-blue-500 bg-blue-50 text-blue-900' 
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-medium">{siswa.nama}</div>
                <div className="text-xs text-slate-500 font-mono mt-1">NIS: {siswa.nis} • {siswa.kelas}</div>
              </button>
            ))}
            {filteredData.length === 0 && (
              <div className="text-center text-sm text-slate-500 py-4">Tidak ada data santri.</div>
            )}
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Preview & Cetak */}
      <div className="w-full md:w-2/3 flex flex-col">
        {selectedSiswa ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Preview Surat</h2>
              <button
                onClick={() => handlePrint()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 shadow-sm"
              >
                <Printer size={18} />
                <span>Cetak / Unduh PDF</span>
              </button>
            </div>
            
            {/* Area Print */}
            <div className="bg-slate-200 p-8 rounded-2xl shadow-sm border border-slate-100 flex justify-center overflow-x-auto min-h-[600px]">
              <div 
                ref={contentRef} 
                className="bg-white w-[210mm] min-h-[297mm] p-[20mm] shadow-md text-black print:p-[10mm] print:shadow-none font-serif"
              >
                {/* Kop Surat */}
                <div className="border-b-4 border-black pb-4 mb-8 text-center flex flex-col justify-center items-center relative">
                  <h1 className="text-2xl font-bold uppercase tracking-wider">{lembaga.nama}</h1>
                  <p className="text-lg font-medium mt-1 tracking-wide">NSDT: {lembaga.nsdt}</p>
                  <p className="text-sm mt-1">{lembaga.alamat}</p>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-xl font-bold underline uppercase">DAFTAR NILAI DAN KETERANGAN AKADEMIK</h2>
                  <p className="mt-1">Tahun Ajaran 2025/2026</p>
                </div>

                <div className="mb-6">
                  <table className="w-full mb-6 text-base">
                    <tbody>
                      <tr>
                        <td className="w-1/3 py-1.5 font-medium">Nama Lengkap</td>
                        <td className="w-4 py-1.5">:</td>
                        <td className="font-bold py-1.5">{selectedSiswa.nama}</td>
                      </tr>
                      <tr>
                        <td className="w-1/3 py-1.5 font-medium">Nomor Induk Santri (NIS)</td>
                        <td className="w-4 py-1.5">:</td>
                        <td className="py-1.5">{selectedSiswa.nis}</td>
                      </tr>
                      <tr>
                        <td className="w-1/3 py-1.5 font-medium">Kelas</td>
                        <td className="w-4 py-1.5">:</td>
                        <td className="py-1.5">{selectedSiswa.kelas}</td>
                      </tr>
                    </tbody>
                  </table>

                  <h3 className="font-bold mb-3 uppercase text-sm bg-gray-200 px-2 py-1">Hasil Evaluasi Pembelajaran</h3>
                  <table className="w-full border-collapse border border-black mb-6 text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-black p-2 text-center w-12">No</th>
                        <th className="border border-black p-2 text-left">Mata Pelajaran</th>
                        <th className="border border-black p-2 text-center w-24">Nilai Rapot</th>
                        <th className="border border-black p-2 text-center w-24">Nilai Ujian</th>
                        <th className="border border-black p-2 text-center w-24">Rata-rata</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SUBJECT_KEYS.map((key, index) => {
                        const nilai = selectedSiswa.nilai[key];
                        const rataMapel = ((nilai.rapot + nilai.ujian) / 2).toFixed(1);
                        return (
                          <tr key={key}>
                            <td className="border border-black p-2 text-center">{index + 1}</td>
                            <td className="border border-black p-2 font-medium">{SUBJECT_LABELS[key]}</td>
                            <td className="border border-black p-2 text-center">{nilai.rapot}</td>
                            <td className="border border-black p-2 text-center">{nilai.ujian}</td>
                            <td className="border border-black p-2 text-center font-semibold bg-gray-50">{rataMapel}</td>
                          </tr>
                        );
                      })}
                      <tr className="bg-gray-200 font-bold">
                        <td colSpan={2} className="border border-black p-2 text-right uppercase">Nilai Akhir Rata-rata</td>
                        <td colSpan={3} className="border border-black p-2 text-center text-lg">{calculateNilaiAkhir(selectedSiswa.nilai)}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mb-6 p-4 border-2 border-black rounded-lg">
                    <p className="font-bold mb-2">Keputusan / Status Akademik:</p>
                    <div className="flex items-center space-x-4">
                      <div className={`px-4 py-2 border-2 font-bold uppercase tracking-widest ${
                        selectedSiswa.statusKeterangan.includes('LULUS') || selectedSiswa.statusKeterangan.includes('NAIK')
                          ? 'border-black text-black bg-gray-100' 
                          : 'border-black text-black'
                      }`}>
                        {selectedSiswa.statusKeterangan}
                      </div>
                    </div>
                  </div>

                  <p className="mb-2"><span className="font-semibold underline">Catatan Wali Kelas:</span> {selectedSiswa.catatan}</p>
                </div>

                <div className="mt-12 flex justify-end">
                  <div className="text-center">
                    <p className="mb-16">
                      {lembaga.tempatDitetapkan}, {lembaga.titimangsa}<br/>
                      Kepala Lembaga,
                    </p>
                    <p className="font-bold underline">{lembaga.kepala}</p>
                    {lembaga.nip && <p>NIP. {lembaga.nip}</p>}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 border border-slate-100 rounded-2xl border-dashed">
            <FileBadge size={64} className="mb-4 text-slate-300" />
            <p className="text-lg font-medium">Pilih santri terlebih dahulu</p>
            <p className="text-sm">Preview dokumen akan muncul di sini</p>
          </div>
        )}
      </div>
    </div>
  );
}
