export default function Button({
  type = "button",
  variant = "primary",
  children,
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
    <button type={type} className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
