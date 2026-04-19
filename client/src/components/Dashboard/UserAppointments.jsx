import { useDispatch, useSelector } from "react-redux";
import {
  setUserAppointments,
  updateAppointmentStatus,
} from "../../store/slices/appointmentSlice";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { toast } from "sonner";
import {
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  IndianRupee,
  Languages,
  Stethoscope,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const CANCELLABLE_STATUSES = ["pending", "confirmed"];

const HARDCODED_CONSULT_FEE = 500;
const HARDCODED_LANGUAGES = "English, Tamil, Hindi";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    icon: Clock,
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    className:
      "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  },
};

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] ?? {};
  const Icon = config.icon ?? Clock;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${config.className}`}
    >
      <Icon size={12} />
      {config.label ?? status}
    </span>
  );
};

const InfoChip = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 rounded-xl px-3 py-2">
    <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center shrink-0">
      <Icon size={14} className="text-sky-600 dark:text-sky-400" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-muted-foreground leading-none mb-0.5">
        {label}
      </p>
      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
        {value}
      </p>
    </div>
  </div>
);

const AppointmentCardSkeleton = () => (
  <Card className="rounded-2xl overflow-hidden">
    <div className="h-1.5 bg-slate-100 dark:bg-slate-800" />
    <CardHeader className="pb-3 pt-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </CardHeader>
    <CardContent className="space-y-3 pt-0">
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-14 rounded-xl" />
        <Skeleton className="h-14 rounded-xl" />
        <Skeleton className="h-14 rounded-xl" />
      </div>
      <Skeleton className="h-px w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-10 w-full rounded-xl mt-1" />
    </CardContent>
  </Card>
);

const UserAppointments = () => {
  const dispatch = useDispatch();
  const userAppointments = useSelector(
    (state) => state.appointments.userAppointments,
  );

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [cancelLoadingId, setCancelLoadingId] = useState(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get(`${API_URL}/appointments/user`, {
        withCredentials: true,
      });
      dispatch(setUserAppointments(res.data.appointments ?? []));
    } catch (error) {
      setFetchError(
        error.response?.data?.message ?? "Failed to load appointments.",
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleCancel = async (id) => {
    setCancelLoadingId(id);
    try {
      await axios.patch(
        `${API_URL}/appointment/${id}/cancel`,
        {},
        { withCredentials: true },
      );
      dispatch(updateAppointmentStatus({ id, status: "cancelled" }));
      toast.success("Appointment cancelled successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Could not cancel appointment.",
      );
    } finally {
      setCancelLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-8 w-52 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <AppointmentCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
            <XCircle size={28} className="text-red-500" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              Something went wrong
            </p>
            <p className="text-sm text-muted-foreground mt-1">{fetchError}</p>
          </div>
          <Button
            variant="outline"
            onClick={fetchAppointments}
            className="rounded-xl"
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          My Appointments
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {userAppointments.length > 0
            ? `${userAppointments.length} appointment${userAppointments.length > 1 ? "s" : ""} found`
            : "Manage and track your consultations"}
        </p>
      </div>

      {userAppointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center">
            <Stethoscope size={32} className="text-sky-500" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              No appointments yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Book a consultation to get started.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {userAppointments.map((appointment) => {
            const isCancellable = CANCELLABLE_STATUSES.includes(
              appointment.bookingStatus,
            );
            const isCancelling = cancelLoadingId === appointment._id;
            const initials =
              appointment.doctor?.name
                ?.split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("") ?? "?";

            return (
              <Card
                key={appointment._id}
                className="rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-slate-200/80 dark:border-slate-700/60 flex flex-col"
              >
                {/* Header */}
                <CardHeader className="pb-4 pt-5 px-5 space-y-0">
                  {/* Doctor identity */}
                  <div className="flex items-start gap-3 mb-4">
                    {appointment.doctor?.imageUrl ? (
                      <img
                        src={appointment.doctor.imageUrl}
                        alt={appointment.doctor?.name}
                        className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-white dark:border-slate-700 shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-sky-700 dark:text-sky-300 text-sm font-semibold shrink-0 border-2 border-white dark:border-slate-700 shadow-sm">
                        {initials}
                      </div>
                    )}
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight truncate">
                        Dr. {appointment.doctor?.name ?? "Unknown Doctor"}
                      </p>
                      {appointment.doctor?.address?.city && (
                        <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1 truncate">
                          <MapPin size={11} className="shrink-0" />
                          {appointment.doctor.address.city},{" "}
                          {appointment.doctor.address.state}
                        </p>
                      )}
                    </div>
                    <StatusBadge status={appointment.bookingStatus} />
                  </div>

                  {/* Specialties */}
                  {appointment.doctor?.specialties?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {appointment.doctor.specialties.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800 capitalize"
                        >
                          {s.replace(/-/g, " ")}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Credentials */}
                  {appointment.doctor?.credentials?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {appointment.doctor.credentials.map((c) => (
                        <span
                          key={c}
                          className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="px-5 pb-5 pt-0 flex flex-col gap-4 flex-1">
                  {/* Info chips — fee, languages, availability */}
                  <div className="grid grid-cols-1 gap-2">
                    <InfoChip
                      icon={IndianRupee}
                      label="Consult fee"
                      value={`₹${HARDCODED_CONSULT_FEE}`}
                    />
                    <InfoChip
                      icon={Languages}
                      label="Languages"
                      value={HARDCODED_LANGUAGES}
                    />
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-100 dark:bg-slate-800" />

                  {/* Appointment details */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Consultation
                      </span>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize">
                        {appointment.bookingType === "online"
                          ? "💻 Online"
                          : "🏥 In-person"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Date & Time
                      </span>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 tabular-nums">
                        {new Date(
                          appointment.appointmentDateTime,
                        ).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Cancel button — pushed to bottom */}
                  {isCancellable && (
                    <Button
                      variant="outline"
                      className="w-full mt-auto rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                      disabled={isCancelling}
                      onClick={() => handleCancel(appointment._id)}
                    >
                      {isCancelling ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="w-3.5 h-3.5 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                            />
                          </svg>
                          Cancelling…
                        </span>
                      ) : (
                        "Cancel Appointment"
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserAppointments;
