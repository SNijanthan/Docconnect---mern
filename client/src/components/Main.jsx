import HeroSection from "./home/HeroSection";
import FAQAccordion from "./home/FAQAccordion";
import HeroFooter from "./home/HeroFooter";
import UserFeedback from "./home/UserFeedback";
import StatsSection from "./home/StatsSection";
import BrowseSpecialties from "./home/BrowseSpecialties";
import { useFetchDoctors } from "../hooks/useFetchDoctors";
// import { useSelector } from "react-redux";

const Main = () => {
  useFetchDoctors();

  // const doctors = useSelector((state) => state.doctors);
  return (
    <div className="flex flex-col items-center justify-center gap-10">
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
