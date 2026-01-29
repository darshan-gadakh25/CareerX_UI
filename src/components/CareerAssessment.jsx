import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assessmentAPI } from "../services/api";
import { AssessmentWithWebcam } from "./AssessmentWithWebcam";
import toast from "react-hot-toast";

export const CareerAssessment = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsPayment, setNeedsPayment] = useState(false);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const response = await assessmentAPI.getAvailableAssessments();
      const data = response.data;
      setAssessments(data);

      // Check if payment is needed: User has completed one, and no active session to resume
      if (data.hasCompleted && !data.hasInProgress) {
        setNeedsPayment(true);
      } else {
        setNeedsPayment(false);
      }
    } catch (error) {
      toast.error("Failed to load assessments");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartAssessment = async () => {
    try {
      if (needsPayment) {
        // Redirect to payment page
        navigate('/payment', {
          state: {
            type: 'ASSESSMENT',
            amount: 499, // Set assessment price
            message: "Retake Career Assessment"
          }
        });
        return;
      }

      setLoading(true);
      // Start free or resume assessment
      // If we are resuming, we should ideally call startAssessment to get the ID/Questions
      // But the existing code just navigated to '/assessment'. 
      // I will assume '/assessment' page calls startAssessment or handles it.
      // Actually, looking at the previous file content, it just navigates. 
      // Let's stick to the existing navigation flow, assuming AssessmentPage handles the start call.
      // WAIT: The previous code just navigated. If AssessmentPage calls startAssessment(), it needs to handle paymentId too?
      // Or does CareerAssessment call start and pass data?
      // The previous code: `navigate('/assessment');`
      // I should verify what `/assessment` maps to. It looks like it might accept state/props.

      // Let's actually call startAssessment HERE to verify/init, then navigate? 
      // Or just navigate and let the next page handle it?
      // If I interpret "AssessmentWithWebcam" or "CareerAssessment" correctly...
      // The snippet showing `StudentAssessmentss` seems to normally navigate to `/assessment`.

      navigate('/assessment');
    } catch (error) {
      toast.error("Failed to start assessment. Please complete your profile first.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !assessments) {
    return (
      <div className="bg-[#F5EFE8] min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 text-center text-[#2F4156]">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5EFE8] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#2F4156] mb-10 text-center">
          Career Assessment
        </h1>

        {loading ? (
          <div className="text-center text-[#2F4156]">
            <p>Loading...</p>
          </div>
        ) : !assessments?.canTakeAssessment ? (
          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold text-[#2F4156] mb-4">
              Profile Required
            </h2>
            <p className="text-[#2F4156] mb-6">
              {assessments?.message || "Please complete your student profile before taking the assessment."}
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="bg-[#2F4156] text-white px-6 py-3 rounded-lg hover:bg-[#567C8D]"
            >
              Complete Profile
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow">
            <h2 className="text-2xl font-bold text-[#2F4156] mb-4">
              {needsPayment ? "Retake Career Assessment" : "AI-Generated Career Assessment"}
            </h2>

            <p className="text-[#2F4156] mb-6">
              {needsPayment
                ? "You have already completed an assessment. You can take it again to see how your skills have improved."
                : "Take our comprehensive 60-question assessment to receive personalized career recommendations based on your profile, skills, and interests."}
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <span className="text-[#567C8D] text-xl">📝</span>
                <div>
                  <p className="font-semibold text-[#2F4156]">60 Questions</p>
                  <p className="text-sm text-gray-600">Covers logical reasoning, technical skills, and career interests</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#567C8D] text-xl">⏱️</span>
                <div>
                  <p className="font-semibold text-[#2F4156]">60 Minutes Duration</p>
                  <p className="text-sm text-gray-600">Complete at your own pace within the time limit</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#567C8D] text-xl">
                  {needsPayment ? '💳' : '📹'}
                </span>
                <div>
                  {needsPayment ? (
                    <>
                      <p className="font-semibold text-[#2F4156]">Assessment Fee: ₹499</p>
                      <p className="text-sm text-gray-600">Payment required for retake</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-[#2F4156]">Webcam Required</p>
                      <p className="text-sm text-gray-600">For assessment monitoring and integrity</p>
                    </>
                  )}

                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#567C8D] text-xl">🎯</span>
                <div>
                  <p className="font-semibold text-[#2F4156]">Personalized Results</p>
                  <p className="text-sm text-gray-600">Receive AI-powered career recommendations and detailed PDF report</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartAssessment}
              disabled={loading}
              className="w-full bg-[#2F4156] text-white py-3 rounded-lg hover:bg-[#567C8D] transition font-medium disabled:opacity-50"
            >
              {loading ? "Starting Assessment..." : (needsPayment ? "Pay & Start Assessment" : "Start Assessment")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
