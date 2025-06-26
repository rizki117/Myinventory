








import React from 'react';
import { Container } from 'react-bootstrap';

const Header = () => (
  <header
    className="bg-dark py-5 position-relative"
    style={{
      backgroundImage: 'url("/images/jumbo.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Overlay gelap */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // ubah alpha 0.5 jadi 0.6 atau 0.7 kalau mau lebih gelap
        zIndex: 1,
      }}
    />

    {/* Konten di atas overlay */}
    <Container className="my-5 position-relative" style={{ zIndex: 2 }}>
      <div className="text-center text-white">
        <h1 className="display-4 fw-bolder">Shop in style</h1>
        <p className="lead fw-normal text-white-50 mb-0">With this shop homepage okyaku</p>
      </div>
    </Container>
  </header>
);

export default Header;