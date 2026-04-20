import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-sky-50 via-blue-50/50 to-background dark:from-slate-900 dark:via-slate-900 dark:to-background relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-sky-200/30 dark:bg-sky-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/40 border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            Healthcare, made accessible everywhere.
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Connect With{" "}
            <span className="text-sky-500 dark:text-sky-400">
              Trusted Doctors
            </span>{" "}
            Online In Minutes.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
            Book consultations, manage appointments, and access quality
            healthcare — all in one place.
          </p>

          {/* Trust indicators */}
          <div className="flex items-center gap-5 justify-center md:justify-start pt-2">
            {[
              { value: "500+", label: "Doctors" },
              { value: "10K+", label: "Patients" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-lg font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute inset-0 bg-sky-200/20 dark:bg-sky-900/10 rounded-3xl blur-2xl scale-75 pointer-events-none" />
          <img
            src="/banner-doctors.webp"
            alt="doctor-banner"
            className="relative w-64 sm:w-80 md:w-96 lg:w-[420px] object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
