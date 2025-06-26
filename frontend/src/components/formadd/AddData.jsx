








import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";

import GenerikForm from "./GenerikForm";
import SuccessAlert from "./SuccessAlert";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

const AddData = ({ title, fields, createFunction, initialData, onSuccess }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      await createFunction(data);
      setSuccessMessage("Data berhasil disimpan! yaaa");
      setShowForm(false);

      if (onSuccess) onSuccess();
    } catch (error) {
      // Menangkap pesan error dari backend atau fallback
      const errorMsg =
        error?.response?.data?.msg ||
        error.message ||
        "Gagal menyimpan data. Silakan coba lagi.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <Container>
      <Button
        variant="primary"
        className="text-center mt-2"
        onClick={() => setShowForm(true)}
      >
        + {title}
      </Button>

      <SuccessAlert message={successMessage} onClose={() => setSuccessMessage("")} />
      <ErrorMessage message={error} onClose={() => setError(null)} />
      <Loading show={loading} />

      <GenerikForm
        title={title}
        fields={fields}
        onSubmit={handleSubmit}
        show={showForm}
        handleClose={() => setShowForm(false)}
        initialData={initialData}
        loading={loading}
      />
    </Container>
  );
};

export default AddData;
