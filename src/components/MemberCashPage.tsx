import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { mockData } from '@/data/mockData';
import { Check, X, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MemberCashPage = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [memberCash, setMemberCash] = useState(mockData.memberCash);
  const { settings } = mockData;

  // Get unique meeting dates and sort them
  const meetingDates = Object.keys(memberCash[0]?.meetings || {}).sort();

  const handleTogglePayment = (memberId: string, meetingDate: string) => {
    if (!isAdmin) return;

    setMemberCash(prev => prev.map(member => {
      if (member.id === memberId) {
        const newMeetings = { ...member.meetings };
        newMeetings[meetingDate] = !newMeetings[meetingDate];
        
        // Recalculate total cash
        const paidCount = Object.values(newMeetings).filter(Boolean).length;
        const newTotalCash = paidCount * settings.feePerMeeting;

        return {
          ...member,
          meetings: newMeetings,
          totalCash: newTotalCash
        };
      }
      return member;
    }));

    toast({
      title: "Berhasil!",
      description: "Status pembayaran kas berhasil diupdate",
    });
  };

  const getTotalPaidForMeeting = (meetingDate: string) => {
    return memberCash.filter(member => member.meetings[meetingDate]).length;
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kas Anggota</h1>
          <p className="text-muted-foreground">
            Tabel absensi pembayaran kas per rapat (Rp {settings.feePerMeeting.toLocaleString('id-ID')}/rapat)
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Anggota
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {memberCash.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Kas Terkumpul
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              Rp {memberCash.reduce((sum, member) => sum + member.totalCash, 0).toLocaleString('id-ID')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rata-rata per Anggota
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {Math.round(memberCash.reduce((sum, member) => sum + member.totalCash, 0) / memberCash.length).toLocaleString('id-ID')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Cash Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tabel Kas Anggota per Rapat</CardTitle>
          <p className="text-sm text-muted-foreground">
            {isAdmin ? 'Klik checkbox untuk mengubah status pembayaran' : 'Tabel menampilkan status pembayaran kas'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-background min-w-[160px]">
                    Nama Anggota
                  </TableHead>
                  <TableHead className="text-right min-w-[120px]">
                    Total Kas
                  </TableHead>
                  {meetingDates.map((date) => (
                    <TableHead key={date} className="text-center min-w-[80px]">
                      <div className="flex flex-col items-center">
                        <span className="text-xs">{formatMeetingDate(date)}</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {getTotalPaidForMeeting(date)}/{memberCash.length}
                        </span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberCash.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="sticky left-0 bg-background font-medium">
                      {member.name}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-success">
                      Rp {member.totalCash.toLocaleString('id-ID')}
                    </TableCell>
                    {meetingDates.map((date) => (
                      <TableCell key={date} className="text-center">
                        {isAdmin ? (
                          <Checkbox
                            checked={member.meetings[date] || false}
                            onCheckedChange={() => handleTogglePayment(member.id, date)}
                            className="mx-auto"
                          />
                        ) : (
                          <div className="flex justify-center">
                            {member.meetings[date] ? (
                              <Check className="w-5 h-5 text-success" />
                            ) : (
                              <X className="w-5 h-5 text-destructive" />
                            )}
                          </div>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Meeting Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan per Rapat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meetingDates.map((date) => {
              const paidCount = getTotalPaidForMeeting(date);
              const percentage = (paidCount / memberCash.length) * 100;
              
              return (
                <div key={date} className="p-4 border rounded-lg">
                  <div className="font-medium">
                    {new Date(date).toLocaleDateString('id-ID', { 
                      weekday: 'short',
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </div>
                  <div className="text-2xl font-bold text-primary mt-1">
                    {paidCount}/{memberCash.length}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};