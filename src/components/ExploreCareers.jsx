import { useState, useEffect } from "react";
import { careerAPI } from "../services/api";
import toast from "react-hot-toast";

export const ExploreCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const response = await careerAPI.getCareers();
      // Handle both array response and nested data structure
      const careersData = Array.isArray(response.data) ? response.data : response.data?.data || [];
      setCareers(careersData);
    } catch (error) {
      console.error("API unavailable, using fallback data", error);
      // Fallback data when API is unavailable
      setCareers([
        {
          careerId: 1,
          title: "Software Engineer",
          description: "Design, develop, and maintain software applications and systems. Work with programming languages, frameworks, and databases to create innovative solutions.",
          requiredEducation: "Bachelor's degree in Computer Science, Software Engineering, or related field",
          skillsRequired: "Programming languages (Java, Python, JavaScript), Problem-solving, Database management, Version control (Git)",
          jobSector: "Technology",
          averageSalary: 800000,
          careerPath: "Junior Developer → Senior Developer → Tech Lead → Engineering Manager",
          imageUrl: null
        },
        {
          careerId: 2,
          title: "Data Scientist",
          description: "Analyze complex data to extract insights and build predictive models. Use statistical methods and machine learning to solve business problems.",
          requiredEducation: "Bachelor's/Master's degree in Data Science, Statistics, Mathematics, or Computer Science",
          skillsRequired: "Python/R, Machine Learning, Statistics, SQL, Data Visualization, Business Intelligence",
          jobSector: "Technology/Analytics",
          averageSalary: 1200000,
          careerPath: "Data Analyst → Data Scientist → Senior Data Scientist → Data Science Manager",
          imageUrl: null
        },
        {
          careerId: 3,
          title: "Digital Marketing Specialist",
          description: "Develop and execute digital marketing strategies across various online platforms to promote brands and drive business growth.",
          requiredEducation: "Bachelor's degree in Marketing, Business, Communications, or related field",
          skillsRequired: "SEO/SEM, Social Media Marketing, Content Creation, Analytics, Email Marketing, PPC Advertising",
          jobSector: "Marketing/Advertising",
          averageSalary: 600000,
          careerPath: "Marketing Assistant → Digital Marketing Specialist → Marketing Manager → Marketing Director",
          imageUrl: null
        },
        {
          careerId: 4,
          title: "UX/UI Designer",
          description: "Create user-centered designs for websites and applications. Focus on user experience, interface design, and usability testing.",
          requiredEducation: "Bachelor's degree in Design, HCI, or related field",
          skillsRequired: "Design Tools (Figma, Adobe XD), User Research, Prototyping, HTML/CSS basics, Design Thinking",
          jobSector: "Design/Technology",
          averageSalary: 700000,
          careerPath: "Junior Designer → UX/UI Designer → Senior Designer → Design Lead",
          imageUrl: null
        },
        {
          careerId: 5,
          title: "Business Analyst",
          description: "Bridge the gap between business needs and technology solutions. Analyze business processes and recommend improvements.",
          requiredEducation: "Bachelor's degree in Business, Economics, or related field",
          skillsRequired: "Business Process Analysis, Requirements Gathering, SQL, Excel, Communication, Project Management",
          jobSector: "Business/Consulting",
          averageSalary: 750000,
          careerPath: "Junior Analyst → Business Analyst → Senior Analyst → Business Consultant",
          imageUrl: null
        },
        {
          careerId: 6,
          title: "Cybersecurity Specialist",
          description: "Protect organizations from cyber threats by implementing security measures and monitoring for potential vulnerabilities.",
          requiredEducation: "Bachelor's degree in Cybersecurity, Computer Science, or IT",
          skillsRequired: "Network Security, Ethical Hacking, Risk Assessment, Security Tools, Incident Response",
          jobSector: "Technology/Security",
          averageSalary: 1000000,
          careerPath: "Security Analyst → Cybersecurity Specialist → Security Architect → CISO",
          imageUrl: null
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading careers...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#2F4156] mb-8 text-center">
          Explore Careers
        </h1>

        {careers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No careers available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career) => (
              <div
                key={career.careerId}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedCareer(career)}
              >
                {career.imageUrl && (
                  <img
                    src={career.imageUrl}
                    alt={career.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2F4156] mb-2">
                    {career.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {career.description}
                  </p>
                  {career.averageSalary && (
                    <p className="text-[#567C8D] font-semibold">
                      Avg. Salary: ₹{career.averageSalary.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCareer && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCareer(null)}
          >
            <div
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCareer(null)}
                className="float-right text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
              <h2 className="text-3xl font-bold text-[#2F4156] mb-4">
                {selectedCareer.title}
              </h2>
              {selectedCareer.imageUrl && (
                <img
                  src={selectedCareer.imageUrl}
                  alt={selectedCareer.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Description</h3>
                  <p className="text-gray-700">{selectedCareer.description}</p>
                </div>
                {selectedCareer.requiredEducation && (
                  <div>
                    <h3 className="font-semibold text-lg">Required Education</h3>
                    <p className="text-gray-700">{selectedCareer.requiredEducation}</p>
                  </div>
                )}
                {selectedCareer.skillsRequired && (
                  <div>
                    <h3 className="font-semibold text-lg">Skills Required</h3>
                    <p className="text-gray-700">{selectedCareer.skillsRequired}</p>
                  </div>
                )}
                {selectedCareer.jobSector && (
                  <div>
                    <h3 className="font-semibold text-lg">Job Sector</h3>
                    <p className="text-gray-700">{selectedCareer.jobSector}</p>
                  </div>
                )}
                {selectedCareer.averageSalary && (
                  <div>
                    <h3 className="font-semibold text-lg">Average Salary</h3>
                    <p className="text-gray-700">
                      ₹{selectedCareer.averageSalary.toLocaleString()}
                    </p>
                  </div>
                )}
                {selectedCareer.careerPath && (
                  <div>
                    <h3 className="font-semibold text-lg">Career Path</h3>
                    <p className="text-gray-700">{selectedCareer.careerPath}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

