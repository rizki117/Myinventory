








import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useGetMe from '../../hooks/useGetMe'; // Pastikan path-nya sesuai
import Logo from './Logo'; // Import komponen Logo (sesuaikan path-nya)

const NavigationBar = () => {
  const { user } = useGetMe();

  // Style untuk gradient background yang sama dengan logo
  const gradientStyle = {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 30%, #45b7d1 70%, #96ceb4 100%)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    border: 'none'
  };

  return (
    <Navbar 
      expand="lg" 
      variant="dark" 
      style={gradientStyle}
      className="navbar-gradient"
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="d-flex align-items-center"
          style={{ 
            backgroundColor: 'transparent', 
            boxShadow: 'none',
            textDecoration: 'none'
          }}
        >
          {/* Ganti teks "OkYaKu" dengan komponen Logo */}
          <Logo width={120} height={36} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto ms-lg-4">
            <Nav.Link 
              as={NavLink} 
              to="/" 
              end
              style={{ 
                color: '#ffffff',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              className="nav-link-gradient"
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/about"
              style={{ 
                color: '#ffffff',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              className="nav-link-gradient"
            >
              About
            </Nav.Link>

            {/* Tampilkan dashboard hanya jika user sudah login */}
            {user && (
              <Nav.Link 
                as={NavLink} 
                to="/dashboard"
                style={{ 
                  color: '#ffffff',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                className="nav-link-gradient"
              >
                Dashboard
              </Nav.Link>
            )}

            <NavDropdown 
              title="Shop" 
              id="shop-dropdown"
              style={{ 
                color: '#ffffff',
                fontWeight: '500'
              }}
              className="nav-dropdown-gradient"
            >
              <NavDropdown.Item 
                as={NavLink} 
                to="/shop/all-products"
                style={{
                  color: '#2c3e50',
                  transition: 'all 0.3s ease'
                }}
              >
                All Products
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item 
                as={NavLink} 
                to="/shop/popular-items"
                style={{
                  color: '#2c3e50',
                  transition: 'all 0.3s ease'
                }}
              >
                Popular Items
              </NavDropdown.Item>
              <NavDropdown.Item 
                as={NavLink} 
                to="/shop/new-arrivals"
                style={{
                  color: '#2c3e50',
                  transition: 'all 0.3s ease'
                }}
              >
                New Arrivals
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* CSS untuk efek hover dan styling tambahan */}
      <style jsx>{`
        .navbar-gradient .nav-link-gradient:hover {
          color: #f1c40f !important;
          text-shadow: 0 0 8px rgba(241, 196, 15, 0.5);
          transform: translateY(-1px);
        }

        .navbar-gradient .nav-dropdown-gradient .dropdown-toggle {
          color: #ffffff !important;
        }

        .navbar-gradient .nav-dropdown-gradient .dropdown-toggle:hover {
          color: #f1c40f !important;
          text-shadow: 0 0 8px rgba(241, 196, 15, 0.5);
        }

        .navbar-gradient .dropdown-menu {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .navbar-gradient .dropdown-item:hover {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: #ffffff !important;
          transform: translateX(5px);
        }

        .navbar-gradient .navbar-toggler {
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.1);
        }

        .navbar-gradient .navbar-toggler:focus {
          box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
        }

        .navbar-gradient .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
      `}</style>
    </Navbar>
  );
};

export default NavigationBar;