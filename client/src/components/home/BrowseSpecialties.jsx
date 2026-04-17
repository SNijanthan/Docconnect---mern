import React from "react";
import { useNavigate } from "react-router-dom";

const BrowseSpecialties = () => {
  const navigate = useNavigate();

  const specialties = [
    "general-physician",
    "dermatology",
    "psychiatry",
    "pediatrics",
    "gastroenterology",
    "cardiology",
    "orthopedics",
    "neurology",
    "gynecology",
    "ent",
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-sky-100 dark:bg-slate-950">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 font-roboto">
        Consult top doctors online for any health concern
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto font-poppins">
        {specialties.map((specialty) => (
          <div
            key={specialty}
            onClick={() => navigate(`/doctors/${specialty}`)}
            className="flex flex-col items-center text-center cursor-pointer"
          >
            {/* Image */}
            <img
              src={`/icons/${specialty}.jpg`}
              alt={specialty}
              className="
                w-20 h-20 sm:w-24 sm:h-24
                rounded-full object-cover

                transition-transform duration-200
                hover:scale-105 active:scale-95
              "
            />

            {/* Label */}
            <p className="mt-4 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
              {specialty
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseSpecialties;
