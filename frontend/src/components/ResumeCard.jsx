import { useEffect, useState } from "react";

function ResumeCard({ file }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setPdfUrl(null);
      return;
    }

    // Create a temporary URL for the uploaded PDF
    const url = URL.createObjectURL(file);
    setPdfUrl(url);

    // Clean up the URL when the file changes
    // or the component is removed
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!file || !pdfUrl) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 mt-6">
      
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Resume Preview
      </h2>

      <iframe
        src={pdfUrl}
        title="Resume Preview"
        className="w-full h-[600px] rounded-lg border border-gray-300"
      />

    </div>
  );
}

export default ResumeCard;