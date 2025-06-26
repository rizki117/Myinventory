









import { useState } from "react"; import { getProdukById } from "../../services/produkService";

const useGetProdukById = (id, token) => { const [produk, setProduk] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(null);

useEffect(() => { if (!token || !id) return;

const fetchProduk = async () => { setLoading(true); try { const data = await getProdukById(id, token); setProduk(data); setError(null); } catch (err) { setError(err); } setLoading(false); }; fetchProduk(); 

}, [id, token]);

return { produk, loading, error }; };

export default useGetProdukById;

