









import { Form, Col } from "react-bootstrap";

const FormField = ({ field, value, onChange, error, autoFocus }) => {

  return (
    <Col xs={12} md={6} className="mb-3">
      <Form.Group>
        <Form.Label>{field.label}</Form.Label>

        {field.type === "select" ? (
 <Form.Select name={field.name} value={value} onChange={onChange} isInvalid={!!error}>
     
   {field.options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        ) : field.type === "checkbox" && field.options ? (
          // Checkbox multiple (Hobi)
          field.options.map((option, idx) => (
            <Form.Check
              key={idx}
              type="checkbox"
              name={field.name}
              label={option.label}
              value={option.value}
              checked={Array.isArray(value) ? value.includes(option.value) : false}
              onChange={(e) => {
                const newValue = Array.isArray(value) ? [...value] : [];
                if (e.target.checked) {
                  newValue.push(option.value);
                } else {
                  const index = newValue.indexOf(option.value);
                  if (index > -1) newValue.splice(index, 1);
                }
                onChange({ target: { name: field.name, value: newValue } });
              }}
              isInvalid={!!error}
            />
          ))
        ) : field.type === "checkbox" ? (
          // Checkbox tunggal (Terms & Conditions)
          <Form.Check
            type="checkbox"
            name={field.name}
            label={field.label}
            checked={!!value}
            onChange={(e) => onChange({ target: { name: field.name, value: e.target.checked } })}
            isInvalid={!!error}
          />
        ) : field.type === "textarea" ? (
          <Form.Control
            as="textarea"
            name={field.name}
            placeholder={field.placeholder}
            value={value}
            onChange={onChange}
            isInvalid={!!error}
            autoFocus={autoFocus}
          />
        ) : field.type === "radio" ? (
          field.options.map((option, idx) => (
            <Form.Check
              key={idx}
              type="radio"
              name={field.name}
              label={option.label}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              isInvalid={!!error}
            />
          ))
        ) : (
          <Form.Control
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={value}
            onChange={onChange}
            isInvalid={!!error}
            autoFocus={autoFocus}
          />
        )}

        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
    </Col>
  );
};

export default FormField;
