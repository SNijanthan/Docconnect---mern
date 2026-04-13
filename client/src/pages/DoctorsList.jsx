import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  const { specialty } = useParams();
  console.log(doctors);

  const doctorsApi = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/doctors/specialty?specialty=${specialty}`,
        { withCredentials: true },
      );
      console.log(res?.data?.doctors);
      setDoctors(res?.data?.doctors);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    doctorsApi();
  }, []);

  return (
    doctors.length !== 0 && (
      <div>
        <h1>DoctorsList</h1>
      </div>
    )
  );
};

export default DoctorsList;
