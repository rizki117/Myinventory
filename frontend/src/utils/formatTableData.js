









//bagian utils/formatTableData.js

export const formatTableData = (value) => {
  if (Array.isArray(value)) {
    return value.join(", "); // Gabungkan array dengan koma
  }

  if (typeof value === "string") {
    return value.replace(/([a-z])([A-Z])/g, "$1 $2"); // Tambah spasi sebelum huruf besar
  }

  return value; // Jika bukan string atau array, tampilkan apa adanya
};
