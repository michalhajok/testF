export default function Badge({ children, status = "default" }) {
  const statusClasses = {
    default: "bg-gray-100 text-gray-800",
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-300 text-gray-600",
    warning: "bg-medical-warning text-yellow-900",
    danger: "bg-medical-danger text-white",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}
    >
      {children}
    </span>
  );
}
