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
      "Unfortunately, you cannot reschedule your appointment as of now but we are working on it — but you can cancel your appointment from the 'My Appointments' section. Please note that cancellations must be made at least a few hours before the scheduled time.",
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
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14 bg-gradient-to-b from-background to-sky-50/40 dark:to-slate-900/40">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400 mb-2">
            Support
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Frequently Asked Questions ❓
          </h2>
          <p className="text-sm text-muted-foreground mt-2.5">
            Everything you need to know before getting started
          </p>
        </div>

        <Accordion
          type="single"
          collapsible="true"
          defaultValue="consultation"
          className="space-y-3"
        >
          {items.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="bg-card rounded-2xl border border-border shadow-sm hover:border-sky-200 dark:hover:border-sky-800/60 transition-colors overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 text-left text-sm sm:text-base font-medium hover:no-underline [&[data-state=open]]:text-sky-600 dark:[&[data-state=open]]:text-sky-400 transition-colors">
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
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
