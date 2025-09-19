import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockData } from '@/data/mockData';
import { Plus, Calendar, MapPin, Clock, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ActivitiesPage = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [activities] = useState(mockData.activities);
  const [meetings] = useState(mockData.meetings);

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Berhasil!",
      description: "Kegiatan berhasil ditambahkan",
    });
  };

  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Berhasil!",
      description: "Jadwal rapat berhasil ditambahkan",
    });
  };

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

  const AddActivityForm = () => (
    <form onSubmit={handleAddActivity} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="activity-date">Tanggal</Label>
        <Input id="activity-date" type="date" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="activity-name">Nama Kegiatan</Label>
        <Input id="activity-name" placeholder="Nama kegiatan" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="activity-location">Lokasi</Label>
        <Input id="activity-location" placeholder="Lokasi kegiatan" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="activity-status">Status</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="planned">Direncanakan</SelectItem>
            <SelectItem value="ongoing">Berlangsung</SelectItem>
            <SelectItem value="completed">Selesai</SelectItem>
            <SelectItem value="cancelled">Dibatalkan</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">Tambah Kegiatan</Button>
    </form>
  );

  const AddMeetingForm = () => (
    <form onSubmit={handleAddMeeting} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="meeting-date">Tanggal</Label>
        <Input id="meeting-date" type="date" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="meeting-time">Jam</Label>
        <Input id="meeting-time" type="time" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="meeting-place">Tempat</Label>
        <Input id="meeting-place" placeholder="Tempat rapat" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="meeting-agenda">Agenda</Label>
        <Input id="meeting-agenda" placeholder="Agenda rapat" required />
      </div>
      <Button type="submit" className="w-full">Tambah Jadwal Rapat</Button>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kegiatan & Jadwal</h1>
          <p className="text-muted-foreground">Kelola kegiatan dan jadwal rapat Karang Taruna</p>
        </div>
      </div>

      <Tabs defaultValue="activities" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="activities">Kegiatan</TabsTrigger>
            <TabsTrigger value="meetings">Jadwal Rapat</TabsTrigger>
          </TabsList>
          
          {isAdmin && (
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Kegiatan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Kegiatan Baru</DialogTitle>
                  </DialogHeader>
                  <AddActivityForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Rapat
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Jadwal Rapat</DialogTitle>
                  </DialogHeader>
                  <AddMeetingForm />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        <TabsContent value="activities">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{activity.name}</CardTitle>
                    {isAdmin && (
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {getStatusText(activity.status)}
                  </span>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(activity.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {activity.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="meetings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meetings.map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">
                      Rapat {new Date(meeting.date).toLocaleDateString('id-ID')}
                    </CardTitle>
                    {isAdmin && (
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(meeting.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {meeting.time} WIB
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {meeting.place}
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium mb-2">Agenda:</p>
                    <p className="text-sm text-muted-foreground">{meeting.agenda}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};