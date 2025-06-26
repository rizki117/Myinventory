









import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-dark text-white pt-5 pb-3 mt-5">
    <Container>
      <Row>
        <Col md={4} className="mb-4">
          <h5>OkYaKu</h5>
          <p>
            Kami menyediakan produk berkualitas dengan harga terbaik. Kepuasan pelanggan adalah prioritas kami.
          </p>
        </Col>

        <Col md={2} className="mb-4">
          <h6>Quick Links</h6>
          <ul className="list-unstyled">
            <li><a href="/about" className="text-white text-decoration-none">Tentang Kami</a></li>
            <li><a href="/shop" className="text-white text-decoration-none">Belanja</a></li>
            <li><a href="/contact" className="text-white text-decoration-none">Kontak</a></li>
            <li><a href="/faq" className="text-white text-decoration-none">FAQ</a></li>
          </ul>
        </Col>

        <Col md={3} className="mb-4">
          <h6>Hubungi Kami</h6>
          <p>Email: support@okyaku.com</p>
          <p>Telepon: +62 812 3456 7890</p>
          <p>Alamat: Jakarta, Indonesia</p>
        </Col>

        <Col md={3} className="mb-4">
          <h6>Berlangganan</h6>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Masukkan email Anda" className="mb-2" />
              <Button variant="primary" size="sm">Kirim</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <hr className="border-gray" />

      <Row className="align-items-center">
        <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
          <p className="mb-0">&copy; {new Date().getFullYear()} OkYaKu. All rights reserved.</p>
        </Col>
        <Col md={6} className="text-center text-md-end">
          
                      
            
            
          <a href="https://facebook.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={20} />
          </a>
          

          <a href="https://instagram.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} />
          </a>

          
<a href="https://www.tiktok.com/@okyaku.eco" className="text-white" target="_blank" rel="noopener noreferrer">
            <FaTiktok size={20} />
          </a>                
                    
          
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;