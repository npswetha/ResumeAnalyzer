import {
  AlertTriangle,
  Lightbulb,
  FileText,
} from "lucide-react";

import ScoreDial from "./ScoreDial";


function ResultsPanel({ analysis }) {

  const data = {
    score: analysis?.score ?? 0,
    missingSkills: analysis?.missing_skills ?? [],
    suggestions: analysis?.suggestions ?? [],
    summary: analysis?.summary ?? "",
  };

  return (
    <div className="mt-6 space-y-6">


      {/* =====================================
          SCORE + SUMMARY
      ===================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="grid items-center gap-8 md:grid-cols-[180px_1fr]">


          {/* SCORE */}

          <ScoreDial score={data.score} />


          {/* SUMMARY */}

          <div>

            <div className="mb-2 flex items-center gap-2">

              <FileText
                className="h-5 w-5 text-indigo-600"
              />

              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Resume Analysis
              </p>

            </div>


            <h2 className="text-2xl font-bold text-gray-900">

              {data.score >= 75
                ? "Strong Match"
                : data.score >= 50
                ? "Moderate Match"
                : "Needs Improvement"}

            </h2>


            <p className="mt-3 text-sm leading-7 text-gray-600">
              {data.summary ||
                "Your resume has been analyzed against the provided job description."}
            </p>

          </div>

        </div>

      </div>


      {/* =====================================
          MISSING SKILLS
      ===================================== */}

      {data.missingSkills.length > 0 && (

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-2">

            <AlertTriangle className="h-5 w-5 text-yellow-500" />

            <h3 className="text-lg font-semibold text-gray-900">
              Missing Skills
            </h3>

          </div>


          <p className="mt-1 text-sm text-gray-500">
            Skills or experiences that may be missing from your resume.
          </p>


          <ul className="mt-5 space-y-3">

            {data.missingSkills.map((skill, index) => (

              <li
                key={index}
                className="flex items-start gap-3 rounded-xl border border-yellow-100 bg-yellow-50 p-4"
              >

                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" />

                <span className="text-sm leading-6 text-gray-700">
                  {skill}
                </span>

              </li>

            ))}

          </ul>

        </div>

      )}


      {/* =====================================
          SUGGESTIONS
      ===================================== */}

      {data.suggestions.length > 0 && (

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-2">

            <Lightbulb className="h-5 w-5 text-indigo-500" />

            <h3 className="text-lg font-semibold text-gray-900">
              Suggestions
            </h3>

          </div>


          <p className="mt-1 text-sm text-gray-500">
            Recommendations to improve your resume.
          </p>


          <ol className="mt-5 space-y-3">

            {data.suggestions.map((suggestion, index) => (

              <li
                key={index}
                className="flex gap-3 text-sm leading-6 text-gray-600"
              >

                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-600">
                  {index + 1}
                </span>

                <span>
                  {suggestion}
                </span>

              </li>

            ))}

          </ol>

        </div>

      )}

    </div>
  );
}


export default ResultsPanel;