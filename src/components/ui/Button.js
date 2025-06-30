export default function Button({
  type = "button",
  variant = "primary",
  children,
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  const base =
    "px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 transition";
  const variants = {
    primary: "bg-medical-primary text-white hover:bg-medical-secondary",
    secondary:
      "bg-white text-medical-primary border border-medical-primary hover:bg-medical-light",
    danger: "bg-medical-danger text-white hover:bg-red-700",
    success: "bg-medical-secondary text-white hover:bg-green-700",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant] || variants.primary} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />{" "}
          Ładowanie...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
