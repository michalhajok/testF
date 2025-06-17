export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-lg shadow-medical p-6">
      <h3 className="text-lg font-semibold mb-4">Ostatnie aktywności</h3>
      <ul className="divide-y divide-gray-200">
        {activities.map((activity, idx) => (
          <li key={idx} className="py-2 flex items-center gap-3">
            <span
              className={`w-2 h-2 rounded-full ${
                activity.type === "success" ? "bg-green-500" : "bg-blue-500"
              }`}
            ></span>
            <span className="text-sm">{activity.message}</span>
            <span className="ml-auto text-xs text-gray-400">
              {activity.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
