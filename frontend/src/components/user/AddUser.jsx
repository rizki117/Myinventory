









import AddData from "../formadd/AddData";
import { user } from "./user";
import { createUser } from "../../services/userService";

const AddUser = ({ onSuccess }) => {
  const token = localStorage.getItem("accessToken");

  const handleCreate = (data) => createUser(data, token);

  return (
    <AddData
      title="Form Add New User"
      fields={user}
      createFunction={handleCreate}
      initialData={{name: "", email: "", password: "", confPassword: "", role: "", nohp: ""}}
      onSuccess={onSuccess} // teruskan ke AddData
    />
  );
};

export default AddUser;


