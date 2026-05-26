import React from 'react';
import { Siswa, calculateNilaiAkhir } from '../types';
import { motion } from 'motion/react';
import { Users, GraduationCap, TrendingUp, Award } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

interface DashboardProps {
  data: Siswa[];
}

export default function Dashboard({ data }: DashboardProps) {
  const totalSiswa = data.length;
  const lulus = data.filter(s => s.statusKeterangan === 'LULUS').length;
  const tidakLulus = totalSiswa - lulus;
  
  const rataRataNilai = totalSiswa > 0 
    ? (data.reduce((acc, s) => acc + calculateNilaiAkhir(s.nilai), 0) / totalSiswa).toFixed(2) 
    : 0;

  const nilaiTertinggi = totalSiswa > 0 
    ? Math.max(...data.map(s => calculateNilaiAkhir(s.nilai))) 
    : 0;

  const pieData = [
    { name: 'Lulus', value: lulus },
    { name: 'Tidak Lulus', value: tidakLulus },
  ];
  const COLORS = ['#22c55e', '#ef4444'];

  // Data ringkasan kelas
  const kelasMap = data.reduce((acc, curr) => {
    if (!acc[curr.kelas]) acc[curr.kelas] = { kelas: curr.kelas, Lulus: 0, TidakLulus: 0 };
    if (curr.statusKeterangan === 'LULUS') acc[curr.kelas].Lulus += 1;
    else acc[curr.kelas].TidakLulus += 1;
    return acc;
  }, {} as Record<string, any>);
  const barData = Object.values(kelasMap);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Akademik</h1>
        <p className="text-slate-500 mt-1">Ringkasan performa dan nilai santri tahun ajaran berjalan.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Santri" value={totalSiswa} icon={Users} color="bg-blue-500" delay={0.1} />
        <StatCard title="Total Lulus" value={lulus} icon={GraduationCap} color="bg-green-500" delay={0.2} />
        <StatCard title="Rata-rata Nilai" value={rataRataNilai} icon={TrendingUp} color="bg-indigo-500" delay={0.3} />
        <StatCard title="Nilai Tertinggi" value={nilaiTertinggi} icon={Award} color="bg-amber-500" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Persentase Kelulusan</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Distribusi Santri Per Kelas</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="kelas" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F1F5F9' }} />
                <Legend />
                <Bar dataKey="Lulus" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
                <Bar dataKey="TidakLulus" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4"
    >
      <div className={`p-4 rounded-xl ${color} text-white`}>
        <Icon size={24} />
      </div>
      <div>
        <h4 className="text-slate-500 text-sm font-medium">{title}</h4>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
    </motion.div>
  );
}
