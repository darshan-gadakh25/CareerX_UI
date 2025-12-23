import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", // students studying
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d", // teamwork
  "https://images.unsplash.com/photo-1556761175-4b46a572b786", // planning future
];

export const HomePage = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#F5EFE8] min-h-screen">
      <div className="w-full h-[250px] md:h-[500px] overflow-hidden">
        <img
          src={images[current]}
          alt="Career guidance"
          className="w-full h-full object-cover transition-all duration-700"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-10 text-center">
          Turn your idea into a practical career path
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-[#FFFFFF] p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-[#2F4156] mb-2 text-center">
              Not sure where you fit? Let’s discover it together
            </h3>
            <div>
              <img
                src="/src/assets/1.png"
                alt="logo"
                className="w-50 h-50 mx-auto rounded-2xl"
              />
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-[#2F4156] mb-2 text-center">
              You have a goal, we help you reach it
            </h3>
            <div>
              <img
                src="/src/assets/2.png"
                alt="logo"
                className="w-50 h-50 mx-auto rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 text-center">
          <h2 className="text-2xl font-semibold text-[#2F4156] mb-4">
            Need some guidance?
          </h2>
          <Link
            to="/signup"
            className="inline-block bg-[#2F4156] text-white px-8 py-3 rounded-lg hover:bg-[#567C8D] transition"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
      <div>
        <div className="max-w-7xl mx-auto px-4 py-14 bg-[#FFFFFF] min-h-screen">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2F4156] mb-12">
            What We Offer
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-[#C8D9E6] p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-3">
                Aptitude & Interest Assessments
              </h3>
              <p className="text-[#2F4156]">
                Short, easy-to-understand tests to evaluate your interests,
                strengths, and abilities for better career alignment.
              </p>
            </div>

            <div className="bg-[#C8D9E6] p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-3">
                AI-Based Career Guidance
              </h3>
              <p className="text-[#2F4156]">
                Personalized career suggestions powered by AI based on your
                assessment results and preferences.
              </p>
            </div>

            <div className="bg-[#C8D9E6] p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-3">
                Complete Career Roadmap
              </h3>
              <p className="text-[#2F4156]">
                Step-by-step guidance showing courses, skills, certifications,
                and milestones needed to achieve your career goals.
              </p>
            </div>

            <div className="bg-[#C8D9E6] p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-3">
                Guidance from Class 10/12 to Job
              </h3>
              <p className="text-[#2F4156]">
                Clear guidance for stream selection after 10th, course choices
                after 12th, graduation paths, and job opportunities.
              </p>
            </div>

            <div className="bg-[#C8D9E6] p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-3">
                Course & College Information
              </h3>
              <p className="text-[#2F4156]">
                Explore available degree programs, skill-based courses, and
                colleges with eligibility and future prospects.
              </p>
            </div>

            <div className="bg-[#C8D9E6] p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-3">
                Skill Development & Job Readiness
              </h3>
              <p className="text-[#2F4156]">
                Recommended skills, online resources, and career preparation
                tips to improve employability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
