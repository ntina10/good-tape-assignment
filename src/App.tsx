export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-6 p-10 bg-white rounded-2xl shadow-xl text-center max-w-sm">
        {/* Testing a custom text color */}
        <h1 className="text-2xl font-bold text-purple-900">Tailwind works</h1>

        <p className="text-gray-600">This is text.</p>

        <button className="px-6 py-4 bg-purple-brand text-white font-semibold rounded-full shadow-tint-default hover:bg-purple-600 transition-colors">
          Look at that shadow!
        </button>
      </div>
    </div>
  );
}
