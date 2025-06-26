









import { Spinner } from "react-bootstrap";

const Loading = ({ show }) => {
  if (!show) return null; // Jangan tampilkan jika false

  return (
    <div className="d-flex justify-content-center mt-3">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;