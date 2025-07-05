// CetakPDF.js
import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Modal, Button, Form } from "react-bootstrap";

const CetakPDF = ({ data, headers, totalTabel }) => {
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pdfTitle, setPdfTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [division, setDivision] = useState("");
  const [periode, setPeriode] = useState("");
  const [description, setDescription] = useState("");

  const handleCetak = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Judul (centered)
    const titleWidth = doc.getTextWidth(pdfTitle);
    const x = (pageWidth - titleWidth) / 2;
    doc.setFontSize(14);
    doc.text(pdfTitle, x, 15);

    // Informasi laporan
    const today = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    doc.setFontSize(10);
    let currentY = 25;

    // ✅ Fungsi untuk baris info rapi dan rapat
    const drawLabelValue = (label, value) => {
      const labelX = 14;
      const colonX = 44; // lebih rapat
      const valueX = 48;
      doc.text(label, labelX, currentY);
      doc.text(":", colonX, currentY);
      doc.text(value, valueX, currentY);
      currentY += 6;
    };

    drawLabelValue("Tanggal Laporan", today);
    drawLabelValue("Dibuat Oleh", createdBy);
    drawLabelValue("Divisi", division);
    drawLabelValue("Periode", periode);

    // Deskripsi multiline
    if (description) {
      doc.text("Deskripsi", 14, currentY);
      doc.text(":", 44, currentY);
      currentY += 6;
      const lines = doc.splitTextToSize(description, pageWidth - 28);
      doc.text(lines, 14, currentY);
      currentY += lines.length * 6 + 4;
    } else {
      currentY += 4;
    }

    // Tabel kolom dan baris
    const tableColumn = ["No", ...headers.map(h => h.label)];
    const tableRows = data.map((item, index) => {
      const row = headers.map(h => {
        const value = h.key.split(".").reduce((obj, key) => obj?.[key], item);
        return value !== undefined && value !== null ? value : "-";
      });
      return [index + 1, ...row];
    });

    // Baris total
    const totalRow = ["#", `Jumlah Keseluruhan: Rp ${totalTabel}`];
    tableRows.push(totalRow);

    // Tampilkan tabel
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: currentY,
      theme: "grid",
      styles: {
        fontSize: 10,
      },
      didParseCell: (data) => {
        const isLastRow = data.row.index === tableRows.length - 1;
        if (isLastRow) {
          data.cell.styles.fontStyle = "bold";
          if (data.column.index === 1) {
            data.cell.colSpan = tableColumn.length - 1;
          }
          if (data.column.index > 1) {
            data.cell.text = "";
          }
        }
      },
    });

    const fileName = pdfTitle.trim().toLowerCase().replace(/\s+/g, "_") + ".pdf";
    doc.save(fileName);

    setShowModal(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="container">
      <Button variant="danger" className="mt-2" onClick={() => setShowModal(true)}>
        Cetak PDF
      </Button>

      {success && (
        <div className="alert alert-success mt-2" role="alert">
          PDF berhasil dicetak!
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Informasi Laporan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Judul Laporan</Form.Label>
            <Form.Control
              type="text"
              value={pdfTitle}
              onChange={(e) => setPdfTitle(e.target.value)}
              placeholder="Contoh: Laporan Inventory Barang"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Dibuat Oleh</Form.Label>
            <Form.Control
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Contoh: Haerudin"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Divisi</Form.Label>
            <Form.Control
              type="text"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              placeholder="Contoh: Gudang Utama"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Periode</Form.Label>
            <Form.Control
              type="text"
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
              placeholder="Contoh: 01 Juli – 05 Juli 2025"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Deskripsi Laporan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Isi ringkasan laporan jika diperlukan"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={handleCetak}
            disabled={!pdfTitle || !createdBy || !division || !periode}
          >
            Cetak
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CetakPDF;