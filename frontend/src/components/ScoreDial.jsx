function ScoreDial({ score = 0 }) {
  const clamped = Math.max(
    0,
    Math.min(100, Math.round(Number(score) || 0))
  );

  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const dash = (clamped / 100) * circumference;

  let colorClass = "text-red-500";

  if (clamped >= 75) {
    colorClass = "text-green-500";
  } else if (clamped >= 50) {
    colorClass = "text-yellow-500";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-36 w-36">

        <svg
          viewBox="0 0 110 110"
          className="h-full w-full -rotate-90"
        >

          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            strokeWidth="9"
            className="stroke-gray-200"
          />

          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            className={`${colorClass} transition-all duration-700 ease-out`}
            stroke="currentColor"
          />

        </svg>


        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <span className={`text-3xl font-bold ${colorClass}`}>
            {clamped}
          </span>

          <span className="text-xs text-gray-500">
            Match
          </span>

        </div>

      </div>
    </div>
  );
}

export default ScoreDial;