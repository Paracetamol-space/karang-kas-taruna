import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockData } from '@/data/mockData';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Users, 
  Calendar, 
  CheckCircle, 
  Check, 
  X,
  MapPin,
  Clock,
  Activity as ActivityIcon
} from 'lucide-react';

export const GuestDashboard = () => {
  const { income, expenses, memberCash, activities, meetings, settings } = mockData;

  // Calculate totals
  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;
  const totalMemberCash = memberCash.reduce((sum, member) => sum + member.totalCash, 0);

  // Get meeting dates
  const meetingDates = Object.keys(memberCash[0]?.meetings || {}).sort();
  const latestMeetingDate = meetingDates[meetingDates.length - 1];
  const membersAttended = memberCash.filter(member => 
    latestMeetingDate && member.meetings[latestMeetingDate]
  ).length;

  // Get next meeting
  const nextMeeting = meetings.find(meeting => new Date(meeting.date) > new Date());

  const stats = [
    {
      title: 'Saldo Kas Total',
      value: `Rp ${balance.toLocaleString('id-ID')}`,
      icon: Wallet,
      color: balance >= 0 ? 'text-success' : 'text-destructive',
      bgColor: balance >= 0 ? 'bg-success/10' : 'bg-destructive/10'
    },
    {
      title: 'Total Pemasukan',
      value: `Rp ${totalIncome.toLocaleString('id-ID')}`,
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Total Pengeluaran',
      value: `Rp ${totalExpenses.toLocaleString('id-ID')}`,
      icon: TrendingDown,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Kas Anggota Terkumpul',
      value: `Rp ${totalMemberCash.toLocaleString('id-ID')}`,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'ongoing':
        return 'bg-warning/10 text-warning';
      case 'planned':
        return 'bg-accent/10 text-accent';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'ongoing':
        return 'Berlangsung';
      case 'planned':
        return 'Direncanakan';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  const formatMeetingDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: '2-digit', 
      month: '2-digit',
      year: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-accent to-primary/80 text-primary-foreground rounded-2xl p-8 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">{settings.organizationName}</h1>
          <p className="text-lg opacity-90">Sistem Informasi Manajemen Kas & Kegiatan</p>
        </div>
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Meeting Stats */}
        <Card className="border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Statistik Rapat Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent>
            {latestMeetingDate ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Rapat tanggal {new Date(latestMeetingDate).toLocaleDateString('id-ID')}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="text-3xl font-bold text-success">
                      {membersAttended}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      dari {memberCash.length} anggota sudah bayar kas
                    </div>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-success to-success/80 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${(membersAttended / memberCash.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {((membersAttended / memberCash.length) * 100).toFixed(0)}% tingkat kehadiran
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">Belum ada data rapat</p>
            )}
          </CardContent>
        </Card>

        {/* Next Meeting */}
        <Card className="border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Rapat Berikutnya
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nextMeeting ? (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <p className="font-semibold text-lg">
                    {new Date(nextMeeting.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pukul {nextMeeting.time} WIB
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{nextMeeting.place}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Agenda:</p>
                    <p className="text-sm text-muted-foreground">{nextMeeting.agenda}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Belum ada jadwal rapat</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Income & Expenses */}
        <Card className="border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle>Laporan Keuangan Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-success mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Pemasukan Terbaru
              </h4>
              <div className="space-y-2">
                {income.slice(-3).map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                    <div>
                      <p className="font-medium text-sm">{item.source}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <p className="font-semibold text-success">
                      +Rp {item.amount.toLocaleString('id-ID')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-warning mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Pengeluaran Terbaru
              </h4>
              <div className="space-y-2">
                {expenses.slice(-3).map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                    <div>
                      <p className="font-medium text-sm">{item.purpose}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <p className="font-semibold text-warning">
                      -Rp {item.amount.toLocaleString('id-ID')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities */}
        <Card className="border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ActivityIcon className="h-5 w-5 text-primary" />
              Kegiatan & Jadwal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Kegiatan Terbaru</h4>
                <div className="space-y-3">
                  {activities.slice(-2).map((activity) => (
                    <div key={activity.id} className="p-3 bg-gradient-to-r from-muted/50 to-muted/20 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium">{activity.name}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {getStatusText(activity.status)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(activity.date).toLocaleDateString('id-ID')}
                        <MapPin className="w-3 h-3 ml-3 mr-1" />
                        {activity.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Jadwal Rapat Mendatang</h4>
                <div className="space-y-2">
                  {meetings.slice(0, 2).map((meeting) => (
                    <div key={meeting.id} className="p-3 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
                      <div className="flex items-center text-sm mb-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(meeting.date).toLocaleDateString('id-ID')}
                        <Clock className="w-3 h-3 ml-3 mr-1" />
                        {meeting.time} WIB
                      </div>
                      <p className="text-xs text-muted-foreground">{meeting.agenda}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Cash Table */}
      <Card className="border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle>Tabel Kas Anggota per Rapat</CardTitle>
          <p className="text-sm text-muted-foreground">
            Status pembayaran kas iuran anggota (Rp {settings.feePerMeeting.toLocaleString('id-ID')}/rapat)
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="sticky left-0 bg-background min-w-[160px] font-semibold">
                    Nama Anggota
                  </TableHead>
                  <TableHead className="text-right min-w-[120px] font-semibold">
                    Total Kas
                  </TableHead>
                  {meetingDates.slice(-6).map((date) => (
                    <TableHead key={date} className="text-center min-w-[80px]">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-semibold">{formatMeetingDate(date)}</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {memberCash.filter(member => member.meetings[date]).length}/{memberCash.length}
                        </span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberCash.map((member) => (
                  <TableRow key={member.id} className="hover:bg-muted/50">
                    <TableCell className="sticky left-0 bg-background font-medium">
                      {member.name}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-success">
                      Rp {member.totalCash.toLocaleString('id-ID')}
                    </TableCell>
                    {meetingDates.slice(-6).map((date) => (
                      <TableCell key={date} className="text-center">
                        <div className="flex justify-center">
                          {member.meetings[date] ? (
                            <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                              <Check className="w-4 h-4 text-success" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                              <X className="w-4 h-4 text-destructive" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            * Menampilkan 6 rapat terakhir. Total anggota: {memberCash.length} orang
          </div>
        </CardContent>
      </Card>
    </div>
  );
};