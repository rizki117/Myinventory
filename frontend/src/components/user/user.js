










import { validations } from "../../utils/validations"

export const user = [
  {
    name: "name",
    label: "Nama",
    type: "text",
    placeholder: "Masukkan Nama",
    validations: [validations.required]
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    validations: [validations.required, validations.email] // opsional, jika kamu punya
  },
   {
    name: "nohp",
    label: "NoTelpon",
    type: "number",
    placeholder: "No Telepon",
    validations: [validations.required] // opsional, jika kamu punya
  },
   {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "password",
    validations: [validations.required] // opsional, jika kamu punya
  },
   {
    name: "confPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm Password",
    validations: [validations.required] // opsional, jika kamu punya
  },
  
  
  {
    name: "role",
    label: "Role",
    type: "select", // Ubah dari 'text' ke 'select'
    options: [
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" }
    ],
    placeholder: "Pilih Role",
    validations: [validations.required]
  }
];