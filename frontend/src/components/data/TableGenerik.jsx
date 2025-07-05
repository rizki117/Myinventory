
//bagian components/data/
//bagian components/data/TableGenerik.jsx

import React from "react";
import { Table, Container } from "react-bootstrap";
import ActionButton from "./ActionButton";
import { formatTableData } from "../../utils/formatTableData"; // Import utilitas

const TableGenerik = ({ data, headers, onDelete, onEdit }) => {
  return (
    <Container className="mt-3">
      <div className="table-responsive">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              {headers.map((head) => (
                <th className="text-center" key={head.key}>{head.label}</th>
              ))}

              {(onDelete || onEdit) && <th className="text-center">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((dat, i) => (
                <tr key={dat.id || i}>
                  <td>{i + 1}</td>
                  {headers.map((head) => (
                    <td key={head.key}>{formatTableData(dat[head.key])}</td> // Gunakan fungsi utilitas
                  ))}

                  {(onDelete || onEdit) && (
                    <td>
                      <ActionButton onEdit={() => onEdit(dat)} onDelete={() => onDelete(dat)} />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + 2}>Data Masih Kosong</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default TableGenerik;
