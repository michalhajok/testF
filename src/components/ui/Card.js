export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg shadow-medical p-6 ${className}`}>
      {children}
    </div>
  );
}
