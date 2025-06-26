








import { validations } from "../../utils/validations"

export const produk = [
  { name: "name", label: "Nama", type: "text", placeholder: "Masukkan Nama ", validations: [validations.required] },
  
  
  { name: "price", label: "Jumlah", type: "number", placeholder: "Jumlah", validations: [validations.required] },
  
  { name: "harga", label: "Harga", type: "number", placeholder: "Rp. ", validations: [validations.required] },
  
  { name: "description", label: "Info", type: "textarea", placeholder: "Info Barang", validations: [validations.required]}
  
];


