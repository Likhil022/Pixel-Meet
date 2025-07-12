// import PhaserGame from "./PhaserGame";
import Navbar from "./Components/user/Navbar";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div className="flex flex-col w-full items-center gap-1 h-screen bg-gradient-to-b from-[#bec4ff] to-[#21258d9f]">
        <Navbar />
        <div className="w-[90%]">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>

          {/* <PhaserGame /> */}
        </div>
      </div>
    </>
  );
}

export default App;
