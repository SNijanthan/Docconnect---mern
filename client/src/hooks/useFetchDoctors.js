import axios from "axios";
import { useDispatch } from "react-redux";
import { allDoctors } from "../store/slices/doctorsSlice";
import { useEffect } from "react";

export const useFetchDoctors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctors`, {
          withCredentials: true,
        });
        dispatch(allDoctors(res?.data?.data));
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchDoctors();
  }, [dispatch]);
};
