import { Link } from "react-router-dom";

const HeroFooter = () => {
  return (
    <>
      <footer className="bg-background border-t border-border mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Logo + Description */}
            <div className="max-w-sm">
              <h1 className="text-lg font-semibold">DocConnect</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Your trusted platform for online doctor consultations,
                appointment booking, and secure health records.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {/* Company */}
              <div>
                <h2 className="text-sm font-medium mb-2">Company</h2>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <Link to="/home">About</Link>
                  </li>
                  <li>
                    <Link to="/home">Careers</Link>
                  </li>
                  <li>
                    <Link to="/home">Privacy</Link>
                  </li>
                  <li>
                    <Link to="/home">Terms</Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h2 className="text-sm font-medium mb-2">Resources</h2>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <Link to="/home">Find Doctors</Link>
                  </li>
                  <li>
                    <Link to="/home">Appointments</Link>
                  </li>
                  <li>
                    <Link to="/home">Help Center</Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h2 className="text-sm font-medium mb-2">Support</h2>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <Link to="/home">Contact</Link>
                  </li>
                  <li>
                    <Link to="/home">FAQ</Link>
                  </li>
                  <li>
                    <Link to="/home">Refund Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 border-t border-border pt-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} DocConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default HeroFooter;
