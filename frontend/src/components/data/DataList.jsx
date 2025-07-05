import React from "react";
import TableGenerik from "./TableGenerik";

import useFetchData from "../../hooks/useFetchData";
import useDeleteData from "../../hooks/useDeleteData";
import useEditData from "../../hooks/useEditData";

import CetakPDF from "../myprivate/CetakPDF";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import ConfirmDelete from "./ConfirmDelete";
import EditModal from "./EditModal";
import SuccessAlert from "./SuccessAlert";

import { Alert } from "react-bootstrap";

const DataList = ({
  fetchFunction,
  deleteFunction,
  editFunction,
  headers,
  user,
  formStructure,
  totalTabel // ✅ Tambah prop baru
}) => {
  const { data, setData, loading, error } = useFetchData(fetchFunction);

  const {
    itemToDelete,
    setItemToDelete,
    handleDelete,
    error: errorDelete,
    successMessage
  } = useDeleteData(deleteFunction, setData);

  const {
    itemToEdit,
    setItemToEdit,
    handleEdit,
    error: errorEdit,
    successMessage: editSuccess
  } = useEditData(editFunction, setData);

  if (loading) return <Loading message="Memuat data..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div>
      {successMessage && <SuccessAlert message={successMessage} />}
      {editSuccess && <SuccessAlert message={editSuccess} />}

      <CetakPDF data={data} user={user} headers={headers} totalTabel={totalTabel} /> {/* ✅ Tambahkan prop */}

      {data.length === 0 ? (
        <Alert variant="warning" className="mt-3 text-center">
          Data tidak ditemukan
        </Alert>
      ) : (
        <TableGenerik
          headers={headers}
          data={data}
          onDelete={(item) => setItemToDelete(item)}
          onEdit={(item) => setItemToEdit(item)}
        />
      )}

      <ConfirmDelete
        itemToDelete={itemToDelete}
        onConfirm={() => {
          handleDelete(itemToDelete.uuid);
          setItemToDelete(null);
        }}
        onCancel={() => setItemToDelete(null)}
        message={`Apakah Anda yakin ingin menghapus ${itemToDelete?.name}?`}
      />

      <EditModal
        show={!!itemToEdit}
        itemToEdit={itemToEdit}
        onConfirm={(updatedData) => {
          handleEdit(updatedData);
          setItemToEdit(null);
        }}
        onCancel={() => setItemToEdit(null)}
        formStructure={formStructure}
      />
    </div>
  );
};

export default DataList;
