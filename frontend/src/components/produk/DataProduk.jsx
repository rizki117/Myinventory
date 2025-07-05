import React, { useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';

import { produk as formStructure } from './produk';
import useGetMe from '../../hooks/useGetMe';
import DataList from '../../components/data/DataList';
import SearchData from '../../components/myprivate/SearchData';
import PaginationControls from '../../components/myprivate/PaginationControls';
import { getAllProduk, deleteProduk, updateProduk } from '../../services/produkService';

import SearchFormAdmin from '../../components/myprivate/SearchFormAdmin';
import LimitInput from '../../components/myprivate/LimitInput';
import { formatRupiah } from '../../utils/formatRupiah';

const DataProduk = () => {
  const { user, loading: loadingMe, error: errorMe } = useGetMe();

  const [search, setSearch] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [namaPembuat, setNamaPembuat] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [totalSemua, setTotalSemua] = useState(0);
  const [dataTabel, setDataTabel] = useState([]);

  if (loadingMe) return <Spinner animation="border" variant="primary" />;
  if (errorMe) return <Alert variant="danger">Gagal mengambil data login</Alert>;

  const headers = [
    { key: 'name', label: 'Nama' },
    { key: 'harga', label: 'Harga' },
    { key: 'price', label: 'Jumlah' },
    { key: 'total', label: 'Total' },
    { key: 'description', label: 'Info' },
    { key: 'createdAt', label: 'Tanggal' },
  ];

  if (user?.role === 'admin') {
    headers.push({ key: 'createdBy', label: 'Create' });
  }

  const fetchFunction = async () => {
    const offset = (page - 1) * (limit || 1);
    const params = user?.role === 'admin'
      ? { limit: limit || 1, offset, namaBarang, namaPembuat }
      : { limit: limit || 1, offset, search };

    const result = await getAllProduk(params);
    const { data, totalRows, totalSemua } = result;

    setTotalRows(totalRows);
    setTotalSemua(totalSemua);
    setDataTabel(data);

    const formattedData = data.map(item => {
      const createdAtFormatted = new Date(item.createdAt).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

      return {
        ...item,
        createdAt: createdAtFormatted,
        harga: formatRupiah(item.harga),
        total: formatRupiah(item.total),
        ...(user?.role === 'admin' && {
          createdBy: item.user?.name || 'Unknown',
        }),
      };
    });

    return formattedData;
  };

  const totalPages = Math.ceil(totalRows / (limit || 1)) || 1;

  const totalDariTabel = dataTabel.reduce((sum, item) => {
    const total = Number(item.price) * Number(item.harga);
    return sum + total;
  }, 0);

  return (
    <>
      {user?.role === 'admin' ? (
        <SearchFormAdmin
          namaBarang={namaBarang}
          setNamaBarang={setNamaBarang}
          namaPembuat={namaPembuat}
          setNamaPembuat={setNamaPembuat}
          onSubmit={(e) => {
            e.preventDefault();
            setSearchTrigger(prev => prev + 1);
            setPage(1);
          }}
        />
      ) : (
        <SearchData
          value={search}
          onChange={setSearch}
          onSubmit={(e) => {
            e.preventDefault();
            setSearchTrigger(prev => prev + 1);
            setPage(1);
          }}
        />
      )}

      <LimitInput limit={limit} setLimit={setLimit} setPage={setPage} />

      <DataList
        key={`produk-${user?.role}-${searchTrigger}-${page}-${limit}`}
        fetchFunction={fetchFunction}
        deleteFunction={deleteProduk}
        editFunction={updateProduk}
        headers={headers}
        formStructure={formStructure}
        user={user}
        totalTabel={formatRupiah(totalDariTabel)} // ✅ Kirim total ke DataList
      />

      <div className="mt-3 mb-1">
        <strong>Total dari Tabel Rp: </strong> {formatRupiah(totalDariTabel)}
      </div>

      <div className="mb-3">
        <strong>Total Semua Data Rp: </strong> {formatRupiah(totalSemua)}
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        totalRows={totalRows}
        onPrev={() => setPage(prev => Math.max(1, prev - 1))}
        onNext={() => setPage(prev => Math.min(totalPages, prev + 1))}
      />
    </>
  );
};

export default DataProduk;