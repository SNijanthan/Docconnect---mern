import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    value: "consultation",
    trigger: "How do I book an online consultation?",
    content:
      "You can book a consultation by selecting a doctor, choosing an available time slot, and confirming your appointment. Once booked, you will receive a confirmation and can join the consultation at the scheduled time.",
  },
  {
    value: "reschedule",
    trigger: "Can I reschedule or cancel my appointment?",
    content:
      "Unfortunately, you cannot reschedule your appointment as of now but we are working on it but you can cancel your appointment from the 'My Appointments' section. Please note that cancellations must be made at least a few hours before the scheduled time.",
  },
  {
    value: "fees",
    trigger: "What are the consultation fees?",
    content:
      "Consultation fees vary depending on the doctor's specialization and experience. The exact fee will be displayed before you confirm your booking.",
  },
  {
    value: "payment",
    trigger: "What payment methods are supported?",
    content:
      "We support UPI, credit/debit cards, net banking, and popular wallets. All transactions are secured and encrypted.",
  },
  {
    value: "emergency",
    trigger: "Can I use DocConnect for emergency situations?",
    content:
      "DocConnect is not intended for medical emergencies. In case of an emergency, please contact your nearest hospital or emergency services immediately.",
  },
];

const FAQAccordion = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-sky-100 dark:bg-slate-950">
      {/* Heading */}
      <div className="max-w-xl mx-auto text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Frequently Asked Questions ❓
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
          Everything you need to know before getting started
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-xl mx-auto">
        <Accordion
          type="single"
          collapsible="true"
          defaultValue="item-1"
          className="space-y-4"
        >
          {items.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="bg-white dark:bg-slate-900 rounded-xl px-4 sm:px-5 py-2 shadow-sm border border-border/50"
            >
              <AccordionTrigger
                className="
                  text-left 
                  text-sm sm:text-base 
                  font-medium 
                  leading-snug
                "
              >
                {item.trigger}
              </AccordionTrigger>

              <AccordionContent
                className="
                  text-gray-600 dark:text-gray-400 
                  text-sm sm:text-base 
                  leading-relaxed
                  pt-2
                "
              >
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQAccordion;
