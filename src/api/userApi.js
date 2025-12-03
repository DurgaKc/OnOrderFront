import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const changePassword = async ({ oldPassword, newPassword }) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(
    `${backendUrl}/changePassword`,
    { oldPassword, newPassword },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
