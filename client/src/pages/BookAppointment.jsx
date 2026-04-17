import axios from "axios";
import { useState, useEffect, useRef } from "react";

const BookAppointment = ({ isOpen, setIsOpen, doctor, onSuccess }) => {
  const [date, setDate] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const overlayRef = useRef(null);

  const getLocalDateTime = () => {
    const now = new Date();
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate(),
    )}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  };

  const resetForm = () => {
    setDate("");
    setBookingType("");
    setError("");
  };

  const handleCancel = () => {
    resetForm();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) handleCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleCancel();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !bookingType) return;

    setLoading(true);
    setError("");

    try {
      const formattedDateTime = new Date(date).toISOString();

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointment`,
        {
          doctor: doctor?._id,
          bookingType,
          appointmentDateTime: formattedDateTime,
        },
        { withCredentials: true },
      );

      if (onSuccess) onSuccess(data.createAppointment);
      resetForm();
      setIsOpen(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again.",
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
      className="
        fixed inset-0 z-50
        flex items-end sm:items-center justify-center
        sm:px-4
        bg-black/50 backdrop-blur-sm
      "
    >
      {/* Modal Panel — slides up from bottom on mobile, centered on sm+ */}
      <div
        className="
          relative w-full sm:max-w-md
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-700
          rounded-t-3xl sm:rounded-2xl shadow-2xl
          px-5 pt-5 pb-8 sm:p-8
          animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle — visible on mobile only */}
        <div className="sm:hidden flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
        </div>

        {/* Close Button */}
        <button
          onClick={handleCancel}
          className="
            absolute top-4 right-4
            w-10 h-10 flex items-center justify-center
            rounded-full
            text-slate-400 hover:text-slate-600
            dark:text-slate-500 dark:hover:text-slate-300
            bg-slate-100 dark:bg-slate-800
            hover:bg-slate-200 dark:hover:bg-slate-700
            active:scale-95
            transition-all duration-150
            touch-manipulation
          "
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
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/40 mb-3">
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

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Book Appointment
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            with{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              Dr. {doctor.name}
            </span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Consultation Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Consultation Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "online", icon: "💻", label: "Online" },
                { value: "offline", icon: "🏥", label: "In-person" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBookingType(opt.value)}
                  className={`
                    flex flex-col items-center justify-center gap-1.5
                    py-4 px-4 rounded-2xl text-sm font-medium
                    border-2 transition-all duration-150
                    min-h-[72px]
                    touch-manipulation select-none
                    active:scale-95
                    ${
                      bookingType === opt.value
                        ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/25 scale-[1.02]"
                        : `
                          bg-slate-50 dark:bg-slate-800
                          border-slate-200 dark:border-slate-700
                          text-slate-600 dark:text-slate-400
                          hover:border-sky-300 dark:hover:border-sky-700
                          hover:text-sky-600 dark:hover:text-sky-400
                        `
                    }
                  `}
                >
                  <span className="text-xl leading-none">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={date}
              min={getLocalDateTime()}
              onChange={(e) => setDate(e.target.value)}
              required
              className="
                w-full h-12 px-3 rounded-xl text-sm
                bg-slate-50 dark:bg-slate-800
                border border-slate-200 dark:border-slate-700
                text-slate-900 dark:text-slate-100
                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
                dark:[color-scheme:dark]
                transition-all duration-150
                touch-manipulation
              "
            />
          </div>

          {/* Error */}
          {error && (
            <div
              className="
              flex items-center gap-2 px-3 py-2.5 rounded-xl
              bg-red-50 dark:bg-red-900/20
              border border-red-200 dark:border-red-800
              text-red-600 dark:text-red-400 text-sm
            "
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row-reverse pt-1">
            {/* Primary — Confirm */}
            <button
              type="submit"
              disabled={loading || !date || !bookingType}
              className="
                flex-1 h-13 sm:h-11 rounded-xl text-sm font-semibold text-white
                bg-sky-500 hover:bg-sky-600
                disabled:opacity-40 disabled:cursor-not-allowed
                shadow-md shadow-sky-500/25
                active:scale-[0.98]
                transition-all duration-150
                touch-manipulation
              "
              style={{ minHeight: "52px" }}
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
                  Booking...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </button>

            {/* Secondary — Cancel */}
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="
                flex-1 rounded-xl text-sm font-medium
                border border-slate-200 dark:border-slate-700
                text-slate-600 dark:text-slate-400
                bg-white dark:bg-slate-800
                hover:bg-slate-50 dark:hover:bg-slate-700
                disabled:opacity-40 disabled:cursor-not-allowed
                active:scale-[0.98]
                transition-all duration-150
                touch-manipulation
              "
              style={{ minHeight: "52px" }}
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
