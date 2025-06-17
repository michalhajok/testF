export default function Avatar({ src, alt, initials }) {
  return src ? (
    <img src={src} alt={alt} className="w-10 h-10 rounded-full object-cover" />
  ) : (
    <span className="w-10 h-10 rounded-full bg-medical-primary flex items-center justify-center text-white font-bold">
      {initials}
    </span>
  );
}
