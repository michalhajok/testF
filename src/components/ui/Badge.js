export default function Badge({
  children,
  status = "default",
  className = "",
  ...props
}) {
  const statusClasses = {
    default: "bg-gray-100 text-gray-800",
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-300 text-gray-600",
    warning: "bg-medical-warning text-yellow-900",
    danger: "bg-medical-danger text-white",
  };

  return (
    <span
      role="status"
      aria-label={status}
      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
        statusClasses[status] || statusClasses.default
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
