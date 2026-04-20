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
  CalendarDays,
  Monitor,
  Hospital,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;
const CANCELLABLE_STATUSES = ["pending", "confirmed"];
const HARDCODED_CONSULT_FEE = 500;
const HARDCODED_LANGUAGES = "English, Tamil, Hindi";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    icon: Clock,
    bar: "bg-amber-400",
    badge:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    bar: "bg-sky-500",
    badge:
      "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    bar: "bg-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    bar: "bg-slate-300 dark:bg-slate-700",
    badge:
      "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  },
};

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] ?? {};
  const Icon = config.icon ?? Clock;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${config.badge}`}
    >
      <Icon size={11} />
      {config.label ?? status}
    </span>
  );
};

const InfoChip = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2.5 bg-muted/50 border border-border rounded-xl px-3 py-2.5">
    <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center shrink-0">
      <Icon size={13} className="text-sky-500 dark:text-sky-400" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-muted-foreground leading-none mb-0.5">
        {label}
      </p>
      <p className="text-xs font-medium text-foreground truncate">{value}</p>
    </div>
  </div>
);

const CardSkeleton = () => (
  <Card className="rounded-2xl overflow-hidden border border-border">
    <div className="h-1 bg-muted" />
    <CardHeader className="pb-3 pt-5">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-5 w-20 rounded-full mt-3" />
    </CardHeader>
    <CardContent className="space-y-3 pt-0">
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-14 rounded-xl" />
        <Skeleton className="h-14 rounded-xl" />
      </div>
      <Skeleton className="h-px" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-10 rounded-xl" />
    </CardContent>
  </Card>
);

const Spinner = () => (
  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
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
        <div className="mb-8 space-y-2">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
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
            <p className="font-semibold">Something went wrong</p>
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
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center shrink-0">
          <CalendarDays size={20} className="text-sky-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Appointments</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {userAppointments.length > 0
              ? `${userAppointments.length} appointment${userAppointments.length > 1 ? "s" : ""} found`
              : "Manage and track your consultations"}
          </p>
        </div>
      </div>

      {userAppointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center">
            <Stethoscope size={32} className="text-sky-400" />
          </div>
          <div>
            <p className="text-lg font-semibold">No appointments yet</p>
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
            const statusConfig = STATUS_CONFIG[appointment.bookingStatus] ?? {};
            const initials =
              appointment.doctor?.name
                ?.split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("") ?? "?";

            return (
              <Card
                key={appointment._id}
                className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-border flex flex-col"
              >
                {/* Status accent bar */}
                <div className={`h-1 w-full ${statusConfig.bar}`} />

                <CardHeader className="pb-4 pt-5 px-5 space-y-0">
                  <div className="flex items-start gap-3 mb-3">
                    {appointment.doctor?.imageUrl ? (
                      <img
                        src={appointment.doctor.imageUrl}
                        alt={appointment.doctor?.name}
                        className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-border shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-sky-700 dark:text-sky-300 text-sm font-bold shrink-0 border-2 border-border shadow-sm">
                        {initials}
                      </div>
                    )}
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-sm font-semibold leading-tight truncate">
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
                          className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="px-5 pb-5 pt-0 flex flex-col gap-4 flex-1">
                  <div className="grid grid-cols-2 gap-2">
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

                  <div className="h-px bg-border" />

                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Consultation
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
                        {appointment.bookingType === "online" ? (
                          <>
                            <Monitor size={12} className="text-sky-500" />{" "}
                            Online
                          </>
                        ) : (
                          <>
                            <Hospital size={12} className="text-sky-500" />{" "}
                            In-person
                          </>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Date & Time
                      </span>
                      <span className="text-xs font-medium tabular-nums">
                        {new Date(
                          appointment.appointmentDateTime,
                        ).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>

                  {isCancellable && (
                    <Button
                      variant="outline"
                      className="w-full mt-auto rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                      disabled={isCancelling}
                      onClick={() => handleCancel(appointment._id)}
                    >
                      {isCancelling ? (
                        <span className="flex items-center gap-2">
                          <Spinner /> Cancelling…
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
