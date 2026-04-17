import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BookAppointment from "./BookAppointment";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const { specialty } = useParams();

  // ✅ Stable reference — won't cause infinite useEffect loop
  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/doctors/specialty?specialty=${specialty}`,
        { withCredentials: true },
      );
      setDoctors(res?.data?.doctors || []);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load doctors.");
    } finally {
      setLoading(false);
    }
  }, [specialty]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleBookingSuccess = (appointment) => {
    setBookedSuccess(true);
    // Auto-hide the success banner after 4 seconds
    setTimeout(() => setBookedSuccess(false), 4000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg font-medium">
        Loading doctors...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <p className="text-red-500 text-lg">{error}</p>
        <Button variant="outline" onClick={fetchDoctors}>
          Retry
        </Button>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg text-muted-foreground">
        No doctors found for "{specialty}"
      </div>
    );
  }

  return (
    <>
      {/* Success Banner */}
      {bookedSuccess && (
        <div className="mx-4 sm:mx-6 lg:mx-10 mt-4 p-3 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm text-center">
          ✅ Appointment booked successfully!
        </div>
      )}

      <div className="px-4 sm:px-6 lg:px-10 py-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Card
            key={doctor._id}
            className="
              relative group overflow-hidden
              rounded-3xl p-6
              bg-white/70 dark:bg-slate-900/60
              backdrop-blur-xl border border-white/20
              shadow-lg hover:shadow-2xl
              transition-all duration-300
              hover:-translate-y-2
            "
          >
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-br from-sky-400/10 to-purple-400/10" />

            {/* Top Section */}
            <div className="relative flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="
                    w-24 h-24 sm:w-28 sm:h-28
                    object-cover rounded-full
                    border-4 border-white shadow-lg
                  "
                />
                {/* Status Badge */}
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>

              <h2 className="mt-4 text-lg font-semibold">Dr. {doctor.name}</h2>
              <p className="text-sm text-sky-500 font-medium capitalize">
                {doctor.specialties[0]}
              </p>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-border/50" />

            {/* Info Section */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="line-clamp-2 text-xs">
                {doctor.credentials.join(", ")}
              </p>
              <p className="text-xs">🌐 English, Tamil, Hindi</p>
              <div className="space-y-1 text-xs">
                <p>
                  📍 {doctor?.address?.city}, {doctor?.address?.state}
                </p>
                <p>📞 {doctor.phone}</p>
                <p className="truncate">✉️ {doctor.email}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="relative mt-6">
              <Button
                onClick={() => {
                  setSelectedDoctor(doctor);
                  setIsOpen(true);
                }}
                className="
                  w-full rounded-xl text-sm font-medium
                  bg-linear-to-r from-sky-500 to-blue-600
                  hover:from-sky-600 hover:to-blue-700
                  transition-all duration-300
                  shadow-md hover:shadow-lg
                  group-hover:scale-[1.02]
                "
              >
                Book Appointment
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <BookAppointment
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        doctor={selectedDoctor}
        onSuccess={handleBookingSuccess}
      />
    </>
  );
};

export default DoctorsList;
