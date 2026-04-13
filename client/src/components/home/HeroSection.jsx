import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full bg-sky-100 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <p className="font-semibold text-sky-500 dark:text-sky-400 text-base sm:text-lg">
            Healthcare, made accessible everywhere.
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
            Connect With Trusted Doctors Online In Minutes.
          </h1>

          <Button
            className="
    inline-flex items-center gap-1.5

    px-3 py-1.5
    sm:px-4 sm:py-2

    text-xs sm:text-sm font-medium

    bg-sky-500 hover:bg-sky-600
    dark:bg-sky-600 dark:hover:bg-sky-500

    rounded-lg
    shadow-none hover:shadow-sm

    transition-all duration-200

    whitespace-nowrap
  "
          >
            {/* Icon */}
            <Stethoscope className="w-4 h-4" />

            {/* Text (hidden on mobile) */}
            <span className=" sm:inline">Consult Now</span>
          </Button>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/banner-doctors.webp"
            alt="doctor-banner"
            className="w-64 sm:w-80 md:w-105 lg:w-120 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
