export default function QuickActions({ actions }) {
  return (
    <div className="bg-white rounded-lg shadow-medical p-6 flex flex-wrap gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.onClick}
          className="flex flex-col items-center p-4 bg-medical-light rounded-lg hover:bg-medical-primary hover:text-white transition"
        >
          {action.icon}
          <span className="mt-2 text-sm">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
