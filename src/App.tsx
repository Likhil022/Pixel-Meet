import PhaserGame from "./PhaserGame";

function App() {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center gap-1">
        <h1 className="text-3xl font-bold">Tappy Town</h1>
        <PhaserGame />
      </div>
    </>
  );
}

export default App;
