import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationCenter() {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="bg-white rounded-lg shadow-medical p-6 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Powiadomienia</h3>
      <ul className="divide-y divide-gray-200">
        {notifications.length === 0 && (
          <li className="py-4 text-gray-400 text-center">Brak powiadomień</li>
        )}
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className={`py-3 flex items-start gap-3 ${
              !notif.read ? "bg-medical-light" : ""
            }`}
          >
            <span
              className={`w-2 h-2 mt-2 rounded-full ${
                notif.type === "danger" ? "bg-red-500" : "bg-blue-500"
              }`}
            ></span>
            <div>
              <div className="text-sm">{notif.message}</div>
              <div className="text-xs text-gray-400">{notif.time}</div>
            </div>
            {!notif.read && (
              <button
                onClick={() => markAsRead(notif.id)}
                className="ml-auto text-xs text-medical-primary"
              >
                Oznacz jako przeczytane
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
