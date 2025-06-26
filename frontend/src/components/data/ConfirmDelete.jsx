








//bagian components/data/ConfirmDelete.jsx

import React from "react";
import { Button, Modal } from "react-bootstrap";

function ConfirmDelete({ itemToDelete, onConfirm, onCancel, message }) {
  return (
    <Modal show={!!itemToDelete} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Konfirmasi Hapus</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message || `Apakah Anda yakin ingin menghapus ${itemToDelete?.name}?`}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Batal
        </Button>
        <Button variant="danger" onClick={() => onConfirm(itemToDelete)}>
          Hapus
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDelete;

