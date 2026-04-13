import { Link } from "react-router-dom";

const HeroFooter = () => {
  return (
    <footer className="w-full bg-slate-100 dark:bg-slate-950 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Logo + Description */}
          <div className="max-w-sm">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              DocConnect
            </h1>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Your trusted platform for online doctor consultations, appointment
              booking, and secure health records.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h2 className="text-sm font-medium mb-3 text-gray-900 dark:text-white">
                Company
              </h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
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

            <div>
              <h2 className="text-sm font-medium mb-3 text-gray-900 dark:text-white">
                Resources
              </h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
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

            <div>
              <h2 className="text-sm font-medium mb-3 text-gray-900 dark:text-white">
                Support
              </h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
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
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} DocConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default HeroFooter;
