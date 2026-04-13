import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const feedbackData = [
  {
    id: 1,
    name: "Arjun R",
    role: "Patient",
    message:
      "Booking appointments was super easy and quick. The UI is clean and very user-friendly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya S",
    role: "Patient",
    message:
      "I love how I can manage all my consultations in one place. Saves a lot of time!",
    rating: 4,
  },
  {
    id: 3,
    name: "Dr. Karthik M",
    role: "Doctor",
    message:
      "Managing patient appointments has become much smoother. Notifications are very helpful.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha V",
    role: "Patient",
    message:
      "The platform is great, but adding more doctors in rural areas would make it even better.",
    rating: 4,
  },
  {
    id: 5,
    name: "Rahul P",
    role: "Patient",
    message:
      "Quick booking, reminders, and clean interface. Everything works perfectly!",
    rating: 5,
  },
  {
    id: 6,
    name: "Dr. Meena K",
    role: "Doctor",
    message:
      "Helps me organize my schedule efficiently. Patient communication is much easier now.",
    rating: 5,
  },
  {
    id: 7,
    name: "Vikram N",
    role: "Patient",
    message:
      "Very convenient platform. Would love to see in-app video consultations soon.",
    rating: 4,
  },
  {
    id: 8,
    name: "Anjali T",
    role: "Patient",
    message:
      "Simple, fast, and reliable. Highly recommended for anyone looking for quick appointments.",
    rating: 5,
  },
  {
    id: 9,
    name: "Kavya R",
    role: "Patient",
    message:
      "Finding the right doctor used to be difficult, but this platform made it effortless and quick.",
    rating: 5,
  },
  {
    id: 10,
    name: "Dr. Sanjay V",
    role: "Doctor",
    message:
      "The appointment scheduling system is very efficient. It helps me manage my time better.",
    rating: 5,
  },
  {
    id: 11,
    name: "Manoj K",
    role: "Patient",
    message:
      "Reminders for appointments are very helpful. I never miss my consultations now.",
    rating: 4,
  },
  {
    id: 12,
    name: "Divya S",
    role: "Patient",
    message:
      "Clean design and smooth experience. Booking takes less than a minute!",
    rating: 5,
  },
  {
    id: 13,
    name: "Dr. Aishwarya P",
    role: "Doctor",
    message:
      "Great platform for connecting with patients. The interface is simple and intuitive.",
    rating: 5,
  },
  {
    id: 14,
    name: "Rohit M",
    role: "Patient",
    message:
      "I appreciate the quick support and seamless booking experience. Highly recommended.",
    rating: 4,
  },
  {
    id: 15,
    name: "Nisha T",
    role: "Patient",
    message:
      "Everything works smoothly, from searching doctors to booking appointments.",
    rating: 5,
  },
  {
    id: 16,
    name: "Dr. Prakash N",
    role: "Doctor",
    message:
      "Managing patient flow has become much easier. Notifications keep everything on track.",
    rating: 5,
  },
  {
    id: 17,
    name: "Suresh B",
    role: "Patient",
    message:
      "The platform is fast and reliable. Would love to see more features like video consultations.",
    rating: 4,
  },
  {
    id: 18,
    name: "Meera L",
    role: "Patient",
    message:
      "User-friendly interface and quick booking process. Makes healthcare more accessible.",
    rating: 5,
  },
];

const UserFeedback = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-sky-50 dark:bg-slate-950">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        What Our Users Say 💬
      </h2>

      <Carousel
        className="max-w-2xl mx-auto"
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {feedbackData.map((feedback) => (
            <CarouselItem key={feedback.id} className="basis-full">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 sm:p-8 text-center hover:shadow-lg transition">
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                  “{feedback.message}”
                </p>

                <div className="mb-3 text-lg">
                  {"⭐".repeat(feedback.rating)}
                </div>

                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {feedback.name}
                </p>

                <p className="text-sm text-gray-500">{feedback.role}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default UserFeedback;
