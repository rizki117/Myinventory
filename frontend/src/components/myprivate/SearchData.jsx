
// src/components/myprivate/

import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // ← pastikan sudah install react-icons

const SearchData = ({ value, onChange, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit} className="my-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Cari Nama Customer ..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Cari produk"
        />
        <Button variant="primary" type="submit">
          <FaSearch className="mb-1" /> {/* ikon kecil di tengah tombol */}
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchData;
