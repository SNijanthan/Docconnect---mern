import { Link } from "react-router-dom";

const footerLinks = {
  Company: [
    { label: "About", to: "/home" },
    { label: "Careers", to: "/home" },
    { label: "Privacy", to: "/home" },
    { label: "Terms", to: "/home" },
  ],
  Resources: [
    { label: "Find Doctors", to: "/home" },
    { label: "Appointments", to: "/home" },
    { label: "Help Center", to: "/home" },
  ],
  Support: [
    { label: "Contact", to: "/home" },
    { label: "FAQ", to: "/home" },
    { label: "Refund Policy", to: "/home" },
  ],
};

const HeroFooter = () => {
  return (
    <footer className="w-full bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center shadow-sm shadow-sky-500/30">
                <img
                  src="/logo.png"
                  alt="DocConnect"
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="text-base font-semibold tracking-tight">
                DocConnect
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted platform for online doctor consultations, appointment
              booking, and secure health records.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {section}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DocConnect. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HeroFooter;
