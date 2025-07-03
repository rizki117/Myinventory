import React, { useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';

import { produk as formStructure } from './produk';
import useGetMe from '../../hooks/useGetMe';
import DataList from '../../components/data/DataList';
import SearchData from '../../components/myprivate/SearchData';
import PaginationControls from '../../components/myprivate/PaginationControls';
import { getAllProduk, deleteProduk, updateProduk } from '../../services/produkService';

const DataProduk = () => {
  const { user, loading: loadingMe, error: errorMe } = useGetMe();

  const [search, setSearch] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [namaPembuat, setNamaPembuat] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  if (loadingMe) return <Spinner animation="border" variant="primary" />;
  if (errorMe) return <Alert variant="danger">Gagal mengambil data login</Alert>;

  const headers = [
    { key: 'name', label: 'Nama' },
    { key: 'harga', label: 'Harga' },
    { key: 'price', label: 'Jumlah' },
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
    const { data, totalRows } = result;

    setTotalRows(totalRows);

    const formattedData = data.map(item => {
      const createdAtFormatted = new Date(item.createdAt).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

      return {
        ...item,
        createdAt: createdAtFormatted,
        ...(user?.role === 'admin' && {
          createdBy: item.user?.name || 'Unknown',
        }),
      };
    });

    return formattedData;
  };

  const totalPages = Math.ceil(totalRows / (limit || 1)) || 1;

  return (
    <>
      {user?.role === 'admin' ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchTrigger(prev => prev + 1);
            setPage(1);
          }}
          className="my-3"
        >
          <div className="mb-2">
            <input
              type="text"
              placeholder="Cari nama barang..."
              className="form-control"
              value={namaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Cari nama pembuat..."
              className="form-control"
              value={namaPembuat}
              onChange={(e) => setNamaPembuat(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">Cari</button>
        </form>
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

      {/* Input jumlah data tampil */}
      <div className="mb-2">
        <label htmlFor="limit" className="form-label">Tampilkan jumlah data:</label>
        <input
          type="number"
          id="limit"
          min={1}
          value={limit === 0 ? '' : limit}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '') {
              setLimit(0);
            } else {
              const number = parseInt(val);
              if (!isNaN(number)) {
                setLimit(number);
                setPage(1);
              }
            }
          }}
          onBlur={() => {
            if (!limit || limit < 1) {
              setLimit(1);
            }
          }}
          className="form-control"
          style={{ width: '100px' }}
        />
      </div>

      <DataList
        key={`produk-${user?.role}-${searchTrigger}-${page}-${limit}`}
        fetchFunction={fetchFunction}
        deleteFunction={deleteProduk}
        editFunction={updateProduk}
        headers={headers}
        formStructure={formStructure}
        user={user}
      />

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