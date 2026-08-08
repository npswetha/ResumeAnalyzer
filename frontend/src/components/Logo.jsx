function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-lg">
        R
      </div>

      <div>
        <div className="text-lg font-bold text-gray-900">
          ResumeFit
        </div>

        <div className="text-xs text-gray-500">
          Resume Analyzer
        </div>
      </div>
    </div>
  );
}

export default Logo;