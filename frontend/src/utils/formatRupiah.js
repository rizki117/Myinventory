// src/utils/formatRupiah.js

export const formatRupiah = (angka) => {
  if (typeof angka !== 'number') angka = Number(angka);
  if (isNaN(angka)) return '0';

  return angka.toLocaleString('id-ID'); // Tanpa Rp
};
