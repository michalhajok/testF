import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="bg-medical-primary text-white flex items-center justify-between px-6 py-4 shadow-medical">
      <div className="flex items-center gap-4">
        <img src="/images/logo.svg" alt="Logo" className="h-8" />
        <span className="font-medical text-xl">FizjoKlinika</span>
      </div>
      <Navigation />
      <Avatar src="/images/avatars/user.jpg" alt="Użytkownik" initials="AB" />
    </header>
  );
}
