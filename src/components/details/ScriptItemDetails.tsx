
import React from 'react';
import { ScriptItem } from '@/types';

interface ScriptItemDetailsProps {
  item: ScriptItem;
  detailsData?: {
    penangananKasusDetail?: string;
    undanganEksternalDetail?: string;
    rapatInternalDetail?: string;
    persuratanParafDetail?: string;
  };
}

const ScriptItemDetails: React.FC<ScriptItemDetailsProps> = ({ item, detailsData }) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-3 rounded-md">
          <p className="text-sm font-medium text-muted-foreground">Minggu ke-</p>
          <p className="text-lg font-semibold">{item.minggu}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="text-sm font-medium text-muted-foreground">Tanggal</p>
          <p className="text-lg font-semibold">{new Date(item.tanggal).toLocaleDateString('id-ID')}</p>
        </div>
      </div>
      
      <div className="border p-3 rounded-md">
        <h3 className="font-semibold mb-2 border-b pb-1">Kegiatan Inspektorat IV</h3>
        
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className={`p-4 rounded-md ${item.penangananKasus ? 'bg-green-50 border-l-4 border-l-green-500' : 'bg-gray-50'}`}>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 ${item.penangananKasus ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <p className="font-medium">Penanganan Kasus</p>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Status: {item.penangananKasus ? 'Aktif' : 'Tidak Aktif'}
            </p>
            {item.penangananKasus && detailsData?.penangananKasusDetail && (
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm font-medium text-gray-500 mb-1">Detail:</p>
                <p className="text-sm whitespace-pre-wrap">{detailsData.penangananKasusDetail}</p>
              </div>
            )}
          </div>
          
          <div className={`p-4 rounded-md ${item.undanganEksternal ? 'bg-green-50 border-l-4 border-l-green-500' : 'bg-gray-50'}`}>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 ${item.undanganEksternal ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <p className="font-medium">Undangan Eksternal / Arahan Pimpinan</p>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Status: {item.undanganEksternal ? 'Aktif' : 'Tidak Aktif'}
            </p>
            {item.undanganEksternal && detailsData?.undanganEksternalDetail && (
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm font-medium text-gray-500 mb-1">Detail:</p>
                <p className="text-sm whitespace-pre-wrap">{detailsData.undanganEksternalDetail}</p>
              </div>
            )}
          </div>
          
          <div className={`p-4 rounded-md ${item.rapatInternal ? 'bg-green-50 border-l-4 border-l-green-500' : 'bg-gray-50'}`}>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 ${item.rapatInternal ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <p className="font-medium">Rapat Internal</p>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Status: {item.rapatInternal ? 'Aktif' : 'Tidak Aktif'}
            </p>
            {item.rapatInternal && detailsData?.rapatInternalDetail && (
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm font-medium text-gray-500 mb-1">Detail:</p>
                <p className="text-sm whitespace-pre-wrap">{detailsData.rapatInternalDetail}</p>
              </div>
            )}
          </div>
          
          <div className={`p-4 rounded-md ${item.persuratanParaf ? 'bg-green-50 border-l-4 border-l-green-500' : 'bg-gray-50'}`}>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 ${item.persuratanParaf ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <p className="font-medium">Persuratan Paraf Koordinasi</p>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Status: {item.persuratanParaf ? 'Aktif' : 'Tidak Aktif'}
            </p>
            {item.persuratanParaf && detailsData?.persuratanParafDetail && (
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm font-medium text-gray-500 mb-1">Detail:</p>
                <p className="text-sm whitespace-pre-wrap">{detailsData.persuratanParafDetail}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptItemDetails;
