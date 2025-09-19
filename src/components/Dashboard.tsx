import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockData } from '@/data/mockData';
import { TrendingUp, TrendingDown, Wallet, Users, Calendar, CheckCircle } from 'lucide-react';

export const Dashboard = () => {
  const { income, expenses, memberCash, activities, meetings, settings } = mockData;

  // Calculate totals
  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;
  const totalMemberCash = memberCash.reduce((sum, member) => sum + member.totalCash, 0);

  // Get latest meeting stats
  const latestMeetingDate = Object.keys(memberCash[0]?.meetings || {}).sort().pop();
  const membersAttended = memberCash.filter(member => 
    latestMeetingDate && member.meetings[latestMeetingDate]
  ).length;

  // Get next meeting
  const nextMeeting = meetings.find(meeting => new Date(meeting.date) > new Date());

  const stats = [
    {
      title: 'Saldo Kas',
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan data Karang Taruna</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meeting Attendance */}
        <Card>
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
                    <div className="text-2xl font-bold text-success">
                      {membersAttended}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      dari {memberCash.length} anggota sudah bayar kas
                    </div>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full" 
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Rapat Berikutnya
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nextMeeting ? (
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">
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
                <div>
                  <p className="text-sm font-medium">Tempat:</p>
                  <p className="text-sm text-muted-foreground">{nextMeeting.place}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Agenda:</p>
                  <p className="text-sm text-muted-foreground">{nextMeeting.agenda}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Belum ada jadwal rapat</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Kegiatan Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.slice(-3).map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                <div>
                  <p className="font-medium">{activity.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(activity.date).toLocaleDateString('id-ID')} • {activity.location}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'completed' 
                    ? 'bg-success/10 text-success' 
                    : activity.status === 'planned'
                    ? 'bg-accent/10 text-accent'
                    : 'bg-warning/10 text-warning'
                }`}>
                  {activity.status === 'completed' && 'Selesai'}
                  {activity.status === 'planned' && 'Direncanakan'}
                  {activity.status === 'ongoing' && 'Berlangsung'}
                  {activity.status === 'cancelled' && 'Dibatalkan'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};