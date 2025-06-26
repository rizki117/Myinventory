








import { Button } from "react-bootstrap";

const FormActions = ({ handleClose, isLoading }) => {
  return (
    <div className="d-flex justify-content-end gap-2 mt-3">
      <Button variant="danger" onClick={handleClose} disabled={isLoading}>
        Batal
      </Button>
      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? "Menyimpan..." : "Simpan"}
      </Button>
    </div>
  );
};

export default FormActions;
