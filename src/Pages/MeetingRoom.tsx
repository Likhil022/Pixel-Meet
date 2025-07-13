import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/Components/ui/resizable";
import PhaserGame from "../PhaserGame";

const MeetingRoom = () => {
  return (
    <div className="h-screen w-screen overflow-hidden pr-1.5">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={70} minSize={30}>
          <div
            id="phaser-container"
            className="w-full h-full mt-3 mb-3 ml-1.5 mr-1.5 "
          >
            <PhaserGame />
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={30} minSize={20}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>Top Right</ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>Bottom Right</ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MeetingRoom;
