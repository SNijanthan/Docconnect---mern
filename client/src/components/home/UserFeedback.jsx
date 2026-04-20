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

const getInitials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const roleColors = {
  Patient:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  Doctor:
    "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800",
};

const UserFeedback = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400 mb-2">
            Testimonials
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            What Our Users Say 💬
          </h2>
        </div>

        <Carousel
          className="max-w-xl mx-auto"
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
        >
          <CarouselContent>
            {feedbackData.map((feedback) => (
              <CarouselItem key={feedback.id} className="basis-full">
                <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow p-7 sm:p-8">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        viewBox="0 0 20 20"
                        className={`w-4 h-4 ${i < feedback.rating ? "fill-amber-400" : "fill-border"}`}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground text-base leading-relaxed mb-6">
                    "{feedback.message}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-sky-700 dark:text-sky-300 text-sm font-bold shrink-0">
                      {getInitials(feedback.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {feedback.name}
                      </p>
                      <span
                        className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border mt-0.5 ${roleColors[feedback.role]}`}
                      >
                        {feedback.role}
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default UserFeedback;
