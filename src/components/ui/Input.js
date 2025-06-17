export default function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-medical-primary ${
          error ? "border-medical-danger" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <p className="text-medical-danger text-xs mt-1">{error}</p>}
    </div>
  );
}
