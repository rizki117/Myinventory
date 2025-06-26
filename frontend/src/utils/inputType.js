








const inputType = (key, value) => {
  const lowerKey = key.toLowerCase();

  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "checkbox"; // Untuk satu nilai true/false
  if (Array.isArray(value)) return "checkbox-multiple"; // Untuk multi-checkbox (skill, hobi, dll.)
  if (lowerKey.includes("email")) return "email";
  if (lowerKey.includes("date")) return "date";
  if (lowerKey.includes("password")) return "password";
  if (lowerKey.includes("phone") || lowerKey.includes("tel")) return "tel";
  if (lowerKey.includes("url") || lowerKey.includes("website")) return "url";
  if (lowerKey.includes("alamat") || lowerKey.includes("address")) return "textarea"; 
  if (lowerKey.includes("gender") || lowerKey.includes("jenis_kelamin")) return "radio"; // Jenis kelamin pakai radio
  if (lowerKey.includes("pendidikan") || lowerKey.includes("education")) return "select"; // Pendidikan pakai select

  return "text";
};

export default inputType;

