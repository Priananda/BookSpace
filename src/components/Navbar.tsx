// components/Header.tsx
import ThemeToggle from "./ThemeToggle";
export default function Header() {
  return (
    <header className="p-4 border-b flex justify-between items-center">
      <h1 className="font-bold">My App</h1>
      <ThemeToggle />
    </header>
  );
}
