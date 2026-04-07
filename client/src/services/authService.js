import axios from "axios";

export const userRegister = async (formData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/user/register`,
      formData,
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const userLogin = async () => {};

export const doctorRegister = async () => {};

export const doctorLogin = async () => {};
