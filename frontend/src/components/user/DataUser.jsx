









import React from 'react';  
import { Spinner, Alert } from 'react-bootstrap';  
  
import {user as formStructure} from "./user";
  
import useUser from "../../hooks/useUser";  
import useGetMe from "../../hooks/useGetMe";  
import DataList from '../data/DataList';  
  
import {getAllUsers, deleteUser, updateUser} from '../../services/userService';  

  
const DataUser = () => {  
  
const { user, loading: loadingMe, error: errorMe } = useGetMe();  
const { users, loading, error, refetch } = useUser();  
  
if (loadingMe) return <Spinner animation="border" variant="primary" />;  
if (errorMe) return <Alert variant="danger">Gagal mengambil data login</Alert>;  


if (user?.role !== "admin") return <Alert variant="warning">Anda tidak memiliki akses ke daftar pengguna.Kamiiiiii</Alert>;  
  
return (  
<DataList fetchFunction={getAllUsers}  
deleteFunction={deleteUser}  
editFunction={updateUser}  
 user={user} 
headers={[  
{ key: 'name', label: 'Nama' },  
{ key: 'email', label: 'Email' },
{ key: 'role', label: 'Role' }
 
]}  
formStructure={formStructure}

/>  
);  
};  
  
export default DataUser;  