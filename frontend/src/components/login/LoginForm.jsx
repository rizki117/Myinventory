









import React, { useState } from "react";
import { Form, Button, Alert, Spinner, Container, Row, Col, Card } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import useLogin from "../../hooks/useLogin";

const LoginForm = () => {
  const { login, loading, error } = useLogin();
  const navigate = useNavigate(); // Tambahkan ini
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    try {
      await login(credentials);
      setSuccess("Login berhasil!");
      navigate("/dashboard"); // Redirect ke halaman dashboard
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3 className="mb-4 text-center">Login</h3>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukkan email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Masukkan password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
