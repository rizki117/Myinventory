









import { useState } from "react";
 import { updateProduk } from "../../services/produkService";

const useUpdateProduk = (token) => { const [loading, setLoading] = useState(false); const [error, setError] = useState(null); const [successMsg, setSuccessMsg] = useState("");

const update = async (id, data) => { setLoading(true); try { const res = await updateProduk(id, data, token); setSuccessMsg(res.msg); setError(null); } catch (err) { setError(err); } setLoading(false); };

return { update, loading, error, successMsg }; };

export default useUpdateProduk;

