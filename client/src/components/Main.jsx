import HeroSection from "./home/HeroSection";
import FAQAccordion from "./home/FAQAccordion";
import HeroFooter from "./home/HeroFooter";
import UserFeedback from "./home/UserFeedback";
import QuoteSection from "./home/QuoteSection";
import StatsSection from "./home/StatsSection";

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <HeroSection />
      <StatsSection />
      <QuoteSection />
      <UserFeedback />
      <FAQAccordion />
      <HeroFooter />
    </div>
  );
};

export default Main;
