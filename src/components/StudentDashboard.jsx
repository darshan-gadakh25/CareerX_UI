import { Link } from "react-router-dom";

export const StudentDashboard = () => {
  return (
    <div className="bg-[#F5EFE8] min-h-screen">

      {/* DASHBOARD CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 lg:grid-cols-4">

        {/* MAIN SECTION */}
        <div className="lg:col-span-3 space-y-10">

          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-[#C8D9E6] to-[#F5EFE8] 
                          p-8 rounded-2xl shadow-sm">
            <h1 className="text-3xl font-bold text-[#2F4156]">
              Welcome to CareerX 👋
            </h1>
            <p className="text-[#2F4156] mt-2">
              Hello <span className="font-semibold">Student Name</span>, let’s
              shape your future together.
            </p>
          </div>

          {/* DASHBOARD CARDS */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* Assessments */}
            <div className="bg-white p-6 rounded-xl shadow-sm 
                            hover:-translate-y-1 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-2">
                Career Assessments
              </h3>
              <p className="text-sm text-[#2F4156] mb-4">
                Discover your strengths through aptitude and interest tests.
              </p>
              <Link
                to="/assessments"
                className="text-[#567C8D] font-medium hover:underline"
              >
                Take Test →
              </Link>
            </div>

            {/* Explore */}
            <div className="bg-white p-6 rounded-xl shadow-sm 
                            hover:-translate-y-1 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-2">
                Explore Careers
              </h3>
              <p className="text-sm text-[#2F4156] mb-4">
                Learn about career roles, skills, and opportunities.
              </p>
              <Link
                to="/careers"
                className="text-[#567C8D] font-medium hover:underline"
              >
                Explore →
              </Link>
            </div>

            {/* Roadmap */}
            <div className="bg-white p-6 rounded-xl shadow-sm 
                            hover:-translate-y-1 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-2">
                Career Roadmap
              </h3>
              <p className="text-sm text-[#2F4156] mb-4">
                View your personalized step-by-step career plan.
              </p>
              <Link
                to="/roadmap"
                className="text-[#567C8D] font-medium hover:underline"
              >
                View Roadmap →
              </Link>
            </div>

            {/* AI Career Paths */}
            <div className="bg-white p-6 rounded-xl shadow-sm 
                            hover:-translate-y-1 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-2">
                AI Career Recommendations
              </h3>
              <p className="text-sm text-[#2F4156] mb-4">
                Get personalized career paths based on your profile.
              </p>
              <Link
                to="/ai-career-paths"
                className="text-[#567C8D] font-medium hover:underline"
              >
                View Paths →
              </Link>
            </div>

            {/* Chatbot */}
            <div className="bg-white p-6 rounded-xl shadow-sm 
                            hover:-translate-y-1 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-2">
                AI Career Advisor
              </h3>
              <p className="text-sm text-[#2F4156] mb-4">
                Chat with AI for instant career guidance and tips.
              </p>
              <Link
                to="/chatbot"
                className="text-[#567C8D] font-medium hover:underline"
              >
                Start Chat →
              </Link>
            </div>

            {/* Blogs */}
            <div className="bg-white p-6 rounded-xl shadow-sm 
                            hover:-translate-y-1 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-2">
                Career Blogs
              </h3>
              <p className="text-sm text-[#2F4156] mb-4">
                Read latest insights and tips from career experts.
              </p>
              <Link
                to="/blogs"
                className="text-[#567C8D] font-medium hover:underline"
              >
                Read Blogs →
              </Link>
            </div>
          </div>

          {/* Recommendation Banner */}
          <div className="bg-[#C8D9E6] p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-[#2F4156] mb-1">
              Personalized Guidance
            </h2>
            <p className="text-[#2F4156]">
              Complete your profile and assessments to unlock AI-based career
              recommendations.
            </p>
          </div>
        </div>

        {/* RIGHT PROFILE PANEL */}
        <div className="bg-white p-6 rounded-2xl shadow-md 
                        h-fit sticky top-24">

          {/* Profile Photo Placeholder */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto rounded-full 
                            bg-[#C8D9E6] overflow-hidden 
                            flex items-center justify-center">
              {/* profile image goes here */}
              <span className="text-sm text-[#2F4156]">
                Upload Photo
              </span>
            </div>

            <h3 className="mt-4 font-semibold text-[#2F4156]">
              Student Name
            </h3>
            <p className="text-sm text-[#2F4156]">
              Class / Degree
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-4">
            <Link
              to="/profile"
              className="block w-full text-center bg-[#2F4156] 
                         text-white py-2 rounded-lg 
                         hover:bg-[#567C8D] transition"
            >
              Edit Profile
            </Link>

            <button
              onClick={() => alert('Logout functionality (UI only)')}
              className="block w-full text-center bg-red-500 
                         text-white py-2 rounded-lg 
                         hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

