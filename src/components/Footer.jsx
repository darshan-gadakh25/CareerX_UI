import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#C8D9E6] border-t border-[#C8D9E6] mt-13 ">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <img src="/src/assets/logo.png" alt="logo" className="w-30 h-7" />
            <p className="text-[#2F4156] text-sm">
              A one-stop personalized career and education guidance platform to
              help students make informed academic and career choices.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#2F4156] mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-[#2F4156] hover:text-[#567C8D]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#2F4156] hover:text-[#567C8D]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#2F4156] hover:text-[#567C8D]"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-[#2F4156] hover:text-[#567C8D]"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#2F4156] mb-3">
              Contact
            </h3>
            <p className="text-sm text-[#2F4156]">
              Email: support@careerguide.com
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-[#C8D9E6] pt-4 text-center text-sm text-[#2F4156]">
          © {new Date().getFullYear()} CareerGuide. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
