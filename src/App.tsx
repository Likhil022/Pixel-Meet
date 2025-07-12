import PhaserGame from "./PhaserGame";
import Navbar from "./Components/user/Navbar";
import Landing from "./Pages/Landing";
function App() {
  return (
    <>
      <div className="flex flex-col w-full items-center gap-1 h-screen bg-gradient-to-b from-[#bec4ff] to-[#21258d9f]">
        <Navbar />
        <div className="w-[90%]">
          <Landing />
          <PhaserGame />
        </div>
      </div>
    </>
  );
}

export default App;
