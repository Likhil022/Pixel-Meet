// import PhaserGame from "./PhaserGame";
import Navbar from "./Components/user/Navbar";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import { Routes, Route, useLocation } from "react-router-dom";
import MeetingRoom from "./Components/user/MeetingRoom";
function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/room/");
  return (
    <>
      <div className="flex flex-col w-full items-center gap-1 h-screen bg-gradient-to-b from-[#bec4ff] to-[#21258d9f]">
        {!hideNavbar && <Navbar />}
        <div className="w-[90%]">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/Room/:roomId" element={<MeetingRoom />}></Route>
          </Routes>

          {/* <PhaserGame /> */}
        </div>
      </div>
    </>
  );
}

export default App;
