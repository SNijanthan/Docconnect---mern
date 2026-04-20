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

export const doctorRegister = async (formData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/doctor/register`,
      formData,
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const loginAuth = async (formData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/user/login`,
      formData,
      { withCredentials: true },
    );
    return res.data;
  } catch (error) {
    const errData = error.response?.data;

    if (
      errData?.status === false &&
      errData?.message === "User does not exist"
    ) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/doctor/login`,
          formData,
          { withCredentials: true },
        );

        return res.data;
      } catch (doctorError) {
        throw (
          doctorError.response?.data || {
            message: "Login failed",
          }
        );
      }
    }

    throw errData || { message: "Something went wrong" };
  }
};
