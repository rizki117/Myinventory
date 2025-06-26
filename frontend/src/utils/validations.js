









export const validations = {
  required: (value) => (!value ? "Field ini wajib diisi" : ""),
  minLength: (min) => (value) =>
    value.length < min ? `Minimal ${min} karakter` : "",
  email: (value) =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Email tidak valid" : "",
};
