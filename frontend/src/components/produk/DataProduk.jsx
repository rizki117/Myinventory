









import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';

import { produk as formStructure } from './produk';

import useGetMe from '../../hooks/useGetMe';
import DataList from '../../components/data/DataList';

import { getAllProduk, deleteProduk, updateProduk } from '../../services/produkService';

const DataProduk = () => {
  const { user, loading: loadingMe, error: errorMe } = useGetMe();

  if (loadingMe) return <Spinner animation="border" variant="primary" />;
  if (errorMe) return <Alert variant="danger">Gagal mengambil data login</Alert>;

  // headers dasar
  const headers = [
    { key: 'name', label: 'Nama Produk' },
    { key: 'harga', label: 'Harga' },
    { key: 'price', label: 'Jumlah' },
    { key: 'description', label: 'Info' },
  ];

  // Tambahkan createdBy hanya jika admin
  if (user?.role === 'admin') {
    headers.push({ key: 'createdBy', label: 'Dibuat Oleh' });
  }

  // Ambil data dan sisipkan createdBy jika admin
  const fetchFunction = async () => {
    const data = await getAllProduk();

    if (user?.role === 'admin') {
      return data.map(item => ({
        ...item,
        createdBy: item.user?.name || 'Unknown',
      }));
    } else {
      return data;
    }
  };

  return (
    <DataList
      fetchFunction={fetchFunction}
      deleteFunction={deleteProduk}
      editFunction={updateProduk}
      headers={headers}
      formStructure={formStructure}
      user={user}
    />
  );
};

export default DataProduk;