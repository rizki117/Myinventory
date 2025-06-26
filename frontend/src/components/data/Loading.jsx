









//bagian components/Loading.jsx

import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loading({ variant = "primary", size = "md", message }) {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant={variant} size={size} />
      {message && <span className="ml-2">{message}</span>}
    </div>
  );
}

export default Loading;
