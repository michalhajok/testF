export default function AuthHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
    </div>
  );
}
