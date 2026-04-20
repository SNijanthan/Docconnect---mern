import { useDispatch, useSelector } from "react-redux";
import {
  setDoctorAppointments,
  updateDoctorAppointmentStatus,
} from "../store/slices/appointmentSlice";
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
  User,
  Mail,
  CalendarClock,
  Stethoscope,
  CheckCheck,
  LayoutDashboard,
  Monitor,
  Hospital,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    icon: Clock,
    bar: "bg-amber-400",
    badge:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle,
    bar: "bg-sky-500",
    badge:
      "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800",
  },
  completed: {
    label: "Completed",
    icon: CheckCheck,
    bar: "bg-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    bar: "bg-red-400",
    badge:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
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
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-10 rounded-xl" />
        <Skeleton className="h-10 rounded-xl" />
      </div>
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

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const doctorAppointments = useSelector(
    (state) => state.appointments.doctorAppointments,
  );
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [actionLoadingMap, setActionLoadingMap] = useState({});

  const setActionLoading = (id, action) =>
    setActionLoadingMap((prev) => ({ ...prev, [id]: action }));
  const clearActionLoading = (id) =>
    setActionLoadingMap((prev) => ({ ...prev, [id]: null }));

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get(`${API_URL}/appointments/doctor`, {
        withCredentials: true,
      });
      dispatch(setDoctorAppointments(res.data.appointments ?? []));
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

  const handleAccept = async (id) => {
    setActionLoading(id, "accepting");
    try {
      await axios.patch(
        `${API_URL}/appointments/${id}/accept`,
        {},
        { withCredentials: true },
      );
      dispatch(updateDoctorAppointmentStatus({ id, status: "accepted" }));
      toast.success("Appointment accepted.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Could not accept appointment.",
      );
    } finally {
      clearActionLoading(id);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(id, "rejecting");
    try {
      await axios.patch(
        `${API_URL}/appointments/${id}/reject`,
        {},
        { withCredentials: true },
      );
      dispatch(updateDoctorAppointmentStatus({ id, status: "rejected" }));
      toast.success("Appointment rejected.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Could not reject appointment.",
      );
    } finally {
      clearActionLoading(id);
    }
  };

  const handleComplete = async (id) => {
    setActionLoading(id, "completing");
    try {
      await axios.patch(
        `${API_URL}/appointments/${id}/complete`,
        {},
        { withCredentials: true },
      );
      dispatch(updateDoctorAppointmentStatus({ id, status: "completed" }));
      toast.success("Appointment marked as completed.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Could not complete appointment.",
      );
    } finally {
      clearActionLoading(id);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="mb-8 space-y-2">
          <Skeleton className="h-8 w-64" />
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

  const stats = {
    total: doctorAppointments.length,
    pending: doctorAppointments.filter((a) => a.bookingStatus === "pending")
      .length,
    accepted: doctorAppointments.filter((a) => a.bookingStatus === "accepted")
      .length,
    completed: doctorAppointments.filter((a) => a.bookingStatus === "completed")
      .length,
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-7 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center shrink-0">
          <LayoutDashboard size={20} className="text-sky-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Patient Appointments
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {stats.total > 0
              ? `${stats.total} appointment${stats.total > 1 ? "s" : ""} received`
              : "Consultation requests will appear here"}
          </p>
        </div>
      </div>

      {/* Stats bar */}
      {stats.total > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {[
            {
              label: "Total",
              value: stats.total,
              color: "text-foreground",
              bg: "bg-muted/50",
            },
            {
              label: "Pending",
              value: stats.pending,
              color: "text-amber-600 dark:text-amber-400",
              bg: "bg-amber-50 dark:bg-amber-900/20",
            },
            {
              label: "Accepted",
              value: stats.accepted,
              color: "text-sky-600 dark:text-sky-400",
              bg: "bg-sky-50 dark:bg-sky-900/20",
            },
            {
              label: "Completed",
              value: stats.completed,
              color: "text-emerald-600 dark:text-emerald-400",
              bg: "bg-emerald-50 dark:bg-emerald-900/20",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`${s.bg} rounded-xl px-4 py-3 border border-border`}
            >
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {doctorAppointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center">
            <Stethoscope size={32} className="text-sky-400" />
          </div>
          <div>
            <p className="text-lg font-semibold">No appointments yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Patients who book with you will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctorAppointments.map((appointment) => {
            const actionLoading = actionLoadingMap[appointment._id];
            const isPending = appointment.bookingStatus === "pending";
            const isAccepted = appointment.bookingStatus === "accepted";
            const statusConfig = STATUS_CONFIG[appointment.bookingStatus] ?? {};

            const patientInitials =
              appointment.user?.name
                ?.split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("") ?? "?";
            const genderEmoji =
              appointment.user?.gender === "female" ? "👩" : "👤";

            return (
              <Card
                key={appointment._id}
                className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-border flex flex-col"
              >
                <div className={`h-1 w-full ${statusConfig.bar}`} />

                <CardHeader className="pb-4 pt-5 px-5 space-y-0">
                  <div className="flex items-start gap-3 mb-1">
                    <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-sky-700 dark:text-sky-300 text-sm font-bold shrink-0 border-2 border-border shadow-sm select-none">
                      {patientInitials}
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-sm font-semibold leading-tight truncate">
                        {appointment.user?.name ?? "Unknown Patient"}
                      </p>
                      {appointment.user?.email && (
                        <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1 truncate">
                          <Mail size={11} className="shrink-0" />
                          {appointment.user.email}
                        </p>
                      )}
                    </div>
                    <StatusBadge status={appointment.bookingStatus} />
                  </div>
                </CardHeader>

                <CardContent className="px-5 pb-5 pt-0 flex flex-col gap-4 flex-1">
                  <div className="grid grid-cols-2 gap-2">
                    <InfoChip
                      icon={User}
                      label="Gender"
                      value={
                        appointment.user?.gender
                          ? `${genderEmoji} ${appointment.user.gender.charAt(0).toUpperCase() + appointment.user.gender.slice(1)}`
                          : "N/A"
                      }
                    />
                    <InfoChip
                      icon={CalendarClock}
                      label="Type"
                      value={
                        appointment.bookingType === "online"
                          ? "💻 Online"
                          : "🏥 In-person"
                      }
                    />
                  </div>

                  <div className="h-px bg-border" />

                  <div className="space-y-2.5">
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

                    {appointment.bookingType === "online" &&
                      appointment.meetingLink && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            Meeting
                          </span>
                          <a
                            href={appointment.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-sky-600 hover:underline dark:text-sky-400 underline-offset-4 truncate max-w-[140px]"
                          >
                            Join ↗
                          </a>
                        </div>
                      )}

                    {appointment.bookingType === "offline" &&
                      appointment.clinicAddress && (
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs text-muted-foreground shrink-0">
                            Clinic
                          </span>
                          <span className="text-xs font-medium text-right">
                            {appointment.clinicAddress}
                          </span>
                        </div>
                      )}
                  </div>

                  {/* Action buttons */}
                  {isPending && (
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <Button
                        variant="outline"
                        className="rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20 text-xs h-9"
                        disabled={!!actionLoading}
                        onClick={() => handleAccept(appointment._id)}
                      >
                        {actionLoading === "accepting" ? (
                          <span className="flex items-center gap-1.5">
                            <Spinner /> Accepting…
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <CheckCircle size={13} /> Accept
                          </span>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20 text-xs h-9"
                        disabled={!!actionLoading}
                        onClick={() => handleReject(appointment._id)}
                      >
                        {actionLoading === "rejecting" ? (
                          <span className="flex items-center gap-1.5">
                            <Spinner /> Rejecting…
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <XCircle size={13} /> Reject
                          </span>
                        )}
                      </Button>
                    </div>
                  )}

                  {isAccepted && (
                    <Button
                      variant="outline"
                      className="w-full mt-auto rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20 transition-colors"
                      disabled={!!actionLoading}
                      onClick={() => handleComplete(appointment._id)}
                    >
                      {actionLoading === "completing" ? (
                        <span className="flex items-center gap-2">
                          <Spinner /> Completing…
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <CheckCheck size={14} /> Mark as Completed
                        </span>
                      )}
                    </Button>
                  )}

                  {appointment.bookingStatus === "rejected" && (
                    <div className="mt-auto flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 px-3 py-2.5">
                      <XCircle size={14} className="text-red-500 shrink-0" />
                      <p className="text-xs font-medium text-red-600 dark:text-red-400">
                        Appointment rejected
                      </p>
                    </div>
                  )}

                  {appointment.bookingStatus === "cancelled" && (
                    <div className="mt-auto flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2.5">
                      <XCircle
                        size={14}
                        className="text-muted-foreground shrink-0"
                      />
                      <p className="text-xs font-medium text-muted-foreground">
                        Cancelled by patient
                      </p>
                    </div>
                  )}

                  {appointment.bookingStatus === "completed" && (
                    <div className="mt-auto flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20 px-3 py-2.5">
                      <CheckCheck
                        size={14}
                        className="text-emerald-600 dark:text-emerald-400 shrink-0"
                      />
                      <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        Consultation completed
                      </p>
                    </div>
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

export default DoctorAppointments;
