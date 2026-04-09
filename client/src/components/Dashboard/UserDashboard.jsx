import { useSelector } from "react-redux";
import { useFetchDoctors } from "../../hooks/useFetchDoctors";

const UserDashboard = () => {
  useFetchDoctors();
  const doctors = useSelector((state) => state.doctors);
  console.log(doctors);

  return <div>UserDashboard</div>;
};

export default UserDashboard;
