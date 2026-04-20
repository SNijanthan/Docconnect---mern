import HeroSection from "./home/HeroSection";
import FAQAccordion from "./home/FAQAccordion";
import HeroFooter from "./home/HeroFooter";
import UserFeedback from "./home/UserFeedback";
import StatsSection from "./home/StatsSection";
import BrowseSpecialties from "./home/BrowseSpecialties";
import { useFetchDoctors } from "../hooks/useFetchDoctors";

const Main = () => {
  useFetchDoctors();
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <StatsSection />
      <BrowseSpecialties />
      <UserFeedback />
      <FAQAccordion />
      <HeroFooter />
    </div>
  );
};

export default Main;
