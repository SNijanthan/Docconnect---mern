import axios from "axios";

export const doctorsApi = async () => {
  try {
    const res = await axios.get();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
