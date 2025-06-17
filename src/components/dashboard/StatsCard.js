export default function StatsCard({
  icon,
  title,
  value,
  change,
  color = "primary",
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-medical p-6 flex items-center gap-4 border-l-4 border-medical-${color}`}
    >
      <div className="p-3 rounded-full bg-medical-light">{icon}</div>
      <div>
        <div className="text-gray-500 text-sm">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div
            className={`text-xs mt-1 ${
              change > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change > 0 ? "+" : ""}
            {change}%
          </div>
        )}
      </div>
    </div>
  );
}
