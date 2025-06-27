// src/utils/checkAuthAndRefresh.js
import axios from 'axios';

export const checkAuthAndRefresh = async () => {
  const access = localStorage.getItem('access_token');   // ✅ consistent key
  const refresh = localStorage.getItem('refresh_token'); // ✅ consistent key

  if (!access) {
    console.log("❌ No access token");
    return false;
  }

  try {
    // ✅ Call a protected route to test access token
    await axios.get('http://127.0.0.1:8000/api/notes/', {
      headers: { Authorization: `Bearer ${access}` },
    });
    console.log("✅ Access token valid");
    return true;
  } catch (err) {
    console.log("⚠️ Access token failed", err.response?.status);

    if (err.response && err.response.status === 401 && refresh) {
      try {
        // ✅ Try refreshing the access token
        const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh,
        });

        localStorage.setItem('access', res.data.access); // ✅ consistent key
        console.log("🔁 Token refreshed successfully");
        return true;
      } catch (refreshErr) {
        console.error('❌ Refresh failed:', refreshErr.response?.data || refreshErr);
        return false;
      }
    }

    return false;
  }
};
