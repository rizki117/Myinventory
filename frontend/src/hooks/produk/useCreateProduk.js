








import { useState } from "react";

import { createProduk } from "../../services/produkService";

const useCreateProduk = (token) => { const [loading, setLoading] = useState(false); const [error, setError] = useState(null); const [successMsg, setSuccessMsg] = useState("");

const create = async (data) => { setLoading(true); try { const res = await createProduk(data, token); setSuccessMsg(res.msg); setError(null); } catch (err) { setError(err); } setLoading(false); };

return { create, loading, error, successMsg }; };

export default useCreateProduk;

