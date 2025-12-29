import { useState } from "react";
import { profileAPI } from "../services/api";
import toast from "react-hot-toast";

export const StudentProfile = () => {
  const [formData, setFormData] = useState({
    // Profile Picture
    profilePicture: null,
    
    // Basic Information
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    preferredLanguage: "",
    
    // Academic Details
    currentEducationLevel: "",
    boardOrUniversity: "",
    schoolOrCollegeName: "",
    stream: "",
    currentYearOrSemester: "",
    overallPercentageOrCGPA: "",
    
    // Education Gap
    hasTakenGapYear: false,
    numberOfGapYears: "",
    reasonForGap: "",
    
    // Career Interests
    areasOfInterest: "",
    preferredCareerDomain: [],
    dreamJobOrRole: "",
    
    // Skills & Strengths
    technicalSkills: "",
    softSkills: "",
    skillLevel: "",
    
    // Hobbies & Activities
    hobbies: "",
    extracurricularActivities: "",
    
    // Achievements & Certifications
    academicAchievements: "",
    scholarships: "",
    rankOrMeritCertificates: "",
    competitionsOrHackathons: "",
    sportsOrCulturalAchievements: "",
    certifications: "",
    certificationCourseName: "",
    certificationPlatform: "",
    certificationYear: "",
    
    // Entrance Exams
    appearedForCompetitiveExams: false,
    examName: "",
    examScoreOrRank: "",
    examYear: ""
  });

  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    "Basic Information",
    "Academic Details", 
    "Education Gap",
    "Career Interests",
    "Skills & Strengths",
    "Hobbies & Activities",
    "Achievements & Certifications",
    "Entrance Exams"
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profilePicture: e.target.result
        }));
      };
      reader.readAsDataURL(file);
      
      // Upload to backend
      uploadProfilePicture(file);
    }
  };

  const uploadProfilePicture = async (file) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      
      await profileAPI.uploadProfilePicture(formData);
      toast.success('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload profile picture:', error);
      toast.error('Failed to upload profile picture');
    }
  };

  const saveProfileToDatabase = async (profileData) => {
    try {
      await profileAPI.updateProfile(profileData);
      toast.success('Profile saved successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      toast.error('Failed to save profile');
      throw error;
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderBasicInformation = () => (
    <div className="space-y-6">
      {/* Profile Picture Upload */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="w-32 h-32 mx-auto rounded-full bg-[#C8D9E6] overflow-hidden flex items-center justify-center border-4 border-white shadow-lg">
            {formData.profilePicture ? (
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[#2F4156] text-sm">No Photo</span>
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-[#2F4156] text-white p-2 rounded-full cursor-pointer hover:bg-[#567C8D] transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-sm text-[#567C8D] mt-2">Click the camera icon to upload your photo</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            maxLength="10"
            value={formData.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            placeholder="10-digit mobile number"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Preferred Language
          </label>
          <input
            type="text"
            value={formData.preferredLanguage}
            onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            placeholder="e.g., English, Hindi"
          />
        </div>
      </div>
    </div>
  );

  const renderAcademicDetails = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Current Education Level
          </label>
          <select
            value={formData.currentEducationLevel}
            onChange={(e) => handleInputChange('currentEducationLevel', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
          >
            <option value="">Select Level</option>
            <option value="Class10">Class 10</option>
            <option value="Class12">Class 12</option>
            <option value="Diploma">Diploma</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Stream
          </label>
          <select
            value={formData.stream}
            onChange={(e) => handleInputChange('stream', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
          >
            <option value="">Select Stream</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Board/University
          </label>
          <input
            type="text"
            value={formData.boardOrUniversity}
            onChange={(e) => handleInputChange('boardOrUniversity', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            placeholder="e.g., CBSE, Mumbai University"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            School/College Name
          </label>
          <input
            type="text"
            value={formData.schoolOrCollegeName}
            onChange={(e) => handleInputChange('schoolOrCollegeName', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Current Year/Semester
          </label>
          <input
            type="text"
            value={formData.currentYearOrSemester}
            onChange={(e) => handleInputChange('currentYearOrSemester', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            placeholder="e.g., 2nd Year, 4th Semester"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Overall Percentage/CGPA
          </label>
          <input
            type="text"
            value={formData.overallPercentageOrCGPA}
            onChange={(e) => handleInputChange('overallPercentageOrCGPA', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            placeholder="e.g., 85%, 8.5 CGPA"
          />
        </div>
      </div>
    </div>
  );

  const renderEducationGap = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#2F4156] mb-2">
          Have you taken a gap year?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="gapYear"
              checked={formData.hasTakenGapYear === true}
              onChange={() => handleInputChange('hasTakenGapYear', true)}
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gapYear"
              checked={formData.hasTakenGapYear === false}
              onChange={() => handleInputChange('hasTakenGapYear', false)}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>
      
      {formData.hasTakenGapYear && (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[#2F4156] mb-2">
              Number of Gap Years
            </label>
            <input
              type="number"
              value={formData.numberOfGapYears}
              onChange={(e) => handleInputChange('numberOfGapYears', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2F4156] mb-2">
              Reason for Gap
            </label>
            <select
              value={formData.reasonForGap}
              onChange={(e) => handleInputChange('reasonForGap', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            >
              <option value="">Select Reason</option>
              <option value="CompetitiveExamPreparation">Competitive Exam Preparation</option>
              <option value="FinancialReasons">Financial Reasons</option>
              <option value="HealthReasons">Health Reasons</option>
              <option value="PersonalReasons">Personal Reasons</option>
              <option value="SkillDevelopment">Skill Development</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );

  const renderCareerInterests = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Areas of Interest
          </label>
          <select
            value={formData.areasOfInterest}
            onChange={(e) => handleInputChange('areasOfInterest', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
          >
            <option value="">Select Interest</option>
            <option value="Technology">Technology</option>
            <option value="Management">Management</option>
            <option value="Design">Design</option>
            <option value="Healthcare">Healthcare</option>
            <option value="GovernmentJobs">Government Jobs</option>
            <option value="Research">Research</option>
            <option value="Entrepreneurship">Entrepreneurship</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Dream Job/Role
          </label>
          <input
            type="text"
            value={formData.dreamJobOrRole}
            onChange={(e) => handleInputChange('dreamJobOrRole', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            placeholder="e.g., Software Engineer, Doctor"
          />
        </div>
      </div>
    </div>
  );

  const renderSkillsAndStrengths = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Technical Skills
          </label>
          <select
            value={formData.technicalSkills}
            onChange={(e) => handleInputChange('technicalSkills', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
          >
            <option value="">Select Technical Skill</option>
            <option value="Programming">Programming</option>
            <option value="DataAnalysis">Data Analysis</option>
            <option value="DesignTools">Design Tools</option>
            <option value="WebDevelopment">Web Development</option>
            <option value="MobileDevelopment">Mobile Development</option>
            <option value="DatabaseManagement">Database Management</option>
            <option value="CloudComputing">Cloud Computing</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Soft Skills
          </label>
          <select
            value={formData.softSkills}
            onChange={(e) => handleInputChange('softSkills', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
          >
            <option value="">Select Soft Skill</option>
            <option value="Communication">Communication</option>
            <option value="Leadership">Leadership</option>
            <option value="Teamwork">Teamwork</option>
            <option value="ProblemSolving">Problem Solving</option>
            <option value="TimeManagement">Time Management</option>
            <option value="CriticalThinking">Critical Thinking</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Skill Level
          </label>
          <select
            value={formData.skillLevel}
            onChange={(e) => handleInputChange('skillLevel', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderHobbiesAndActivities = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Hobbies
          </label>
          <textarea
            value={formData.hobbies}
            onChange={(e) => handleInputChange('hobbies', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            rows="3"
            placeholder="List your hobbies"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Extracurricular Activities
          </label>
          <textarea
            value={formData.extracurricularActivities}
            onChange={(e) => handleInputChange('extracurricularActivities', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            rows="3"
            placeholder="Sports, clubs, volunteering, etc."
          />
        </div>
      </div>
    </div>
  );

  const renderAchievementsAndCertifications = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Academic Achievements
          </label>
          <textarea
            value={formData.academicAchievements}
            onChange={(e) => handleInputChange('academicAchievements', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            rows="2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Scholarships
          </label>
          <textarea
            value={formData.scholarships}
            onChange={(e) => handleInputChange('scholarships', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            rows="2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Certifications
          </label>
          <textarea
            value={formData.certifications}
            onChange={(e) => handleInputChange('certifications', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            rows="2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2F4156] mb-2">
            Competitions/Hackathons
          </label>
          <textarea
            value={formData.competitionsOrHackathons}
            onChange={(e) => handleInputChange('competitionsOrHackathons', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            rows="2"
          />
        </div>
      </div>
    </div>
  );

  const renderEntranceExams = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#2F4156] mb-2">
          Have you appeared for competitive exams?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="competitiveExams"
              checked={formData.appearedForCompetitiveExams === true}
              onChange={() => handleInputChange('appearedForCompetitiveExams', true)}
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="competitiveExams"
              checked={formData.appearedForCompetitiveExams === false}
              onChange={() => handleInputChange('appearedForCompetitiveExams', false)}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>
      
      {formData.appearedForCompetitiveExams && (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[#2F4156] mb-2">
              Exam Name
            </label>
            <input
              type="text"
              value={formData.examName}
              onChange={(e) => handleInputChange('examName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
              placeholder="e.g., JEE, NEET, CAT"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2F4156] mb-2">
              Score/Rank
            </label>
            <input
              type="text"
              value={formData.examScoreOrRank}
              onChange={(e) => handleInputChange('examScoreOrRank', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2F4156] mb-2">
              Exam Year
            </label>
            <input
              type="number"
              value={formData.examYear}
              onChange={(e) => handleInputChange('examYear', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] focus:border-transparent"
              placeholder="2024"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0: return renderBasicInformation();
      case 1: return renderAcademicDetails();
      case 2: return renderEducationGap();
      case 3: return renderCareerInterests();
      case 4: return renderSkillsAndStrengths();
      case 5: return renderHobbiesAndActivities();
      case 6: return renderAchievementsAndCertifications();
      case 7: return renderEntranceExams();
      default: return renderBasicInformation();
    }
  };

  return (
    <div className="bg-[#F5EFE8] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2F4156] mb-2">
            Complete Your Profile
          </h1>
          <p className="text-[#2F4156]">
            Help us understand you better to provide personalized career guidance
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#2F4156]">
              Step {currentSection + 1} of {sections.length}
            </span>
            <span className="text-sm text-[#2F4156]">
              {Math.round(((currentSection + 1) / sections.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#567C8D] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-[#2F4156] mb-6">
            {sections[currentSection]}
          </h2>
          
          {renderCurrentSection()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevSection}
              disabled={currentSection === 0}
              className="px-6 py-2 border border-[#2F4156] text-[#2F4156] rounded-lg hover:bg-[#C8D9E6] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentSection === sections.length - 1 ? (
              <button
                onClick={async () => {
                  try {
                    await saveProfileToDatabase(formData);
                  } catch (error) {
                    // Continue even if save fails for demo
                    console.error('Profile save failed:', error);
                  }
                  alert('Profile saved! (UI only)');
                }}
                className="px-6 py-2 bg-[#2F4156] text-white rounded-lg hover:bg-[#567C8D] transition"
              >
                Save Profile
              </button>
            ) : (
              <button
                onClick={nextSection}
                className="px-6 py-2 bg-[#2F4156] text-white rounded-lg hover:bg-[#567C8D] transition"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};