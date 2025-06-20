// src/utils/checkAuthAndRefresh.js
import axios from 'axios';

export const checkAuthAndRefresh = async () => {
  const access = localStorage.getItem('access');
  const refresh = localStorage.getItem('refresh');

  try {
    // Try accessing a protected route
    await axios.get('http://127.0.0.1:8000/api/notes/', {
      headers: { Authorization: `Bearer ${access}` },
    });

    return true; // Access token is valid
  } catch (err) {
    if (err.response && err.response.status === 401 && refresh) {
      // Try refreshing token
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh,
        });

        localStorage.setItem('access', res.data.access);
        return true;
      } catch (refreshErr) {
        console.error('❌ Refresh failed:', refreshErr);
        return false;
      }
    }

    return false;
  }
};
