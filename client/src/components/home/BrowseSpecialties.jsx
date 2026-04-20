import { useNavigate } from "react-router-dom";

const specialties = [
  { key: "general-physician", emoji: "🩺" },
  { key: "dermatology", emoji: "✨" },
  { key: "psychiatry", emoji: "🧠" },
  { key: "pediatrics", emoji: "👶" },
  { key: "gastroenterology", emoji: "🫁" },
  { key: "cardiology", emoji: "❤️" },
  { key: "orthopedics", emoji: "🦴" },
  { key: "neurology", emoji: "⚡" },
  { key: "gynecology", emoji: "🌸" },
  { key: "ent", emoji: "👂" },
];

const formatLabel = (key) =>
  key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const BrowseSpecialties = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14 bg-gradient-to-b from-background to-sky-50/50 dark:to-slate-900/50 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400 mb-2">
            Find the right doctor
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Consult top doctors for any health concern
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
          {specialties.map(({ key, emoji }) => (
            <button
              key={key}
              onClick={() => navigate(`/doctors/${key}`)}
              className="group flex flex-col items-center text-center p-4 rounded-2xl border border-border bg-card hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-lg hover:shadow-sky-500/5 dark:hover:shadow-sky-500/10 transition-all duration-200 cursor-pointer active:scale-[0.97]"
            >
              {/* Image or emoji fallback */}
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 mb-3">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-border group-hover:border-sky-300 dark:group-hover:border-sky-600 transition-colors shadow-sm">
                  <img
                    src={`/icons/${key}.jpg`}
                    alt={formatLabel(key)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="hidden w-full h-full bg-sky-50 dark:bg-sky-900/30 items-center justify-center text-2xl"
                    aria-hidden="true"
                  >
                    {emoji}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-medium text-foreground group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                {formatLabel(key)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseSpecialties;
