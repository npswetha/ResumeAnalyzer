
import { useState } from "react";
import axios from "axios";
import ResumeCard from "./ResumeCard";
import ResultsPanel from "./ResultsPanel";

function ResumeForm() {
  const [file, setFile] = useState(null);
  const [job, setJob] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({
    file: false,
    job: false,
  });

  const submit = async (e) => {
    e.preventDefault();

    const fileMissing = !file;
    const jobMissing = !job.trim();

    // Set validation errors
    setErrors({
      file: fileMissing,
      job: jobMissing,
    });

    // Stop if any required field is missing
    if (fileMissing || jobMissing) {
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);
    formData.append("job_description", job);

    setLoading(true);

    try {
      const res = await axios.post(
        "https://resumeanalyzer-y85i.onrender.com/analyze",
        formData
      );

      console.log("Backend response:", res.data);
     const analysisResult = res.data.analysis;

     console.log("SETTING RESULT:", analysisResult);

      setResult(analysisResult);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Something went wrong while analyzing the resume.");
    } finally {
      setLoading(false);
    }
  };
  console.log("CURRENT RESULT STATE:", result);

  return (
    <div>
      {/* Resume Analyzer Form */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Resume Analyzer
        </h1>

        {/* ==================== */}
        {/* PDF Upload */}
        {/* ==================== */}

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Resume
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const selectedFile = e.target.files[0];

              setFile(selectedFile || null);

              // Remove error when file is selected
              if (selectedFile) {
                setErrors((prev) => ({
                  ...prev,
                  file: false,
                }));
              }
            }}
            className={`block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700
              ${
                errors.file
                  ? "border-2 border-red-500 rounded-lg p-2"
                  : ""
              }`}
          />

          {/* Resume Error */}
          {errors.file && (
            <p className="mt-2 text-sm text-red-600">
              ⚠ Please upload your PDF resume.
            </p>
          )}
        </div>

        {/* ==================== */}
        {/* Job Description */}
        {/* ==================== */}

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description
          </label>

          <textarea
            value={job}
            onChange={(e) => {
              const value = e.target.value;

              setJob(value);

              // Remove error when user starts typing
              if (value.trim()) {
                setErrors((prev) => ({
                  ...prev,
                  job: false,
                }));
              }
            }}
            placeholder="Paste the job description here..."
            rows="6"
            className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2
              ${
                errors.job
                  ? "border-2 border-red-500 focus:ring-red-300"
                  : "border border-gray-300 focus:ring-blue-500"
              }`}
          />

          {/* Job Description Error */}
          {errors.job && (
            <p className="mt-2 text-sm text-red-600">
              ⚠ Please enter the job description.
            </p>
          )}
        </div>

        {/* ==================== */}
        {/* Analyze Button */}
        {/* ==================== */}

        <button
          onClick={submit}
          disabled={loading}
          className="px-6 py-2 rounded-lg
            bg-blue-600 text-white font-medium
            hover:bg-blue-700
            disabled:bg-gray-400
            disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {/* ==================== */}
      {/* PDF Preview */}
      {/* ==================== */}

      <ResumeCard file={file} />

      {/* ==================== */}
      {/* Analysis Result */}
      {/* ==================== */}

      {result && (
        <ResultsPanel analysis={result} />
      )}
    </div>
  );
}

export default ResumeForm;

