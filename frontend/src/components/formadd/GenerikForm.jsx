








import { useState, useEffect } from "react";
import { Modal, Container, Form, Row } from "react-bootstrap";

import FormField from "./FormField";
import FormActions from "./FormActions";

const GenerikForm = ({
  title,
  fields,
  onSubmit,
  show,
  handleClose,
  initialData = {},
  error, // Tambahan: error dari luar (misalnya backend)
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (show) {
      setFormData(initialData || {});
      setErrors({});
    }
  }, [show, initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && Array.isArray(formData[name])) {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    validateField(name, type === "checkbox" ? checked : value);
  };

  const validateField = (name, value) => {
    const field = fields.find((f) => f.name === name);
    if (!field || !field.validations) return;

    let errorMessage = "";
    for (const validation of field.validations) {
      const error = validation(value, formData); // kirim formData jika perlu
      if (error) {
        errorMessage = error;
        break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let newErrors = {};
    fields.forEach(({ name, validations }) => {
      if (validations) {
        for (const validation of validations) {
          const error = validation(formData[name] || "", formData);
          if (error) {
            newErrors[name] = error;
            break;
          }
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    if (JSON.stringify(formData) === JSON.stringify(initialData)) {
      handleClose();
      setIsLoading(false);
      return;
    }

    await onSubmit(formData);
    setIsLoading(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">{title || "Formulir"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-3">
                <div className="alert alert-danger">{error}</div>
              </div>
            )}
            <Row>
              {fields.map((field, index) => (
                <FormField
                  key={index}
                  field={field}
                  value={
                    formData[field.name] !== undefined
                      ? formData[field.name]
                      : field.type === "checkbox" && field.options
                      ? [] // Checkbox multiple
                      : field.type === "checkbox"
                      ? false // Checkbox tunggal
                      : ""
                  }
                  onChange={handleChange}
                  error={errors[field.name]}
                  autoFocus={index === 0}
                />
              ))}
            </Row>

            <FormActions handleClose={handleClose} isLoading={isLoading} />
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default GenerikForm;