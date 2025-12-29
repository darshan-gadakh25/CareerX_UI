import { Link, useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    

    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-[#F5EFE8] min-h-screen">

      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 lg:grid-cols-4">

     
        <div className="lg:col-span-4 space-y-10">

         
          <div
            className="flex items-center justify-between
                       bg-gradient-to-r from-[#C8D9E6] to-[#F5EFE8]
                       p-8 rounded-2xl shadow-sm"
          >
            <div>
              <h1 className="text-3xl font-bold text-[#2F4156]">
                Welcome Admin
              </h1>
              <p className="text-[#2F4156] mt-2">
                Manage platform content and guide students effectively.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg
                         hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

         
            <div className="bg-white p-6 rounded-xl shadow-sm
                            hover:-translate-y-1 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-2">
                Career Assessments
              </h3>
              <p className="text-sm text-[#2F4156] mb-4">
                Create, update and manage student assessments.
              </p>
              <Link
                to="/admin/assessments"
                className="text-[#567C8D] font-medium hover:underline"
              >
                Manage Assessments →
              </Link>
            </div>

          
            <div className="bg-white p-6 rounded-xl shadow-sm
                            hover:-translate-y-1 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-2">
                Career Blogs
              </h3>
              <p className="text-sm text-[#2F4156] mb-4">
                Add, edit and publish career guidance blogs.
              </p>
              <Link
                to="/admin/blogs"
                className="text-[#567C8D] font-medium hover:underline"
              >
                Manage Blogs →
              </Link>
            </div>

           
            <div className="bg-white p-6 rounded-xl shadow-sm
                            hover:-translate-y-1 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#2F4156] mb-2">
                Explore Careers
              </h3>
              <p className="text-sm text-[#2F4156] mb-4">
                Manage career roles, skills and opportunities.
              </p>
              <Link
                to="/admin/ExploreCareer"
                className="text-[#567C8D] font-medium hover:underline"
              >
                Manage Careers →
              </Link>
            </div>

          </div>

         
          <div className="bg-[#C8D9E6] p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-[#2F4156] mb-1">
              Admin Controls
            </h2>
            <p className="text-[#2F4156]">
              Keep assessments, blogs and career data up to date for students.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
