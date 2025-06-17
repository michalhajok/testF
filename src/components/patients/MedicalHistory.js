export default function MedicalHistory({ history }) {
  return (
    <div>
      <h4 className="font-semibold mb-2">Historia medyczna</h4>
      <ul className="divide-y divide-gray-200">
        {history.map((item, idx) => (
          <li key={idx} className="py-2">
            <div className="text-sm">
              {item.date}: {item.description}
            </div>
            <div className="text-xs text-gray-500">{item.doctor}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
