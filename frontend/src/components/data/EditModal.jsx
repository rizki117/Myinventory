









//components/data/EditModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import FormField from "../formadd/FormField"; // pastikan path-nya sesuai

const EditModal = ({ show, itemToEdit, onConfirm, onCancel, formStructure = [] }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      setFormData(itemToEdit);
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  if (!itemToEdit) return null;

  return (
    <Modal show={show} onHide={onCancel}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {formStructure.map((field, idx) => {
              if (field.name === "uuid") return null;

              const value =
                field.type === "checkbox" && field.options
                  ? formData[field.name] || []
                  : formData[field.name] ?? "";

              return (
                <FormField
                  key={idx}
                  field={field}
                  value={value}
                  onChange={handleChange}
                  error={null} // Jika ada validasi nanti bisa diisi
                />
              );
            })}
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Batal
          </Button>
          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditModal;