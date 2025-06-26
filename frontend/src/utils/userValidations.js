










export const userValidations = {
  required: (val) => (val ? '' : 'Field ini wajib diisi'),
  minLength: (length) => (val) =>
    val.length >= length ? '' : `Minimal ${length} karakter`,
  email: (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? '' : 'Format email tidak valid',
};
