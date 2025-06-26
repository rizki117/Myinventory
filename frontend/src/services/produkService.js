









// services/produkService.js

import axios from "axios";
import { refreshToken } from "./authService"; // Pastikan file ini benar

// Inisialisasi axios instance
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// INTERCEPTOR REQUEST - Sisipkan token Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// INTERCEPTOR RESPONSE - Auto refresh token jika 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url === "/login" ||
      originalRequest.url === "/token" ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await refreshToken();
        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ==========================
// FUNGSI CRUD PRODUK
// ==========================

// Ambil semua produk
export const getAllProduk = async () => {
  try {
    const response = await api.get("/produk");
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Buat produk baru
export const createProduk = async (data) => {
  try {
    const response = await api.post("/produk", data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Ambil produk berdasarkan ID
export const getProdukById = async (id) => {
  try {
    const response = await api.get(`/produk/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Update produk
export const updateProduk = async (id, data) => {
  try {
    const response = await api.patch(`/produk/${id}`, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Hapus produk
export const deleteProduk = async (id) => {
  try {
    const response = await api.delete(`/produk/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};