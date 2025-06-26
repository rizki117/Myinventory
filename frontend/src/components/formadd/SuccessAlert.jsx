








import { Alert } from "react-bootstrap";

const SuccessAlert = ({ message, onClose }) => {
  if (!message) return null; // Jangan tampilkan jika tidak ada pesan

  return (
    <Alert className="text-center my-2" variant="success" onClose={onClose} dismissible>
      {message}
    </Alert>
  );
};

export default SuccessAlert;