import { useDispatch, useSelector } from "react-redux";
import {
  setUserAppointments,
  updateAppointmentStatus,
} from "../../store/slices/appointmentSlice";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner"; // or your toast lib of choice

const API_URL = import.meta.env.VITE_API_URL;

const CANCELLABLE_STATUSES = ["pending", "confirmed"];

const STATUS_VARIANT = {
  confirmed: "default",
  pending: "secondary",
  cancelled: "destructive",
  completed: "outline",
};

const AppointmentCardSkeleton = () => (
  <Card className="rounded-2xl">
    <CardHeader>
      <Skeleton className="h-5 w-32" />
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-9 w-full mt-3" />
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
      const msg =
        error.response?.data?.message ?? "Failed to load appointments.";
      setFetchError(msg);
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
      const msg =
        error.response?.data?.message ?? "Could not cancel appointment.";
      toast.error(msg);
    } finally {
      setCancelLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">My Appointments</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <AppointmentCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto text-center space-y-4">
        <p className="text-destructive font-medium">{fetchError}</p>
        <Button variant="outline" onClick={fetchAppointments}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">My Appointments</h2>

      {userAppointments.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium">No appointments yet</p>
          <p className="text-sm mt-1">Book a consultation to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {userAppointments.map((appt) => {
            const isCancellable = CANCELLABLE_STATUSES.includes(
              appt.bookingStatus,
            );
            const isCancelling = cancelLoadingId === appt._id;

            return (
              <Card
                key={appt._id}
                className="rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">
                    {appt.doctor?.name ?? "Unknown Doctor"}
                  </CardTitle>
                  {appt.doctor?.specialization && (
                    <p className="text-xs text-muted-foreground">
                      {appt.doctor.specialization}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <Badge variant="secondary">{appt.bookingType}</Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Status
                    </span>
                    <Badge
                      variant={STATUS_VARIANT[appt.bookingStatus] ?? "outline"}
                    >
                      {appt.bookingStatus}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm tabular-nums">
                      {new Date(appt.appointmentDateTime).toLocaleString(
                        undefined,
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        },
                      )}
                    </span>
                  </div>

                  {isCancellable && (
                    <Button
                      variant="destructive"
                      className="w-full mt-2"
                      disabled={isCancelling}
                      onClick={() => handleCancel(appt._id)}
                    >
                      {isCancelling ? "Cancelling…" : "Cancel Appointment"}
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
