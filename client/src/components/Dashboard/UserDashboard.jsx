import { useSelector } from "react-redux";
import { useFetchDoctors } from "../../hooks/useFetchDoctors";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserDashboard = () => {
  useFetchDoctors();
  const doctors = useSelector((state) => state.doctors);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {doctors.map((doctor) => (
        <Card key={doctor._id} className="overflow-hidden flex flex-col">
          {/* Image */}
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-full h-48 object-cover"
          />

          {/* Content */}
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {doctor.name}
            </CardTitle>

            <div className="flex flex-wrap gap-2 mt-2">
              {doctor.specialties.map((specialty, index) => (
                <CardDescription
                  key={index}
                  className="text-xs bg-muted px-2 py-1 rounded-md"
                >
                  {specialty}
                </CardDescription>
              ))}
            </div>
          </CardHeader>

          {/* Footer */}
          <CardFooter className="mt-auto">
            <Button className="w-full">Full Detail</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default UserDashboard;
