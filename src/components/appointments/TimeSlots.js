export default function TimeSlots({ slots, onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {slots.map((slot) => (
        <button
          key={slot.time}
          disabled={!slot.available}
          onClick={() => onSelect(slot)}
          className={`py-2 px-4 rounded ${
            slot.available ? "bg-medical-primary" : "bg-gray-300"
          }`}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
}
