import { Button } from "@/Components/ui/button";
import Room from "@/Components/user/Room";
import { useState } from "react";
const Dashboard = () => {
  const [active, setActive] = useState("first");
  return (
    <div>
      <div className="flex justify-end gap-5 mt-4">
        <Button
          variant="outlineHoverFilled"
          onClick={() => setActive("first")}
          className={`${active === "first" ? "bg-black text-white" : ""}`}
        >
          Visited Space
        </Button>
        <Button
          variant="outlineHoverFilled"
          onClick={() => setActive("second")}
          className={`${active === "second" ? "bg-black text-white" : ""}`}
        >
          Created Spcae
        </Button>
        <Button variant="green">Create Space</Button>
      </div>
      <div>
        <Room />
      </div>
    </div>
  );
};

export default Dashboard;
