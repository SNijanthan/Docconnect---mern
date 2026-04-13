import { Button } from "@/components/ui/button";

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
    mt-4 cursor-pointer
    inline-flex items-center justify-center gap-2

    px-4 py-2.5
    sm:px-5 sm:py-3
    md:px-6 md:py-3.5

    text-sm sm:text-base font-medium

    bg-sky-500 hover:bg-sky-600
    dark:bg-sky-600 dark:hover:bg-sky-500

    rounded-xl
    shadow-sm hover:shadow-md

    transition-all duration-300 ease-in-out
    hover:scale-[1.02] active:scale-[0.98]

    whitespace-nowrap
  "
          >
            Consult Now
            <span className="text-lg">→</span>
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
