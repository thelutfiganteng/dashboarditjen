import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { ScheduleItem, ScheduleItemWithoutId } from '@/types';
import { saveScheduleItem, deleteScheduleItem } from '@/utils/localStorage';

interface ScheduleTableProps {
  data: ScheduleItem[];
  onDataChange: () => void;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ data, onDataChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ScheduleItem | null>(null);
  const [formData, setFormData] = useState<ScheduleItemWithoutId>({
    tim: '',
    kegiatan: '',
    rencanaPelaksanaan: new Date().toISOString().slice(0, 16), // Use datetime-local format
    realisasiMulai: '',
    realisasiSelesai: '',
    status: 'belum-mulai'
  });

  const openDialog = (item?: ScheduleItem) => {
    if (item) {
      setCurrentItem(item);
      setFormData({
        tim: item.tim,
        kegiatan: item.kegiatan,
        rencanaPelaksanaan: item.rencanaPelaksanaan,
        realisasiMulai: item.realisasiMulai,
        realisasiSelesai: item.realisasiSelesai,
        status: item.status
      });
    } else {
      setCurrentItem(null);
      setFormData({
        tim: '',
        kegiatan: '',
        rencanaPelaksanaan: new Date().toISOString().slice(0, 16), // Use datetime-local format
        realisasiMulai: '',
        realisasiSelesai: '',
        status: 'belum-mulai'
      });
    }
    setIsOpen(true);
  };

  const openDeleteDialog = (item: ScheduleItem) => {
    setCurrentItem(item);
    setIsDeleteOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.tim || !formData.kegiatan) return;

    const itemToSave: ScheduleItem = {
      id: currentItem?.id || Math.random().toString(36).substr(2, 9),
      ...formData
    } as ScheduleItem;

    saveScheduleItem(itemToSave);
    onDataChange();
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (currentItem) {
      deleteScheduleItem(currentItem.id);
      onDataChange();
      setIsDeleteOpen(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'belum-mulai': return 'bg-yellow-100 text-yellow-800';
      case 'sedang-berjalan': return 'bg-blue-100 text-blue-800';
      case 'selesai': return 'bg-green-100 text-green-800';
      case 'dibatalkan': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'belum-mulai': return 'Belum Mulai';
      case 'sedang-berjalan': return 'Sedang Berjalan';
      case 'selesai': return 'Selesai';
      case 'dibatalkan': return 'Dibatalkan';
      default: return status;
    }
  };

  return (
    <Card className="shadow-sm h-full border-t-4 border-t-dashboard-blue-dark">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Jadwal Pengawasan Inspektorat IV</CardTitle>
            <CardDescription>Manajemen jadwal kegiatan pengawasan</CardDescription>
          </div>
          <Button onClick={() => openDialog()} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Tambah
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="overflow-auto max-h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-dashboard-blue-dark text-white">Tim</TableHead>
                <TableHead className="bg-dashboard-blue-dark text-white">Kegiatan</TableHead>
                <TableHead className="bg-dashboard-blue-dark text-white">Rencana</TableHead>
                <TableHead className="bg-dashboard-blue-dark text-white">Mulai</TableHead>
                <TableHead className="bg-dashboard-blue-dark text-white">Selesai</TableHead>
                <TableHead className="bg-dashboard-blue-dark text-white">Status</TableHead>
                <TableHead className="w-[100px] bg-dashboard-blue-dark text-white">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Tidak ada data jadwal
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.tim}</TableCell>
                    <TableCell>{item.kegiatan}</TableCell>
                    <TableCell>
                      {item.rencanaPelaksanaan 
                        ? new Date(item.rencanaPelaksanaan).toLocaleString('id-ID', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) 
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {item.realisasiMulai 
                        ? new Date(item.realisasiMulai).toLocaleString('id-ID', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) 
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {item.realisasiSelesai 
                        ? new Date(item.realisasiSelesai).toLocaleString('id-ID', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) 
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                        {getStatusLabel(item.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="icon" variant="ghost" onClick={() => openDialog(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => openDeleteDialog(item)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Add/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentItem ? 'Edit Jadwal' : 'Tambah Jadwal'}</DialogTitle>
            <DialogDescription>
              {currentItem ? 'Perbarui detail jadwal di bawah ini.' : 'Tambahkan jadwal baru dengan formulir di bawah ini.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tim" className="text-right">Tim</label>
              <Input 
                id="tim"
                name="tim"
                value={formData.tim}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="kegiatan" className="text-right">Kegiatan</label>
              <Input 
                id="kegiatan"
                name="kegiatan"
                value={formData.kegiatan}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="rencanaPelaksanaan" className="text-right">Rencana (PKPT)</label>
              <Input
                id="rencanaPelaksanaan"
                name="rencanaPelaksanaan"
                type="datetime-local"
                value={formData.rencanaPelaksanaan}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="realisasiMulai" className="text-right">Realisasi Mulai</label>
              <Input
                id="realisasiMulai"
                name="realisasiMulai"
                type="datetime-local"
                value={formData.realisasiMulai}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="realisasiSelesai" className="text-right">Realisasi Selesai</label>
              <Input
                id="realisasiSelesai"
                name="realisasiSelesai"
                type="datetime-local"
                value={formData.realisasiSelesai}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="belum-mulai">Belum Mulai</SelectItem>
                  <SelectItem value="sedang-berjalan">Sedang Berjalan</SelectItem>
                  <SelectItem value="selesai">Selesai</SelectItem>
                  <SelectItem value="dibatalkan">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
            <Button onClick={handleSubmit}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus jadwal ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ScheduleTable;
