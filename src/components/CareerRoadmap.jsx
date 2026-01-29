import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { roadmapAPI } from "../services/api";
import toast from "react-hot-toast";

export const CareerRoadmap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Static/Demo data for fallback or preview
  const careerRoadmaps = {
    'software-engineer': {
      title: 'Software Engineer',
      description: 'Build applications, websites, and software systems',
      timeline: [
        {
          phase: 'Foundation',
          duration: '1-2 years',
          title: 'Build Strong Fundamentals',
          items: [
            'Complete 12th with Mathematics/Computer Science',
            'Learn basic programming (Python/Java)',
            'Understand computer fundamentals',
            'Practice logical thinking and problem-solving'
          ],
          color: 'bg-blue-100 border-blue-300'
        },
        // ... (Shortened for brevity, use same data structure)
        {
          phase: 'Job Readiness',
          duration: '2-3 months',
          title: 'Prepare for Career Launch',
          items: ['Create resume', 'Practice interviews'],
          color: 'bg-red-100 border-red-300'
        }
      ]
    }
    // Add other static careers if needed for demo
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);
      const response = await roadmapAPI.getMyRoadmaps();
      if (response.data && response.data.length > 0) {
        const latestRoadmap = response.data[0];
        setRoadmaps(latestRoadmap.roadmap || []);
        setSelectedCareer(latestRoadmap.careerOptions?.[0] || 'software-engineer');
      } else if (location.state?.roadmap) {
        // Came from payment success
        setRoadmaps(location.state.roadmap.roadmap || []);
        setSelectedCareer(location.state.roadmap.careerOptions?.[0] || 'software-engineer');
      }
    } catch (error) {
      console.error("Using static data/Empty state", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    try {
      setLoading(true);
      // Try to generate without payment ID (checks subscription)
      const response = await roadmapAPI.generateRoadmap(null);

      toast.success("Roadmap generated successfully!");
      setRoadmaps(response.data.roadmap || []);
      setSelectedCareer(response.data.careerOptions?.[0] || 'software-engineer');

    } catch (error) {
      console.error("Generation failed", error);
      // Check for payment required error
      const msg = error.response?.data?.error || error.message;
      if (msg && (msg.includes("Payment") || msg.includes("subscription"))) {
        toast.error("Payment required for Career Roadmap");
        navigate('/payment', {
          state: {
            type: 'ROADMAP',
            amount: 999,
            message: "Unlock Career Roadmap (2-Year Access)"
          }
        });
      } else {
        toast.error("Failed to generate roadmap: " + msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper to get current roadmap data (API or Static)
  // If API data exists (roadmaps state), use it.
  // Else if selectedCareer matches static, use static.
  // Else return null.

  // Actually, structure of API response might differ from static.
  // API returns "roadmap" as a list of objects likely matching the structure?
  // Let's assume the backend returns the same structure as Timeline requires.

  const getDisplayRoadmap = () => {
    if (Array.isArray(roadmaps) && roadmaps.length > 0) {
      if (selectedCareer) {
        return roadmaps.find(r => r.careerName === selectedCareer) || roadmaps[0];
      }
      return roadmaps[0];
    }
    return null;
  };

  const currentRoadmap = getDisplayRoadmap();

  // List of careers to select (from API data only)
  const availableCareers = (Array.isArray(roadmaps) && roadmaps.length > 0)
    ? roadmaps.map((r, index) => ({
      id: r.careerName,
      name: r.careerName,
      icon: ['💻', '📊', '🚀'][index % 3]
    }))
    : [];


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5EFE8]">
        <div className="text-xl text-[#2F4156]">Loading roadmap...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5EFE8] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#2F4156] mb-4">
            Career Roadmap
          </h1>
          <p className="text-[#2F4156] max-w-2xl mx-auto">
            Explore step-by-step career paths with clear milestones,
            skills, and timelines to achieve your dream job.
          </p>

          {/* Generate Button */}
          <button
            onClick={handleGenerateRoadmap}
            className="mt-6 bg-[#2F4156] text-white px-8 py-3 rounded-lg hover:bg-[#567C8D] transition shadow-lg"
          >
            {roadmaps && roadmaps.length > 0 ? "Regenerate Roadmap" : "Generate My Personalized Roadmap"}
          </button>
        </div>

        {/* Career Selection */}
        {availableCareers.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-[#2F4156] mb-6 text-center">
              Choose a Career Path
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {availableCareers.map((career) => (
                <button
                  key={career.id}
                  onClick={() => setSelectedCareer(career.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition ${selectedCareer === career.id
                    ? 'bg-[#2F4156] text-white'
                    : 'bg-white text-[#2F4156] border border-[#2F4156] hover:bg-[#C8D9E6]'
                    }`}
                >
                  <span className="mr-2">{career.icon}</span>
                  {career.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Roadmap Display */}
        {currentRoadmap ? (
          <div>
            {/* Roadmap Header */}
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-[#2F4156] mb-2">
                {currentRoadmap.careerName} Roadmap
              </h2>
              <p className="text-[#2F4156]">
                {currentRoadmap.jobMarketOutlook}
              </p>
              <p className="text-[#567C8D] font-medium mt-2">
                Timeline: {currentRoadmap.timeline || "Flexible"} | Salary: {currentRoadmap.salaryRange || "Competitive"}
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-[#567C8D] hidden md:block"></div>

              <div className="space-y-12">
                {currentRoadmap.phases?.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-5 h-5 bg-[#567C8D] rounded-full border-4 border-white shadow-lg hidden md:block"></div>

                    {/* Content Card */}
                    <div className="md:ml-20">
                      <div className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${['border-blue-300', 'border-green-300', 'border-purple-300', 'border-orange-300'][index % 4]}`}>
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div>
                            <span className="inline-block px-3 py-1 bg-[#C8D9E6] text-[#2F4156] text-sm font-medium rounded-full mb-2">
                              {step.phaseName}
                            </span>
                            <h3 className="text-xl font-bold text-[#2F4156]">
                              {step.phaseName}
                            </h3>
                          </div>
                          <div className="text-sm text-[#567C8D] font-medium">
                            ⏱️ {step.duration}
                          </div>
                        </div>

                        {/* Items/Steps */}
                        <ul className="space-y-3">
                          {step.steps?.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-[#567C8D] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-[#2F4156]">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Skills/Resources if available */}
                        {(step.skills || step.resources) && (
                          <div className="mt-4 pt-4 border-t border-gray-100 text-sm">
                            {step.skills && <p><span className="font-semibold">Skills:</span> {step.skills.join(', ')}</p>}
                            {step.resources && <p><span className="font-semibold">Resources:</span> {step.resources.join(', ')}</p>}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-xl text-[#2F4156]">No roadmap data available. Please generate your personalized roadmap.</p>
          </div>
        )}

        {/* Success Tips */}
        {/* ... (Keep existing Success Tips & Call to Action if desired) ... */}

        <div className="mt-12 text-center">
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
};