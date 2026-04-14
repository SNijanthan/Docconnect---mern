import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const { specialty } = useParams();

  const doctorsApi = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/doctors/specialty?specialty=${specialty}`,
        { withCredentials: true },
      );
      setDoctors(res?.data?.doctors || []);
    } catch (error) {
      console.log(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    doctorsApi();
  }, [specialty]);

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg font-medium">
        Loading doctors...
      </div>
    );
  }

  // ❌ Empty state
  if (doctors.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg text-muted-foreground">
        No doctors found for "{specialty}"
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      {doctors.map((doctor) => (
        <Card
          key={doctor._id}
          className="p-5 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-sky-100 dark:bg-slate-950"
        >
          {/* Doctor Image */}
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-primary/20 shadow-sm"
          />

          {/* Doctor Info */}
          <div className="mt-4 space-y-2">
            <h2 className="text-lg font-semibold">{doctor.name}</h2>

            <p className="text-sm text-muted-foreground capitalize">
              {doctor.specialties[0]}
            </p>

            <div className="text-xs text-muted-foreground space-y-1">
              {doctor.credentials.map((credit, index) => (
                <p key={index}>{credit}</p>
              ))}
            </div>
            <p className="text-xs text-muted-foreground space-y-1">
              Fluent in English, Tamil and Hindi
            </p>
          </div>

          {/* Button */}
          <Button className="mt-5 w-full rounded-xl text-sm font-medium hover:scale-105 transition-transform bg-sky-500 cursor-pointer">
            Book Appointment
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default DoctorsList;

// ! TODO:
// ! Complete Doctors list card - Done
// ! Add doctor appointment API
// ! Update my appointments page and features
