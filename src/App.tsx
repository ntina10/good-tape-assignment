import { Button } from "./components/Button";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col gap-6 p-12 border-2 border-dashed border-purple-400 rounded-3xl bg-white/50">
        {/* Default, with tint */}
        <Button shadow="tint">Lorem ipsum</Button>

        {/* Default, no tint */}
        <Button>Clickable</Button>

        {/* Loading */}
        <Button loading progress={60}>
          Lorem ipsum
        </Button>

        {/* Disabled */}
        <Button disabled>Lorem ipsum</Button>
      </div>
    </div>
  );
}
