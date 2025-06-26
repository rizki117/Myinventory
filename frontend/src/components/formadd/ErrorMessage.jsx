








import { Alert } from "react-bootstrap";

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null; // Jangan tampilkan jika tidak ada pesan

  return (
    <Alert variant="danger" onClose={onClose} dismissible>
      {message}
    </Alert>
  );
};

export default ErrorMessage;
