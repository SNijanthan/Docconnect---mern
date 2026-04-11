import HeroSection from "./home/HeroSection";
import StatsSection from "./home/StatsSection";
import FAQAccordion from "./home/FAQAccordion";
import HeroFooter from "./home/HeroFooter";

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <HeroSection />
      <div className="w-10/12">
        <StatsSection />
        <FAQAccordion />
        <HeroFooter />
      </div>
    </div>
  );
};

export default Main;
