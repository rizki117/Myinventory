









// services/publicService.js
import axios from "axios";

// Buat instance Axios
const api = axios.create({
  baseURL: "http://localhost:8080", // Ganti sesuai URL backend kamu
  withCredentials: true,
});

// Ambil semua produk publik
export const getPublicProduk = async () => {
  try {
    const response = await api.get("/public");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Gagal mengambil produk publik");
  }
};

// Ambil detail produk publik berdasarkan UUID
export const getPublicProdukById = async (id) => {
  try {
    const response = await api.get(`/public/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Gagal mengambil detail produk");
  }
};
