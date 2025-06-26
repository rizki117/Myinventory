








import { useState } from "react";
import { refreshToken } from "../services/authService";

const useRefreshToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await refreshToken();
      localStorage.setItem("accessToken", data.accessToken);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { refresh: handleRefresh, loading, error };
};

export default useRefreshToken;