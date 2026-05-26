export interface NilaiPelajaran {
  rapot: number;
  ujian: number;
}

export interface NilaiMDTU {
  bahasaArab: NilaiPelajaran;
  tarikh: NilaiPelajaran;
  alquran: NilaiPelajaran;
  hadist: NilaiPelajaran;
  fiqih: NilaiPelajaran;
  aqidah: NilaiPelajaran;
  akhlak: NilaiPelajaran;
}

export interface Siswa {
  id: string;
  nis: string;
  nama: string;
  kelas: string;
  nilai: NilaiMDTU;
  statusKeterangan: 'LULUS' | 'TIDAK LULUS' | 'NAIK KELAS' | 'TINGGAL KELAS';
  catatan: string;
}

export interface ProfilLembaga {
  nama: string;
  nsdt: string;
  alamat: string;
  kepala: string;
  nip: string;
  tempatDitetapkan: string;
  titimangsa: string;
}

export type ViewState = 'dashboard' | 'data-siswa' | 'cetak-skl' | 'pengaturan';

export const SUBJECT_LABELS: Record<keyof NilaiMDTU, string> = {
  bahasaArab: 'Bahasa Arab',
  tarikh: 'Tarikh',
  alquran: "Al-Qur'an",
  hadist: 'Hadist',
  fiqih: 'Fiqih',
  aqidah: 'Aqidah',
  akhlak: 'Akhlak',
};

export const SUBJECT_KEYS: (keyof NilaiMDTU)[] = [
  'bahasaArab',
  'tarikh',
  'alquran',
  'hadist',
  'fiqih',
  'aqidah',
  'akhlak',
];

export const calculateNilaiAkhir = (nilai: NilaiMDTU): number => {
  const subjects = SUBJECT_KEYS.map(key => nilai[key]);
  let total = 0;
  subjects.forEach(sub => {
    total += Number(sub.rapot) + Number(sub.ujian);
  });
  return Number((total / (subjects.length * 2)).toFixed(2));
};
