import React, { useState, useMemo } from 'react';

const FilterLaporan = ({ onFilterSubmit }) => {
  const [jenisLaporan, setJenisLaporan] = useState('harian');
  const [tanggal, setTanggal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bulan, setBulan] = useState('');
  const [tahun, setTahun] = useState('');
  const [tahunOnly, setTahunOnly] = useState('');

  const bulanOptions = useMemo(() => (
    [...Array(12)].map((_, i) => ({
      value: String(i + 1).padStart(2, '0'),
      label: new Date(0, i).toLocaleString('id-ID', { month: 'long' }),
    }))
  ), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { jenisLaporan };

    if (jenisLaporan === 'harian' && tanggal) {
      const [year, month, day] = tanggal.split('-');
      data = { tanggal: day, bulan: month, tahun: year };
    }

    if (jenisLaporan === 'mingguan' && startDate && endDate) {
      data = { startDate, endDate };
    }

    if (jenisLaporan === 'bulanan') {
      if (!bulan || !tahun) {
        alert("Mohon isi bulan dan tahun.");
        return;
      }
      data = { bulan, tahun };
    }

    if (jenisLaporan === 'tahunan') {
      if (!tahunOnly) {
        alert("Mohon isi tahun.");
        return;
      }
      data = { tahun: tahunOnly };
    }

    onFilterSubmit(data);
  };

  const isFormValid = () => {
    switch (jenisLaporan) {
      case 'harian': return !!tanggal;
      case 'mingguan': return !!startDate && !!endDate;
      case 'bulanan': return !!bulan && !!tahun;
      case 'tahunan': return !!tahunOnly;
      default: return false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
      <div className="mb-2">
        <label className="form-label">Jenis Laporan</label>
        <select
          className="form-select"
          value={jenisLaporan}
          onChange={(e) => setJenisLaporan(e.target.value)}
        >
          <option value="harian">Harian</option>
          <option value="mingguan">Mingguan</option>
          <option value="bulanan">Bulanan</option>
          <option value="tahunan">Tahunan</option>
        </select>
      </div>

      {jenisLaporan === 'harian' && (
        <input
          type="date"
          className="form-control mb-2"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        />
      )}

      {jenisLaporan === 'mingguan' && (
        <div className="d-flex gap-2 mb-2">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      )}

      {jenisLaporan === 'bulanan' && (
        <div className="d-flex gap-2 mb-2">
          <select
            className="form-select"
            value={bulan}
            onChange={(e) => setBulan(e.target.value)}
          >
            <option value="">Bulan</option>
            {bulanOptions.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Tahun"
            className="form-control"
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
          />
        </div>
      )}

      {jenisLaporan === 'tahunan' && (
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Tahun"
          value={tahunOnly}
          onChange={(e) => setTahunOnly(e.target.value)}
        />
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!isFormValid()}
      >
        Cari
      </button>
    </form>
  );
};

export default FilterLaporan;