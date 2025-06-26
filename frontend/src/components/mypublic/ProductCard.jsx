









import React from 'react';
import { Card, Button } from 'react-bootstrap';

const hoverStyle = {
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const hoverEffect = {
  transform: 'translateY(-8px)',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
};

const ProductCard = ({ title, price, oldPrice, image, isSale }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Card
      className="h-100 border-0 position-relative"
      style={hover ? { ...hoverStyle, ...hoverEffect } : hoverStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {isSale && (
        <div
          className="position-absolute bg-danger text-white px-2 py-1 rounded-end"
          style={{ top: '0.5rem', left: '0', fontSize: '0.8rem', fontWeight: 'bold' }}
        >
          SALE
        </div>
      )}
      <Card.Img
        variant="top"
        src={image}
        style={{ objectFit: 'cover', height: '200px' }}
      />
      <Card.Body className="text-center d-flex flex-column">
        <Card.Title as="h5" className="fw-bolder mb-2">
          {title}
        </Card.Title>
        <div className="d-flex justify-content-center small text-warning mb-2">
          {'★★★★★'.split('').map((_, i) => (
            <i className="bi bi-star-fill" key={i}></i>
          ))}
        </div>
        <div className="fw-bold fs-5 mb-3">
          {oldPrice && (
            <span className="text-muted text-decoration-line-through me-2">
              {oldPrice}
            </span>
          )}
          <span className="text-danger">{price}</span>
        </div>
        <Button variant="dark" className="mt-auto w-100">
          <i className="bi bi-eye"></i> Lihat Detail
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;