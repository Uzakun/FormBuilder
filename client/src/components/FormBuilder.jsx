import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  Edit3,
  Eye,
  GripVertical,
  Plus,
  Save,
  Trash2,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

const API_BASE = typeof window !== 'undefined' && window.location.origin.includes('vercel.app') 
  ? '/api' 
  : 'http://localhost:5000/api';

const FormBuilder = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [forms, setForms] = useState([]);
  const [currentForm, setCurrentForm] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load forms on component mount
  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/forms`);
      setForms(response.data);
    } catch (error) {
      console.error("Error loading forms:", error);
      alert("Error loading forms");
    } finally {
      setLoading(false);
    }
  };

  // Dashboard Component
  const Dashboard = () => {
    const createNewForm = () => {
      const newForm = {
        title: "Untitled Form",
        description: "Form description...",
        headerImage: "",
        questions: [],
      };
      setCurrentForm(newForm);
      setCurrentView("editor");
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Form Builder</h1>
              <p className="text-gray-600">
                Create forms with categorize, cloze, and comprehension questions
              </p>
            </div>
            <button
              onClick={createNewForm}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Form
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">Loading forms...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forms.map((form) => (
                <div
                  key={form._id}
                  className="bg-white rounded-lg shadow border overflow-hidden"
                >
                  {form.headerImage && (
                    <img
                      src={form.headerImage}
                      alt="Header"
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{form.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {form.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{form.questions.length} questions</span>
                      <span>{form.responses || 0} responses</span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setCurrentForm(form);
                          setCurrentView("editor");
                        }}
                        className="flex items-center px-3 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setCurrentForm(form);
                          setCurrentView("preview");
                        }}
                        className="flex items-center px-3 py-2 text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Form Editor Component
  const FormEditor = () => {
    const [form, setForm] = useState(
      currentForm || {
        title: "Untitled Form",
        description: "Form description...",
        headerImage: "",
        questions: [],
      }
    );

    const addQuestion = (type) => {
      const baseQuestion = {
        id: Date.now(),
        type,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Question`,
      };

      let newQuestion;
      switch (type) {
        case "categorize":
          newQuestion = {
            ...baseQuestion,
            categories: ["Category 1", "Category 2"],
            items: [
              { text: "Item 1", correctCategory: "Category 1" },
              { text: "Item 2", correctCategory: "Category 2" },
            ],
          };
          break;
        case "cloze":
          newQuestion = {
            ...baseQuestion,
            sentence: "The quick brown fox jumps over the lazy dog.",
            blanks: [],
            options: [],
          };
          break;
        case "comprehension":
          newQuestion = {
            ...baseQuestion,
            passage: "Enter your passage here...",
            mcqs: [
              {
                id: Date.now(),
                question: "Sample question?",
                options: ["Option A", "Option B", "Option C", "Option D"],
                correctAnswer: 0,
              },
            ],
          };
          break;
      }

      setForm((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
      }));
      setSelectedQuestion(newQuestion);
    };

    const updateQuestion = (questionId, updates) => {
      setForm((prev) => ({
        ...prev,
        questions: prev.questions.map((q) =>
          q.id === questionId ? { ...q, ...updates } : q
        ),
      }));
      if (selectedQuestion && selectedQuestion.id === questionId) {
        setSelectedQuestion({ ...selectedQuestion, ...updates });
      }
    };

    const deleteQuestion = (questionId) => {
      setForm((prev) => ({
        ...prev,
        questions: prev.questions.filter((q) => q.id !== questionId),
      }));
      setSelectedQuestion(null);
    };

    const saveForm = async () => {
      try {
        setLoading(true);
        if (form._id) {
          // Update existing form
          await axios.put(`${API_BASE}/forms/${form._id}`, form);
        } else {
          // Create new form
          const response = await axios.post(`${API_BASE}/forms`, form);
          setForm(response.data);
        }
        setCurrentForm(form);
        alert("Form saved successfully!");
        await loadForms();
      } catch (error) {
        console.error("Error saving form:", error);
        alert("Error saving form");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView("dashboard")}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back to Dashboard
              </button>
              <div>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setCurrentForm(form);
                  setCurrentView("preview");
                }}
                className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              <button
                onClick={saveForm}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex">
          {/* Main Editor */}
          <div className="flex-1 p-6">
            {/* Form Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Form Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Header Image URL
                </label>
                <input
                  type="text"
                  value={form.headerImage}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      headerImage: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {form.questions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  isSelected={selectedQuestion?.id === question.id}
                  onClick={() => setSelectedQuestion(question)}
                  onDelete={() => deleteQuestion(question.id)}
                />
              ))}

              {/* Add Question Buttons */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Add Question</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => addQuestion("categorize")}
                    className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50"
                  >
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="font-medium">Categorize</div>
                    <div className="text-sm text-gray-500">
                      Drag items to categories
                    </div>
                  </button>
                  <button
                    onClick={() => addQuestion("cloze")}
                    className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50"
                  >
                    <div className="text-2xl mb-2">📝</div>
                    <div className="font-medium">Cloze</div>
                    <div className="text-sm text-gray-500">
                      Fill in the blanks
                    </div>
                  </button>
                  <button
                    onClick={() => addQuestion("comprehension")}
                    className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50"
                  >
                    <div className="text-2xl mb-2">📖</div>
                    <div className="font-medium">Comprehension</div>
                    <div className="text-sm text-gray-500">Passage + MCQs</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Question Settings */}
          {selectedQuestion && (
            <div className="w-96 bg-white border-l p-6 h-screen overflow-y-auto">
              <QuestionSettings
                question={selectedQuestion}
                onUpdate={(updates) =>
                  updateQuestion(selectedQuestion.id, updates)
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Question Card Component
  const QuestionCard = ({ question, index, isSelected, onClick, onDelete }) => {
    return (
      <div
        className={`bg-white rounded-lg shadow-sm border p-6 cursor-pointer transition-all ${
          isSelected
            ? "ring-2 ring-blue-500 border-blue-500"
            : "hover:shadow-md"
        }`}
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <GripVertical className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Question {index + 1}</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
              {question.type}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-lg font-medium mb-4">{question.title}</h3>
        <QuestionPreview question={question} />
      </div>
    );
  };

  // Question Preview Component
  const QuestionPreview = ({ question }) => {
    switch (question.type) {
      case "categorize":
        return (
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              Categories: {question.categories.join(", ")}
            </div>
            <div className="flex flex-wrap gap-2">
              {question.items.map((item, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 bg-gray-100 rounded text-sm"
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        );
      case "cloze":
        return (
          <div className="space-y-2">
            <div className="text-sm bg-gray-50 p-3 rounded">
              {question.sentence}
            </div>
            {question.options && question.options.length > 0 && (
              <div className="text-sm text-gray-600">
                Options: {question.options.join(", ")}
              </div>
            )}
          </div>
        );
      case "comprehension":
        return (
          <div className="space-y-2">
            <div className="text-sm bg-gray-50 p-3 rounded">
              {question.passage.slice(0, 100)}...
            </div>
            <div className="text-sm text-gray-600">
              {question.mcqs.length} MCQ question(s)
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Question Settings Component
  const QuestionSettings = ({ question, onUpdate }) => {
    const [localQuestion, setLocalQuestion] = useState(question);

    useEffect(() => {
      setLocalQuestion(question);
    }, [question]);

    const handleUpdate = (field, value) => {
      const updated = { ...localQuestion, [field]: value };
      setLocalQuestion(updated);
      onUpdate(updated);
    };

    // Cloze text processing
    const processClozeSentence = (text) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(`<div>${text}</div>`, "text/html");
      const underlinedElements = doc.querySelectorAll("u");

      const blanks = Array.from(underlinedElements).map((el, index) => ({
        id: index,
        text: el.textContent,
        position: index,
      }));

      const options = blanks.map((blank) => blank.text);

      handleUpdate("blanks", blanks);
      handleUpdate("options", options);
    };

    const renderCategorizeSettings = () => (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Categories</label>
          {localQuestion.categories.map((category, idx) => (
            <div key={idx} className="flex mb-2">
              <input
                type="text"
                value={category}
                onChange={(e) => {
                  const newCategories = [...localQuestion.categories];
                  newCategories[idx] = e.target.value;
                  handleUpdate("categories", newCategories);
                }}
                className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  const newCategories = localQuestion.categories.filter(
                    (_, i) => i !== idx
                  );
                  handleUpdate("categories", newCategories);
                }}
                className="px-3 py-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              handleUpdate("categories", [
                ...localQuestion.categories,
                "New Category",
              ])
            }
            className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500"
          >
            + Add Category
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Items</label>
          {localQuestion.items.map((item, idx) => (
            <div key={idx} className="space-y-2 mb-4 p-3 border rounded">
              <input
                type="text"
                value={item.text}
                onChange={(e) => {
                  const newItems = [...localQuestion.items];
                  newItems[idx].text = e.target.value;
                  handleUpdate("items", newItems);
                }}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Item text"
              />
              <select
                value={item.correctCategory}
                onChange={(e) => {
                  const newItems = [...localQuestion.items];
                  newItems[idx].correctCategory = e.target.value;
                  handleUpdate("items", newItems);
                }}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                {localQuestion.categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  const newItems = localQuestion.items.filter(
                    (_, i) => i !== idx
                  );
                  handleUpdate("items", newItems);
                }}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove Item
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newItems = [
                ...localQuestion.items,
                {
                  text: "New Item",
                  correctCategory: localQuestion.categories[0],
                },
              ];
              handleUpdate("items", newItems);
            }}
            className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500"
          >
            + Add Item
          </button>
        </div>
      </div>
    );

    const renderClozeSettings = () => (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Sentence</label>
          <div
            contentEditable
            className="w-full min-h-[100px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            dangerouslySetInnerHTML={{ __html: localQuestion.sentence }}
            onBlur={(e) => {
              const newSentence = e.target.innerHTML;
              handleUpdate("sentence", newSentence);
              processClozeSentence(newSentence);
            }}
          />
          <p className="text-xs text-gray-500 mt-1">
            Select text and use Ctrl+U (or Cmd+U) to underline words that should
            become blanks
          </p>
        </div>

        {localQuestion.options && localQuestion.options.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Options (Auto-generated from underlined text)
            </label>
            {localQuestion.options.map((option, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <GripVertical className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...localQuestion.options];
                    newOptions[idx] = e.target.value;
                    handleUpdate("options", newOptions);
                  }}
                  className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              onClick={() => {
                const newOptions = [
                  ...localQuestion.options,
                  "Additional option",
                ];
                handleUpdate("options", newOptions);
              }}
              className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500"
            >
              + Add More Options
            </button>
          </div>
        )}
      </div>
    );

    const renderComprehensionSettings = () => (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Passage</label>
          <textarea
            value={localQuestion.passage}
            onChange={(e) => handleUpdate("passage", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            MCQ Questions
          </label>
          {localQuestion.mcqs.map((mcq, idx) => (
            <div key={mcq.id} className="space-y-3 p-4 border rounded mb-4">
              <input
                type="text"
                value={mcq.question}
                onChange={(e) => {
                  const newMcqs = [...localQuestion.mcqs];
                  newMcqs[idx].question = e.target.value;
                  handleUpdate("mcqs", newMcqs);
                }}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter question..."
              />

              {mcq.options.map((option, optIdx) => (
                <div key={optIdx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`correct-${mcq.id}`}
                    checked={mcq.correctAnswer === optIdx}
                    onChange={() => {
                      const newMcqs = [...localQuestion.mcqs];
                      newMcqs[idx].correctAnswer = optIdx;
                      handleUpdate("mcqs", newMcqs);
                    }}
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newMcqs = [...localQuestion.mcqs];
                      newMcqs[idx].options[optIdx] = e.target.value;
                      handleUpdate("mcqs", newMcqs);
                    }}
                    className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    placeholder={`Option ${optIdx + 1}`}
                  />
                </div>
              ))}

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const newMcqs = [...localQuestion.mcqs];
                    newMcqs[idx].options.push("New option");
                    handleUpdate("mcqs", newMcqs);
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                >
                  + Add Option
                </button>
                <button
                  onClick={() => {
                    const newMcqs = localQuestion.mcqs.filter(
                      (_, i) => i !== idx
                    );
                    handleUpdate("mcqs", newMcqs);
                  }}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                >
                  Remove Question
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              const newMcqs = [
                ...localQuestion.mcqs,
                {
                  id: Date.now(),
                  question: "",
                  options: ["Option A", "Option B", "Option C", "Option D"],
                  correctAnswer: 0,
                },
              ];
              handleUpdate("mcqs", newMcqs);
            }}
            className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500"
          >
            + Add MCQ Question
          </button>
        </div>
      </div>
    );

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Question Settings</h3>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Question Title
          </label>
          <input
            type="text"
            value={localQuestion.title}
            onChange={(e) => handleUpdate("title", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {question.type === "categorize" && renderCategorizeSettings()}
        {question.type === "cloze" && renderClozeSettings()}
        {question.type === "comprehension" && renderComprehensionSettings()}
      </div>
    );
  };

  // Form Preview/Renderer Component
  const FormPreview = () => {
    const [responses, setResponses] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleResponse = (questionId, response) => {
      setResponses((prev) => ({
        ...prev,
        [questionId]: response,
      }));
    };

    const submitForm = async () => {
      try {
        setIsSubmitting(true);
        await axios.post(`${API_BASE}/responses`, {
          formId: currentForm._id,
          answers: responses,
        });
        alert("Form submitted successfully!");
        setCurrentView("dashboard");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form");
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setCurrentView("dashboard")}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to Dashboard
            </button>
          </div>

          <div className="bg-white rounded-lg shadow">
            {currentForm?.headerImage && (
              <img
                src={currentForm.headerImage}
                alt="Form header"
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}

            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4">{currentForm?.title}</h1>
              <p className="text-gray-600 mb-8">{currentForm?.description}</p>

              <div className="space-y-12">
                {currentForm?.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border-b pb-8 last:border-b-0"
                  >
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-500">
                          Question {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold">
                        {question.title}
                      </h3>
                    </div>

                    <QuestionRenderer
                      question={question}
                      onResponse={handleResponse}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t">
                <button
                  onClick={submitForm}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Form"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Question Renderer Component
  const QuestionRenderer = ({ question, onResponse }) => {
    switch (question.type) {
      case "categorize":
        return (
          <CategorizeRenderer question={question} onResponse={onResponse} />
        );
      case "cloze":
        return <ClozeRenderer question={question} onResponse={onResponse} />;
      case "comprehension":
        return (
          <ComprehensionRenderer question={question} onResponse={onResponse} />
        );
      default:
        return null;
    }
  };

  // Categorize Renderer - Drag and Drop Interface
  const CategorizeRenderer = ({ question, onResponse }) => {
    const [draggedItem, setDraggedItem] = useState(null);
    const [categorizedItems, setCategorizedItems] = useState({});
    const [availableItems, setAvailableItems] = useState(
      question.items?.map((item) => item.text) || []
    );

    const handleDragStart = (e, item) => {
      setDraggedItem(item);
      e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e, category) => {
      e.preventDefault();
      if (draggedItem) {
        setAvailableItems((prev) =>
          prev.filter((item) => item !== draggedItem)
        );
        setCategorizedItems((prev) => ({
          ...prev,
          [category]: [...(prev[category] || []), draggedItem],
        }));

        const newCategorized = {
          ...categorizedItems,
          [category]: [...(categorizedItems[category] || []), draggedItem],
        };
        onResponse(question.id, newCategorized);
        setDraggedItem(null);
      }
    };

    const removeFromCategory = (item, category) => {
      setCategorizedItems((prev) => ({
        ...prev,
        [category]: prev[category].filter((i) => i !== item),
      }));
      setAvailableItems((prev) => [...prev, item]);

      const newCategorized = {
        ...categorizedItems,
        [category]: categorizedItems[category].filter((i) => i !== item),
      };
      onResponse(question.id, newCategorized);
    };

    return (
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">
            Drag items to the correct categories:
          </h4>
          <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg min-h-[80px] border-2 border-dashed border-gray-300">
            {availableItems.map((item, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="px-4 py-2 bg-white border-2 border-blue-200 rounded-lg cursor-move hover:shadow-lg hover:border-blue-400 transition-all select-none"
              >
                {item}
              </div>
            ))}
            {availableItems.length === 0 && (
              <p className="text-gray-500 italic">
                All items have been categorized
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {question.categories?.map((category, idx) => (
            <div
              key={idx}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category)}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[150px] bg-gray-50"
            >
              <h5 className="font-semibold mb-4 text-center text-gray-700">
                {category}
              </h5>
              <div className="space-y-2">
                {categorizedItems[category]?.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="px-3 py-2 bg-green-100 border-2 border-green-300 rounded-lg flex justify-between items-center"
                  >
                    <span className="text-green-800">{item}</span>
                    <button
                      onClick={() => removeFromCategory(item, category)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Cloze Renderer - Fill in the Blanks
  const ClozeRenderer = ({ question, onResponse }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [usedOptions, setUsedOptions] = useState(new Set());

    const handleOptionDrop = (e, blankIndex) => {
      e.preventDefault();
      const option = e.dataTransfer.getData("text/plain");

      // Remove previous answer for this blank if exists
      const previousAnswer = selectedAnswers[blankIndex];
      if (previousAnswer) {
        setUsedOptions((prev) => {
          const newSet = new Set(prev);
          newSet.delete(previousAnswer);
          return newSet;
        });
      }

      // Set new answer
      setSelectedAnswers((prev) => ({
        ...prev,
        [blankIndex]: option,
      }));

      setUsedOptions((prev) => new Set([...prev, option]));
      onResponse(question.id, { ...selectedAnswers, [blankIndex]: option });
    };

    const handleOptionDrag = (e, option) => {
      e.dataTransfer.setData("text/plain", option);
    };

    const removeBlanks = (text) => {
      return text.replace(/<u[^>]*>(.*?)<\/u>/g, "___");
    };

    const renderSentenceWithBlanks = () => {
      const cleanText = removeBlanks(question.sentence);
      const parts = cleanText.split("___");
      const result = [];

      parts.forEach((part, index) => {
        result.push(<span key={`text-${index}`}>{part}</span>);

        if (index < parts.length - 1) {
          result.push(
            <span
              key={`blank-${index}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleOptionDrop(e, index)}
              className="inline-block mx-2 px-4 py-2 min-w-[120px] border-2 border-dashed border-blue-400 bg-blue-50 rounded text-center"
            >
              {selectedAnswers[index] || "Drop here"}
            </span>
          );
        }
      });

      return result;
    };

    return (
      <div className="space-y-6">
        <div className="text-lg leading-relaxed p-6 bg-gray-50 rounded-lg">
          {renderSentenceWithBlanks()}
        </div>

        <div>
          <h4 className="font-medium mb-3">
            Drag options to fill in the blanks:
          </h4>
          <div className="flex flex-wrap gap-3">
            {question.options?.map((option, idx) => (
              <div
                key={idx}
                draggable={!usedOptions.has(option)}
                onDragStart={(e) => handleOptionDrag(e, option)}
                className={`px-4 py-2 border-2 rounded-lg cursor-move transition-all ${
                  usedOptions.has(option)
                    ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                    : "bg-white border-blue-200 hover:border-blue-400 hover:shadow-md"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Comprehension Renderer
  const ComprehensionRenderer = ({ question, onResponse }) => {
    const [answers, setAnswers] = useState({});
    const [expandedQuestions, setExpandedQuestions] = useState(new Set([0]));

    const handleMCQAnswer = (mcqId, answerIndex) => {
      const newAnswers = { ...answers, [mcqId]: answerIndex };
      setAnswers(newAnswers);
      onResponse(question.id, newAnswers);
    };

    const toggleQuestion = (index) => {
      setExpandedQuestions((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    };

    return (
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-4">Read the passage carefully:</h4>
          <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {question.passage}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Answer the following questions:</h4>
          {question.mcqs?.map((mcq, idx) => (
            <div key={mcq.id} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleQuestion(idx)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 text-left"
              >
                <span className="font-medium">
                  {idx + 1}. {mcq.question}
                </span>
                {expandedQuestions.has(idx) ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {expandedQuestions.has(idx) && (
                <div className="p-4 space-y-3">
                  {mcq.options.map((option, optIdx) => (
                    <label
                      key={optIdx}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`mcq-${mcq.id}`}
                        value={optIdx}
                        checked={answers[mcq.id] === optIdx}
                        onChange={() => handleMCQAnswer(mcq.id, optIdx)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <div>
      {currentView === "dashboard" && <Dashboard />}
      {currentView === "editor" && <FormEditor />}
      {currentView === "preview" && <FormPreview />}
    </div>
  );
};

export default FormBuilder;
