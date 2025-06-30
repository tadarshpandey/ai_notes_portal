// src/utils/checkAuthAndRefresh.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const checkAuthAndRefresh = async () => {
  const access = localStorage.getItem('access_token');   // ✅ consistent key
  const refresh = localStorage.getItem('refresh_token'); // ✅ consistent key

  if (!access) {
    console.log("❌ No access token");
    return false;
  }

  try {
    // ✅ Call a protected route to test access token
    await axios.get(`${API_URL}notes/`, {
      headers: { Authorization: `Bearer ${access}` },
    });
    console.log("✅ Access token valid");
    return true;
  } catch (err) {
    console.warn("⚠️ Access token check failed", err.response?.status || err.message);

    if (err.response?.status === 401 && refresh) {
      try {
        // ✅ Try refreshing the access token
        const res = await axios.post(`${API_URL}token/refresh/`, { refresh });

        localStorage.setItem('access_token', res.data.access); // ✅ fixed key
        console.log("🔁 Token refreshed successfully");
        return true;
      } catch (refreshErr) {
        console.error('❌ Token refresh failed:', refreshErr.response?.data || refreshErr.message);
        return false;
      }
    }

    console.warn("⚠️ No valid refresh token or unknown error");
    return false;
  }
};
