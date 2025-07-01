// src/utils/checkAuthAndRefresh.js
import axiosInstance from '../api/axiosInstance';
import { default as jwt_decode } from 'jwt-decode'; // ✅ Safe fallback
 // install via: npm install jwt-decode

export const checkAuthAndRefresh = async () => {
  const access = localStorage.getItem('access_token');
  const refresh = localStorage.getItem('refresh_token');

  if (!access) {
    console.log("❌ No access token");
    return false;
  }

  try {
    const decoded = jwt_decode(access);
    const now = Date.now() / 1000; // in seconds

    if (decoded.exp < now) {
      console.warn("⚠️ Access token expired");
      if (!refresh) return false;

      try {
        const res = await axiosInstance.post('token/refresh/', { refresh }, { withCredentials: true });
        localStorage.setItem('access_token', res.data.access);
        console.log("🔁 Token refreshed");
        return true;
      } catch (err) {
        console.error("❌ Refresh failed:", err.response?.data || err.message);
        return false;
      }
    } else {
      // Access token still valid
      return true;
    }
  } catch (err) {
    console.error("❌ Invalid token or decode failed:", err);
    return false;
  }
};
