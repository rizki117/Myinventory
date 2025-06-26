








// CetakPDF.js
// CetakPDF.js
import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Modal, Button, Form } from "react-bootstrap";

const CetakPDF = ({ data, headers }) => {
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pdfTitle, setPdfTitle] = useState("");

  const handleCetak = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(pdfTitle);
    const x = (pageWidth - textWidth) / 2;
    doc.text(pdfTitle, x, 10);

    const tableColumn = ["No", ...headers.map((h) => h.label)];

    const tableRows = data.map((item, index) => {
      const row = headers.map((h) => {
        const value = h.key.split(".").reduce((obj, key) => obj?.[key], item);
        return value !== undefined && value !== null ? value : "-";
      });
      return [index + 1, ...row];
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
    });

    // Ubah judul jadi nama file (lowercase, spasi jadi underscore)
    const fileName = pdfTitle.trim().toLowerCase().replace(/\s+/g, "_") + ".pdf";
    doc.save(fileName);

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = () => {
    handleCloseModal();
    handleCetak();
  };

  return (
    <div className="container">
      <Button variant="danger" className="mt-2" onClick={handleOpenModal}>
        Cetak PDF
      </Button>

      {success && (
        <div className="alert alert-success mt-2" role="alert">
          PDF berhasil dicetak!
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Masukkan Judul PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Judul</Form.Label>
            <Form.Control
              type="text"
              value={pdfTitle}
              onChange={(e) => setPdfTitle(e.target.value)}
              placeholder="Masukkan judul laporan"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Cetak
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CetakPDF;