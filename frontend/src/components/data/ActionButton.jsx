








//components/data/ActionButton.jsx

import React from 'react';
import { Button } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

const ActionButton = ({ onEdit, onDelete }) => {
  return (
    <div className="d-flex justify-content-between w-100">
      {/* Tombol Edit di Kiri */}
      <Button variant="warning" size="sm" onClick={onEdit}>
        <PencilSquare className="me-1" />
      </Button>
      
      {/* Spacer untuk memberi jarak di tengah */}
      <div className="flex-grow-1"></div>

      {/* Tombol Hapus di Kanan */}
      <Button variant="danger" size="sm" onClick={onDelete}>
        <Trash className="me-1" />
      </Button>
    </div>
  );
};

export default ActionButton;
