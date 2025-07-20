








import { validations } from "../../utils/validations"

export const produk = [
  { name: "name", label: "Customer", type: "text", placeholder: "Masukkan Nama Customer ", validations: [validations.required] },
  

{ name: "merk", label: "Merk", type: "text", placeholder: "Merk", validations: [validations.required]},  

  
 { name: "lebar", label: "L", type: "text", placeholder: "Lebar", validations: [validations.required]},  
 
{ name: "panjang", label: "P", type: "text", placeholder: "Panjang", validations: [validations.required]}, 

{ name: "warna", label: "Warna", type: "text", placeholder: "Warna", validations: [validations.required]},


{ name: "micron", label: "Micron", type: "text", placeholder: "Micron", validations: [validations.required]},

  
  { name: "price", label: "Jumlah Dus", type: "number", placeholder: "Jumlah", validations: [validations.required] },
  
{ name: "harga", label: "Harga", type: "number", placeholder: "Harga Perdus Rp. ", validations: [validations.required] },  
  
  
{ name: "nospk", label: "NOSPK", type: "text", placeholder: "No SPK", validations: [validations.required]},   
  
  
 { name: "oven", label: "Oven", type: "text", placeholder: "Oven", validations: [validations.required]},
 
{ name: "gudang", label: "Gudang", type: "text", placeholder: "Gudang", validations: [validations.required]},   
   
   
  
  
  
  { name: "description", label: "Info", type: "textarea", placeholder: "Info Barang", validations: [validations.required]},
  
  
];


