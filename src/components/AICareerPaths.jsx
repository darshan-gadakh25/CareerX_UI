import { useState, useEffect } from "react";
import { subscriptionAPI } from "../services/api";

export const AICareerPaths = () => {
  const [hasSubscription, setHasSubscription] = useState(false);
  const [profileComplete] = useState(true);
  const [assessmentsComplete] = useState(true);
  const [selectedPath, setSelectedPath] = useState(null);

  // ✅ useEffect for API call
  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const response = await subscriptionAPI.checkSubscription();
      setHasSubscription(response.data.isActive);
    } catch (error) {
      console.error("Failed to check subscription:", error);
      setHasSubscription(false);
    }
  };

  const aiGeneratedPaths = [
    {
      id: 1,
      title: "Software Development Engineer",
      matchPercentage: 92,
      description:
        "Based on your strong analytical skills, interest in technology, and problem-solving abilities, software engineering is an excellent fit for you.",
      whyRecommended: [
        "High score in logical reasoning assessment (85%)",
        "Strong interest in technology and programming",
        "Excellent problem-solving capabilities",
        "Preference for structured work environment",
      ],
      careerPath: {
        immediate: [
          "Complete B.Tech in Computer Science/IT",
          "Learn programming languages (Python, Java, JavaScript)",
          "Build 3-5 personal projects",
          "Practice data structures and algorithms",
        ],
        shortTerm: [
          "Secure internship at tech company",
          "Contribute to open-source projects",
          "Get cloud certifications (AWS/Azure)",
          "Develop full-stack development skills",
        ],
        longTerm: [
          "Join as Software Engineer (₹6-12 LPA)",
          "Specialize in AI/ML, Web Dev, or Mobile",
          "Progress to Senior Engineer (₹15-25 LPA)",
          "Consider leadership roles or entrepreneurship",
        ],
      },
      skills: ["Programming", "Problem Solving", "System Design", "Teamwork"],
      salary: "₹6-25 LPA",
      growth: "Very High",
      companies: ["Google", "Microsoft", "Amazon", "Flipkart", "Zomato"],
    },
  ];

  /* ===================== SUBSCRIPTION GATE ===================== */
  if (!hasSubscription) {
    return (
      <div className="bg-[#F5EFE8] min-h-screen py-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-xl">
          <h2 className="text-2xl font-bold text-[#2F4156] mb-4">
            Unlock Personalized Career Guidance
          </h2>
          <button
            onClick={() => (window.location.href = "/payment")}
            className="px-8 py-3 bg-[#2F4156] text-white rounded-lg"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    );
  }

  /* ===================== SELECTED PATH VIEW ===================== */
  if (selectedPath) {
    const path = selectedPath;

    return (
      <div className="bg-[#F5EFE8] min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setSelectedPath(null)}
            className="mb-6 text-[#567C8D]"
          >
            ← Back to Career Paths
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-[#2F4156] mb-4">
              {path.title}
            </h1>
            <p className="text-[#2F4156] mb-6">{path.description}</p>
          </div>
        </div>
      </div>
    );
  }

  /* ===================== LIST VIEW ===================== */
  return (
    <div className="bg-[#F5EFE8] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-[#2F4156] mb-12">
          AI-Generated Career Recommendations
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {aiGeneratedPaths.map((path) => (
            <div
              key={path.id}
              onClick={() => setSelectedPath(path)}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-[#2F4156] mb-3">
                {path.title}
              </h3>
              <p className="text-sm text-[#2F4156] mb-4">
                {path.description}
              </p>
              <button className="w-full bg-[#2F4156] text-white py-2 rounded-lg">
                View Detailed Path
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
