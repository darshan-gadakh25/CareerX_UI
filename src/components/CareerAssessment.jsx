import { useState } from "react";

export const StudentAssessmentss = ({ assessments = [] }) => {
  const [activeAssessment, setActiveAssessment] = useState(null);

  if (activeAssessment) {
    return (
      <div className="bg-[#F5EFE8] min-h-screen py-10">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-[#2F4156] mb-4">
            {activeAssessment.title}
          </h2>

          <p className="text-[#2F4156] mb-6">
            {activeAssessment.description}
          </p>

          <button
            onClick={() => alert("Assessment Start Logic Here")}
            className="w-full bg-[#2F4156] text-white py-3 rounded-lg hover:bg-[#567C8D]"
          >
            Start Assessment
          </button>

          <button
            onClick={() => setActiveAssessment(null)}
            className="mt-4 w-full border border-[#2F4156] text-[#2F4156] py-2 rounded-lg hover:bg-[#C8D9E6]"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5EFE8] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#2F4156] mb-10 text-center">
          Available Assessments
        </h1>

        {assessments.length === 0 ? (
          <p className="text-center text-[#2F4156]">
            No assessments available
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assessments.map((a) => (
              <div
                key={a.id}
                className="bg-white p-6 rounded-2xl shadow
                           hover:shadow-xl hover:-translate-y-1 transition"
              >
                <h3 className="text-xl font-semibold text-[#2F4156] mb-2">
                  {a.title}
                </h3>

                <p className="text-sm text-[#2F4156] mb-4">
                  {a.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#567C8D]">
                    ⏱ {a.duration || "N/A"}
                  </span>

                  <span className="text-sm text-[#567C8D]">
                    {(a.questions || []).length} Questions
                  </span>
                </div>

                <button
                  onClick={() => setActiveAssessment(a)}
                  className="w-full bg-[#2F4156] text-white py-2 rounded-lg
                             hover:bg-[#567C8D] transition font-medium"
                >
                  Start Assessment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
