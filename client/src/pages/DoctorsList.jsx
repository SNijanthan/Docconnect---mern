import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Award, ChevronRight, Wifi } from "lucide-react";
import BookAppointment from "./BookAppointment";

const formatSpecialty = (s) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const { specialty } = useParams();

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

  const handleBookingSuccess = () => {
    setBookedSuccess(true);
    setTimeout(() => setBookedSuccess(false), 4000);
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-10 py-10 max-w-7xl mx-auto">
        <div className="mb-8 space-y-2">
          <div className="h-7 w-64 bg-muted animate-pulse rounded-xl" />
          <div className="h-4 w-44 bg-muted animate-pulse rounded-xl" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl border border-border p-6 space-y-4"
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-muted animate-pulse shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-4 bg-muted animate-pulse rounded-lg w-3/4" />
                  <div className="h-3 bg-muted animate-pulse rounded-lg w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-muted animate-pulse rounded-lg" />
                <div className="h-3 bg-muted animate-pulse rounded-lg w-5/6" />
              </div>
              <div className="h-10 bg-muted animate-pulse rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4 px-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-2xl">
          ⚠️
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground">Failed to load</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
        <Button variant="outline" onClick={fetchDoctors} className="rounded-xl">
          Retry
        </Button>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3 px-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-2xl">
          🔍
        </div>
        <p className="font-semibold text-foreground">No doctors found</p>
        <p className="text-sm text-muted-foreground">
          No doctors available for "{formatSpecialty(specialty)}" right now.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-7xl mx-auto">
        {/* Success Banner */}
        {bookedSuccess && (
          <div className="mb-6 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
            <span>✅</span>
            Appointment booked successfully! You can track it in My
            Appointments.
          </div>
        )}

        {/* Page Header */}
        <div className="mb-7">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {formatSpecialty(specialty)}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {doctors.length} doctor{doctors.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Doctors grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="group bg-card rounded-2xl border border-border hover:border-sky-200 dark:hover:border-sky-800/60 shadow-sm hover:shadow-lg hover:shadow-sky-500/5 dark:hover:shadow-sky-500/10 transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Card header gradient */}
              <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-blue-500 group-hover:from-sky-500 group-hover:to-blue-600 transition-colors" />

              <div className="p-6 flex flex-col flex-1">
                {/* Doctor info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative shrink-0">
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-border shadow-sm"
                    />
                    <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-card" />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h2 className="text-base font-semibold text-foreground leading-tight">
                      Dr. {doctor.name}
                    </h2>
                    <p className="text-sm text-sky-500 dark:text-sky-400 font-medium capitalize mt-0.5">
                      {formatSpecialty(doctor.specialties[0] || "")}
                    </p>
                    {doctor.credentials?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {doctor.credentials.slice(0, 3).map((c) => (
                          <span
                            key={c}
                            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                          >
                            <Award size={10} className="text-sky-500" />
                            {c.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs text-muted-foreground mb-5 flex-1">
                  {doctor?.address?.city && (
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-sky-400 shrink-0" />
                      <span>
                        {doctor.address.city}, {doctor.address.state}
                      </span>
                    </div>
                  )}
                  {doctor.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-sky-400 shrink-0" />
                      <span>{doctor.phone}</span>
                    </div>
                  )}
                  {doctor.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="text-sky-400 shrink-0" />
                      <span className="truncate">{doctor.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Wifi size={13} className="text-sky-400 shrink-0" />
                    <span>English, Tamil, Hindi</span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setIsOpen(true);
                  }}
                  className="w-full rounded-xl font-medium btn-sky text-white border-0 shadow-md shadow-sky-500/20 group-hover:shadow-sky-500/30 transition-shadow"
                >
                  Book Appointment
                  <ChevronRight size={15} className="ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
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
