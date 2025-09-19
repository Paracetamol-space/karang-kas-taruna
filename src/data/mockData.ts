import { KarangTarunaData } from '@/types/karangTaruna';

export const mockData: KarangTarunaData = {
  settings: {
    feePerMeeting: 10000,
    organizationName: 'Karang Taruna Maju Bersama'
  },
  income: [
    {
      id: '1',
      date: '2024-01-15',
      source: 'Kas Anggota Januari',
      amount: 500000,
      notes: 'Iuran rutin anggota'
    },
    {
      id: '2',
      date: '2024-01-20',
      source: 'Donasi Kegiatan 17an',
      amount: 2000000,
      notes: 'Dari warga RT 05'
    },
    {
      id: '3',
      date: '2024-02-01',
      source: 'Kas Anggota Februari',
      amount: 480000,
      notes: 'Iuran rutin anggota'
    }
  ],
  expenses: [
    {
      id: '1',
      date: '2024-01-18',
      purpose: 'Konsumsi Rapat',
      amount: 150000,
      notes: 'Snack dan air mineral'
    },
    {
      id: '2',
      date: '2024-01-25',
      purpose: 'Dekorasi 17an',
      amount: 800000,
      notes: 'Bendera, spanduk, dll'
    },
    {
      id: '3',
      date: '2024-02-05',
      purpose: 'ATK Sekretariat',
      amount: 200000,
      notes: 'Kertas, pulpen, map'
    }
  ],
  memberCash: [
    {
      id: '1',
      name: 'Andi Pratama',
      totalCash: 40000,
      meetings: {
        '2024-01-07': true,
        '2024-01-14': true,
        '2024-01-21': true,
        '2024-01-28': true,
        '2024-02-04': false,
        '2024-02-11': false
      }
    },
    {
      id: '2',
      name: 'Siti Rahayu',
      totalCash: 50000,
      meetings: {
        '2024-01-07': true,
        '2024-01-14': true,
        '2024-01-21': true,
        '2024-01-28': true,
        '2024-02-04': true,
        '2024-02-11': false
      }
    },
    {
      id: '3',
      name: 'Budi Santoso',
      totalCash: 30000,
      meetings: {
        '2024-01-07': true,
        '2024-01-14': false,
        '2024-01-21': true,
        '2024-01-28': true,
        '2024-02-04': false,
        '2024-02-11': false
      }
    },
    {
      id: '4',
      name: 'Dewi Kusuma',
      totalCash: 60000,
      meetings: {
        '2024-01-07': true,
        '2024-01-14': true,
        '2024-01-21': true,
        '2024-01-28': true,
        '2024-02-04': true,
        '2024-02-11': true
      }
    },
    {
      id: '5',
      name: 'Rudi Hermawan',
      totalCash: 20000,
      meetings: {
        '2024-01-07': false,
        '2024-01-14': true,
        '2024-01-21': false,
        '2024-01-28': true,
        '2024-02-04': false,
        '2024-02-11': false
      }
    }
  ],
  activities: [
    {
      id: '1',
      date: '2024-01-17',
      name: 'Peringatan HUT RI',
      location: 'Lapangan RT 05',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-02-14',
      name: 'Bakti Sosial',
      location: 'Panti Asuhan Harapan',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-03-15',
      name: 'Gotong Royong Lingkungan',
      location: 'Seluruh RT 05',
      status: 'planned'
    }
  ],
  meetings: [
    {
      id: '1',
      date: '2024-02-18',
      time: '19:00',
      place: 'Balai RT 05',
      agenda: 'Evaluasi kegiatan dan perencanaan Maret'
    },
    {
      id: '2',
      date: '2024-02-25',
      time: '19:00',
      place: 'Balai RT 05',
      agenda: 'Persiapan gotong royong lingkungan'
    },
    {
      id: '3',
      date: '2024-03-04',
      time: '19:00',
      place: 'Balai RT 05',
      agenda: 'Koordinasi dengan RT/RW untuk kegiatan'
    }
  ]
};