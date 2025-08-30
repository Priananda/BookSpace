import ThemeToggle from "./ModeToggle";

export default function Header() {
  return (
    <header className="p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">BookSpace</h1>
      <ThemeToggle />
    </header>
  );
}
