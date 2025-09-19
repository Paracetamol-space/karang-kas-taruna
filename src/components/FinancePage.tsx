import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockData } from '@/data/mockData';
import { Plus, TrendingUp, TrendingDown, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const FinancePage = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [income] = useState(mockData.income);
  const [expenses] = useState(mockData.expenses);

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Berhasil!",
      description: "Data pemasukan berhasil ditambahkan",
    });
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Berhasil!",
      description: "Data pengeluaran berhasil ditambahkan",
    });
  };

  const AddIncomeForm = () => (
    <form onSubmit={handleAddIncome} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="income-date">Tanggal</Label>
        <Input id="income-date" type="date" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="income-source">Sumber</Label>
        <Input id="income-source" placeholder="Kas anggota, donasi, dll" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="income-amount">Nominal</Label>
        <Input id="income-amount" type="number" placeholder="0" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="income-notes">Keterangan</Label>
        <Textarea id="income-notes" placeholder="Keterangan tambahan" />
      </div>
      <Button type="submit" className="w-full">Tambah Pemasukan</Button>
    </form>
  );

  const AddExpenseForm = () => (
    <form onSubmit={handleAddExpense} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="expense-date">Tanggal</Label>
        <Input id="expense-date" type="date" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expense-purpose">Keperluan</Label>
        <Input id="expense-purpose" placeholder="Konsumsi, dekorasi, dll" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expense-amount">Nominal</Label>
        <Input id="expense-amount" type="number" placeholder="0" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expense-notes">Keterangan</Label>
        <Textarea id="expense-notes" placeholder="Keterangan tambahan" />
      </div>
      <Button type="submit" className="w-full">Tambah Pengeluaran</Button>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Laporan Keuangan</h1>
          <p className="text-muted-foreground">Pemasukan dan pengeluaran Karang Taruna</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pemasukan
            </CardTitle>
            <div className="p-2 rounded-lg bg-success/10">
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              Rp {totalIncome.toLocaleString('id-ID')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pengeluaran
            </CardTitle>
            <div className="p-2 rounded-lg bg-warning/10">
              <TrendingDown className="h-4 w-4 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              Rp {totalExpenses.toLocaleString('id-ID')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              totalIncome - totalExpenses >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              Rp {(totalIncome - totalExpenses).toLocaleString('id-ID')}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="income" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="income">Pemasukan</TabsTrigger>
            <TabsTrigger value="expenses">Pengeluaran</TabsTrigger>
          </TabsList>
          
          {isAdmin && (
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Pemasukan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Pemasukan</DialogTitle>
                  </DialogHeader>
                  <AddIncomeForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Pengeluaran
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Pengeluaran</DialogTitle>
                  </DialogHeader>
                  <AddExpenseForm />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Data Pemasukan</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Sumber</TableHead>
                    <TableHead className="text-right">Nominal</TableHead>
                    <TableHead>Keterangan</TableHead>
                    {isAdmin && <TableHead>Aksi</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {income.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {new Date(item.date).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell className="font-medium">{item.source}</TableCell>
                      <TableCell className="text-right text-success font-semibold">
                        Rp {item.amount.toLocaleString('id-ID')}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.notes}</TableCell>
                      {isAdmin && (
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Data Pengeluaran</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Keperluan</TableHead>
                    <TableHead className="text-right">Nominal</TableHead>
                    <TableHead>Keterangan</TableHead>
                    {isAdmin && <TableHead>Aksi</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {new Date(item.date).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell className="font-medium">{item.purpose}</TableCell>
                      <TableCell className="text-right text-warning font-semibold">
                        Rp {item.amount.toLocaleString('id-ID')}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.notes}</TableCell>
                      {isAdmin && (
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};