








//bagian components/data/SuccessAlert.jsx
import React from 'react';
import Alert from 'react-bootstrap/Alert';

function SuccessAlert({ message }) {
  return (
    <Alert variant="success" className="text-center w-100">
      {message}
    </Alert>
  );
}

export default SuccessAlert;