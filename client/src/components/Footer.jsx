import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-t border-slate-800">

      <div className="max-w-7xl mx-auto px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              PrepVerse AI
            </h2>

            <p className="text-gray-300 leading-7">
              AI-powered mock interviews,
              coding rounds, practice
              questions and personalized
              interview feedback to help
              you crack your dream job.
            </p>
          </div>

          {/* Contact */}
          <div className="md:mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-gray-300">
              <p>
                📧 prepverse.ai@gmail.com
              </p>

              <p>
                📍 Andhra Pradesh, India
              </p>

              <p>
                📞 +91 92814 10926
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:ml-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/practice"
                  className="hover:text-white transition"
                >
                  Practice Questions
                </Link>
              </li>

              <li>
                <Link
                  to="/create-interview"
                  className="hover:text-white transition"
                >
                  Mock Interview
                </Link>
              </li>

              <li>
                <Link
                  to="/history"
                  className="hover:text-white transition"
                >
                  Interview History
                </Link>
              </li>

              <li>
                <a
                  href="mailto:interviewace.ai@gmail.com"
                  className="hover:text-white transition"
                >
                  Contact Support
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-gray-400">

          © {new Date().getFullYear()}{" "}
          PrepVerse AI. All rights
          reserved.

        </div>
      </div>
    </footer>
  );
};

export default Footer;

