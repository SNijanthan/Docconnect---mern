import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const statsData = [
  {
    id: 1,
    icon: "⚠️",
    text: "1 in 10 adults worldwide is living with diabetes",
  },
  {
    id: 2,
    icon: "🇮🇳",
    text: "Over 77 million people in India are affected by diabetes",
  },
  {
    id: 3,
    icon: "🚨",
    text: "More than 60% of people delay visiting a doctor for symptoms",
  },
  {
    id: 4,
    icon: "❤️",
    text: "Heart disease is the leading cause of death globally",
  },
  { id: 5, icon: "🍔", text: "1 in 4 adults in India is overweight or obese" },
  {
    id: 6,
    icon: "🧠",
    text: "Depression affects over 280 million people worldwide",
  },
  {
    id: 7,
    icon: "⏳",
    text: "Average waiting time to see a doctor can exceed 2 hours",
  },
  {
    id: 8,
    icon: "🚬",
    text: "Tobacco use causes more than 8 million deaths each year",
  },
  {
    id: 9,
    icon: "🛌",
    text: "Around 35% of adults do not get enough sleep daily",
  },
  {
    id: 10,
    icon: "🏃",
    text: "Physical inactivity is a leading risk factor for global mortality",
  },
  {
    id: 11,
    icon: "🧂",
    text: "Excess salt intake contributes to high blood pressure in millions",
  },
  {
    id: 12,
    icon: "👨‍⚕️",
    text: "Early diagnosis can prevent up to 80% of chronic diseases",
  },
  {
    id: 13,
    icon: "📱",
    text: "Over 50% of patients prefer online consultation for convenience",
  },
  {
    id: 14,
    icon: "💧",
    text: "Nearly 2 billion people lack access to safe drinking water",
  },
  {
    id: 15,
    icon: "🥗",
    text: "Healthy diets can reduce the risk of chronic diseases significantly",
  },
];

const StatsSection = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14 bg-background relative">
      {/* Subtle divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 rounded-full bg-sky-400/50" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400 mb-2">
            Did you know?
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Health Insights 💡
          </h2>
        </div>

        <Carousel
          className="max-w-xl mx-auto"
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
        >
          <CarouselContent>
            {statsData.map((stat) => (
              <CarouselItem key={stat.id} className="basis-full">
                <div className="bg-card dark:bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow p-8 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-900/30 mb-5 text-3xl shadow-sm">
                    {stat.icon}
                  </div>
                  <p className="text-foreground text-base sm:text-lg leading-relaxed font-medium">
                    {stat.text}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default StatsSection;
