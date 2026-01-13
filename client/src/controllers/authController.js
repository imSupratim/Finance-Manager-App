import api from "../api/axios";

// LOGIN
export const loginUser = async (formData) => {
  const res = await api.post("/auth/login", formData);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data));

  return res.data;
};

// REGISTER
export const registerUser = async (formData) => {
  const res = await api.post("/auth/register", formData);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data));

  return res.data;
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
