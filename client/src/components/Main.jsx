import HeroSection from "./home/HeroSection";
import FAQAccordion from "./home/FAQAccordion";
import HeroFooter from "./home/HeroFooter";
import UserFeedback from "./home/UserFeedback";
import QuoteSection from "./home/QuoteSection";

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <HeroSection />
      <QuoteSection />
      <UserFeedback />
      <div className="w-7/12">
        <FAQAccordion />
      </div>
      <HeroFooter />
    </div>
  );
};

export default Main;
