import { Siswa } from './types';

export const mockDataSiswa: Siswa[] = [
  { 
    id: '1', nis: '2026001', nama: 'Ahmad Fauzi', kelas: 'Kelas 4',
    statusKeterangan: 'LULUS', catatan: 'Mempertahankan prestasi akademik yang baik.',
    nilai: {
      bahasaArab: { rapot: 80, ujian: 85 },
      tarikh: { rapot: 82, ujian: 80 },
      alquran: { rapot: 90, ujian: 88 },
      hadist: { rapot: 85, ujian: 86 },
      fiqih: { rapot: 84, ujian: 88 },
      aqidah: { rapot: 88, ujian: 90 },
      akhlak: { rapot: 90, ujian: 95 }
    }
  },
  { 
    id: '2', nis: '2026002', nama: 'Budi Santoso', kelas: 'Kelas 3',
    statusKeterangan: 'NAIK KELAS', catatan: 'Tingkatkan lagi belajarnya.',
    nilai: {
      bahasaArab: { rapot: 70, ujian: 65 },
      tarikh: { rapot: 72, ujian: 70 },
      alquran: { rapot: 80, ujian: 75 },
      hadist: { rapot: 75, ujian: 76 },
      fiqih: { rapot: 74, ujian: 70 },
      aqidah: { rapot: 78, ujian: 80 },
      akhlak: { rapot: 80, ujian: 85 }
    }
  },
  { 
    id: '3', nis: '2026003', nama: 'Citra Kirana', kelas: 'Kelas 4',
    statusKeterangan: 'LULUS', catatan: 'Sangat baik, pertahankan!',
    nilai: {
      bahasaArab: { rapot: 90, ujian: 92 },
      tarikh: { rapot: 92, ujian: 90 },
      alquran: { rapot: 95, ujian: 94 },
      hadist: { rapot: 90, ujian: 92 },
      fiqih: { rapot: 94, ujian: 96 },
      aqidah: { rapot: 96, ujian: 95 },
      akhlak: { rapot: 98, ujian: 97 }
    }
  },
  { 
    id: '4', nis: '2026004', nama: 'Dedi Irawan', kelas: 'Kelas 2',
    statusKeterangan: 'TINGGAL KELAS', catatan: 'Perlu bimbingan dan remidial tambahan.',
    nilai: {
      bahasaArab: { rapot: 60, ujian: 55 },
      tarikh: { rapot: 58, ujian: 60 },
      alquran: { rapot: 65, ujian: 60 },
      hadist: { rapot: 60, ujian: 58 },
      fiqih: { rapot: 62, ujian: 55 },
      aqidah: { rapot: 60, ujian: 62 },
      akhlak: { rapot: 70, ujian: 65 }
    }
  },
  { 
    id: '5', nis: '2026005', nama: 'Eka Putri', kelas: 'Kelas 1',
    statusKeterangan: 'NAIK KELAS', catatan: 'Aktif di kelas dan nilai sangat baik.',
    nilai: {
      bahasaArab: { rapot: 85, ujian: 90 },
      tarikh: { rapot: 88, ujian: 85 },
      alquran: { rapot: 92, ujian: 90 },
      hadist: { rapot: 88, ujian: 92 },
      fiqih: { rapot: 85, ujian: 88 },
      aqidah: { rapot: 90, ujian: 92 },
      akhlak: { rapot: 90, ujian: 95 }
    }
  }
];
