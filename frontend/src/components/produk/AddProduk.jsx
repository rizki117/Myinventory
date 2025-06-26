








import React from "react";
import AddData from "../formadd/AddData";
import { produk } from "./produk";
import { createProduk } from "../../services/produkService";

const AddProduk = ({ onSuccess }) => {
  const token = localStorage.getItem("accessToken");

  const handleCreate = async (data) => {
    try {
      await createProduk(data, token);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Gagal menambahkan produk", error);
    }
  };

  return (
    <AddData
      title="Add Produk"
      fields={produk}
      createFunction={handleCreate}
      initialData={{name: "", price: "", harga:"", description: ""}}
      onSuccess={onSuccess}
    />
  );
};

export default AddProduk;

