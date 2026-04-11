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
      "Yes, you can reschedule or cancel your appointment from the 'My Appointments' section. Please note that cancellations or changes must be made at least a few hours before the scheduled time.",
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
    value: "prescription",
    trigger: "Will I receive a prescription after consultation?",
    content:
      "Yes, after your consultation, the doctor can provide a digital prescription which will be available in your dashboard for download.",
  },
  {
    value: "records",
    trigger: "Can I access my past consultations and reports?",
    content:
      "Yes, all your past consultations, prescriptions, and medical reports are securely stored and can be accessed anytime from your dashboard.",
  },
  {
    value: "emergency",
    trigger: "Can I use DocConnect for emergency situations?",
    content:
      "DocConnect is not intended for medical emergencies. In case of an emergency, please contact your nearest hospital or emergency services immediately.",
  },
  {
    value: "doctor-verification",
    trigger: "Are the doctors on DocConnect verified?",
    content:
      "Yes, all doctors on DocConnect go through a strict verification process including license validation and experience checks before being listed.",
  },
];

const FAQAccordion = () => {
  return (
    <>
      <Accordion
        type="single"
        className="w-full"
        collapsible
        defaultValue="item-1"
      >
        {items.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className="py-2 px-1"
          >
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default FAQAccordion;
