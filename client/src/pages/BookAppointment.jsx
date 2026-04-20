import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAppointment } from "../store/slices/appointmentSlice";

const API_URL = import.meta.env.VITE_API_URL;

const BOOKING_TYPES = [
  { value: "online", icon: "💻", label: "Online" },
  { value: "offline", icon: "🏥", label: "In-person" },
];

function useFocusTrap(ref, isActive) {
  useEffect(() => {
    if (!isActive || !ref.current) return;
    const FOCUSABLE =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const el = ref.current;
    const focusable = [...el.querySelectorAll(FOCUSABLE)].filter(
      (n) => !n.disabled,
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    el.addEventListener("keydown", handleTab);
    return () => el.removeEventListener("keydown", handleTab);
  }, [isActive, ref]);
}

const BookAppointment = ({ isOpen, setIsOpen, doctor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const triggerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen) triggerRef.current = document.activeElement;
  }, [isOpen]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const minDateTime = useMemo(() => {
    const now = new Date();
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }, []);

  useFocusTrap(modalRef, isOpen);

  const resetForm = useCallback(() => {
    setDate("");
    setBookingType("");
    setError("");
    setAttempted(false);
    setSuccessMsg("");
  }, []);

  const handleCancel = useCallback(() => {
    resetForm();
    setIsOpen(false);
    setTimeout(() => triggerRef.current?.focus(), 0);
  }, [resetForm, setIsOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleCancel]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleCancel();
  };

  const getDuplicateSlotError = (err) => {
    const status = err.response?.status;
    const message = (err.response?.data?.message ?? "").toLowerCase();
    const isDuplicate =
      status === 409 ||
      message.includes("duplicate") ||
      message.includes("already booked") ||
      message.includes("slot") ||
      message.includes("e11000");
    return isDuplicate
      ? "This time slot is already booked. Please pick a different date or time."
      : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttempted(true);
    if (!date || !bookingType) return;
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        `${API_URL}/appointment`,
        {
          doctor: doctor?._id,
          bookingType,
          appointmentDateTime: new Date(date).toISOString(),
        },
        { withCredentials: true },
      );
      dispatch(addAppointment(data.createAppointment));
      setSuccessMsg("Appointment booked! Redirecting…");
      timerRef.current = setTimeout(() => {
        resetForm();
        setIsOpen(false);
        navigate("/home");
      }, 2000);
    } catch (err) {
      const duplicateError = getDuplicateSlotError(err);
      setError(
        duplicateError ??
          err.response?.data?.message ??
          "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !doctor) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:px-4 bg-black/60 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        className="relative w-full sm:max-w-md bg-card border border-border rounded-t-3xl sm:rounded-2xl shadow-2xl px-5 pt-5 pb-8 sm:p-8 animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500" />

        {/* Drag handle — mobile */}
        <div className="sm:hidden flex justify-center mb-4" aria-hidden="true">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Close */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground bg-muted hover:bg-accent active:scale-95 transition-all duration-150"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6 pt-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-900/30 mb-3 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-sky-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <h2
            id="modal-title"
            className="text-xl font-bold text-foreground tracking-tight"
          >
            Book Appointment
          </h2>
          <p id="modal-desc" className="mt-1 text-sm text-muted-foreground">
            with{" "}
            <span className="font-semibold text-sky-600 dark:text-sky-400">
              Dr. {doctor.name}
            </span>
          </p>
        </div>

        {/* Success */}
        {successMsg && (
          <div
            role="status"
            className="flex items-center gap-2 px-3 py-3 mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Type selector */}
          <fieldset className="space-y-2">
            <legend className="block text-sm font-medium text-foreground mb-2">
              Consultation Type
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {BOOKING_TYPES.map((opt) => {
                const selected = bookingType === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setBookingType(opt.value)}
                    aria-pressed={selected}
                    className={`flex flex-col items-center justify-center gap-2 py-4 px-4 rounded-2xl text-sm font-medium border-2 transition-all duration-150 min-h-[72px] touch-manipulation select-none active:scale-95 ${
                      selected
                        ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/25 scale-[1.02]"
                        : "bg-muted/50 border-border text-muted-foreground hover:border-sky-300 dark:hover:border-sky-700 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-sky-900/10"
                    }`}
                  >
                    <span className="text-xl leading-none">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
            {attempted && !bookingType && (
              <p
                role="alert"
                className="text-xs text-red-500 dark:text-red-400 mt-1"
              >
                Please select a consultation type.
              </p>
            )}
          </fieldset>

          {/* Date & Time */}
          <div className="space-y-1.5">
            <label
              htmlFor="appointment-datetime"
              className="block text-sm font-medium text-foreground"
            >
              Date & Time
            </label>
            <input
              id="appointment-datetime"
              type="datetime-local"
              value={date}
              min={minDateTime}
              onChange={(e) => {
                setDate(e.target.value);
                if (error) setError("");
              }}
              required
              aria-required="true"
              aria-invalid={attempted && !date ? "true" : "false"}
              className="w-full h-11 px-3 rounded-xl text-sm bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 dark:[color-scheme:dark] transition-all duration-150"
            />
            {attempted && !date && (
              <p
                role="alert"
                className="text-xs text-red-500 dark:text-red-400 mt-1"
              >
                Please choose a date and time.
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-2.5 sm:flex-row-reverse pt-1">
            <button
              type="submit"
              disabled={loading || !!successMsg}
              className="flex-1 h-12 rounded-xl text-sm font-semibold text-white btn-sky disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-sky-500/25 active:scale-[0.98] transition-all touch-manipulation"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
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
                  Booking…
                </span>
              ) : (
                "Confirm Booking"
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 h-12 rounded-xl text-sm font-medium border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all touch-manipulation"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
