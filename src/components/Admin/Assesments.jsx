import { useState } from "react";
import { assessmentAPI } from "../../services/api";
import toast from "react-hot-toast";

export const StudentAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [{ question: "", options: ["", "", "", ""] }]
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index].question = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: "", options: ["", "", "", ""] }]
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
  };

  const openAddForm = () => {
    setEditingAssessment(null);
    setFormData({ title: "", description: "", questions: [{ question: "", options: ["", "", "", ""] }] });
    setShowForm(true);
  };

  const openEditForm = (assessment) => {
    setEditingAssessment(assessment);
    setFormData(assessment);
    setShowForm(true);
  };

  const saveAssessment = () => {
    if (editingAssessment) {
      // Edit existing assessment
      const updated = assessments.map(a => a === editingAssessment ? formData : a);
      setAssessments(updated);
      toast.success("Assessment updated!");
    } else {
      // Add new assessment
      setAssessments([...assessments, formData]);
      toast.success("Assessment added!");
    }
    setShowForm(false);
  };

  const deleteAssessment = (assessment) => {
    setAssessments(assessments.filter(a => a !== assessment));
    toast.success("Assessment deleted!");
  };

  return (
    <div className="p-6 bg-[#F5EFE8] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center">Assessments</h1>
        <button
          onClick={openAddForm}
          className="px-4 py-2 bg-[#2F4156] text-white rounded-lg hover:bg-[#567C8D]"
        >
          Add Assessment
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((a, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg">{a.title}</h3>
              <p className="text-sm text-gray-600">{a.description}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => openEditForm(a)} className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Edit</button>
              <button onClick={() => deleteAssessment(a)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-[#F5EFE8] bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingAssessment ? "Edit" : "Add"} Assessment</h2>
            
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg mb-4"
            />

            {formData.questions.map((q, qIndex) => (
              <div key={qIndex} className="mb-4 border p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <input
                    type="text"
                    placeholder={`Question ${qIndex + 1}`}
                    value={q.question}
                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                  <button onClick={() => removeQuestion(qIndex)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">X</button>
                </div>
                {q.options.map((opt, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="w-full p-2 border rounded-lg mb-2"
                  />
                ))}
              </div>
            ))}

            <button onClick={addQuestion} className="px-4 py-2 mb-4 bg-[#2F4156] text-white rounded-lg hover:bg-[#567C8D">
              + Add Question
            </button>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={saveAssessment} className="px-4 py-2 bg-[#2F4156] text-white rounded-lg hover:bg-[#567C8D]">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
