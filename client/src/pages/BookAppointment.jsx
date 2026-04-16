import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookAppointment = ({ isOpen, setIsOpen, doctor }) => {
  const [date, setDate] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Local datetime (correct for datetime-local)
  const getLocalDateTime = () => {
    const now = new Date();
    const pad = (n) => (n < 10 ? "0" + n : n);

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate(),
    )}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  };

  const minDateTime = getLocalDateTime();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !bookingType) return;

    setLoading(true);

    try {
      const formattedDateTime = new Date(date).toISOString();

      await axios.post(
        `${import.meta.env.VITE_API_URL}/appointment`,
        {
          doctor: doctor?._id,
          bookingType,
          appointmentDateTime: formattedDateTime,
        },
        { withCredentials: true },
      );

      setDate("");
      setBookingType("");
      setIsOpen(false);
    } catch (err) {
      console.error(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className="w-[95%] sm:max-w-md md:max-w-lg rounded-2xl p-6 sm:p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <DialogHeader className="text-center space-y-2">
            <DialogTitle className="text-xl sm:text-2xl">
              Book Appointment
            </DialogTitle>

            <DialogDescription>
              Dr. <span className="font-medium">{doctor?.name}</span>
            </DialogDescription>
          </DialogHeader>

          {/* Fields */}
          <FieldGroup className="space-y-5">
            <Field className="space-y-2">
              <Label>Consultation Type</Label>

              <Select value={bookingType} onValueChange={setBookingType}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="online">💻 Online</SelectItem>
                  <SelectItem value="offline">🏥 Offline</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field className="space-y-2">
              <Label>Date & Time</Label>

              <Input
                type="datetime-local"
                value={date}
                min={minDateTime}
                onChange={(e) => setDate(e.target.value)}
                required
                className="
                  h-11
                  bg-background
                  dark:bg-muted
                  focus-visible:ring-2
                  focus-visible:ring-primary
                "
              />
            </Field>
          </FieldGroup>

          {/* Footer */}
          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <DialogClose>
              <Button
                type="button"
                variant="destructive"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
