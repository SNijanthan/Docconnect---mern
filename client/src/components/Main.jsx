import HeroSection from "./home/HeroSection";
import StatsSection from "./home/StatsSection";
import FAQAccordion from "./home/FAQAccordion";
import HeroFooter from "./home/HeroFooter";

const Main = () => {
  return (
    <div className="w-4/6 m-auto flex flex-col items-center justify-center gap-10">
      <HeroSection />
      <StatsSection />
      <FAQAccordion />
      <HeroFooter />
    </div>
  );
};

export default Main;
