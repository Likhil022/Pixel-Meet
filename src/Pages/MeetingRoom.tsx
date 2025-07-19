import PhaserGame from "../PhaserGame";
import MeetngFooter from "@/Components/user/MeetngFooter";
import CameraView from "@/Components/user/CameraView";
import { useEffect, useState } from "react";
import RemoteVideoView from "@/Components/user/RemoteVideoView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { MessageSquare, Video } from "lucide-react";

const MeetingRoom = () => {
  const [cameraOn, setCameraOn] = useState(true);
  const [activeTab, setActiveTab] = useState("chat");

  const [micOn, setMicOn] = useState(false);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: false })
      .then((stream) => {
        setRemoteStream(stream);
      })
      .catch((err) => console.error("Error getting test remote stream:", err));
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-blue-950">
      {/* Top half: Phaser + Side Panel */}
      <div className="flex flex-grow overflow-hidden">
        {/* Phaser container (left side) */}
        <div
          id="phaser-container"
          className="relative w-full h-full p-2 box-border overflow-hidden"
        >
          <PhaserGame />
          {activeTab === "chat" && remoteStream && (
            <div className="absolute top-4 right-4 w-64 aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-white z-10">
              <RemoteVideoView stream={remoteStream} />
            </div>
          )}
        </div>

        {/* Resizable right panel */}
        <div className="w-[50%] flex flex-col ">
          <Tabs
            defaultValue="chat"
            className="w-full max-w-[400px]"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            {/* Tabs List */}
            <TabsList className="flex w-full justify-center gap-4 mt-2 ml-2">
              <TabsTrigger value="chat">
                <MessageSquare className="w-5 h-5" />
              </TabsTrigger>
              <TabsTrigger value="video">
                <Video className="w-5 h-5" />
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent
              value="chat"
              className="ml-3 mr-3 flex flex-col gap-2 w-[97.5%]"
            >
              {/* Messages Area */}
              <div className="h-[425px] w-full bg-gray-700 rounded-lg p-3 text-white overflow-y-auto space-y-2 shadow-md">
                {/* Replace with mapped messages later */}
                <div className="bg-gray-600 px-3 py-2 rounded-md w-fit">
                  User 1: Hello
                </div>
                <div className="bg-blue-600 px-3 py-2 rounded-md w-fit self-end">
                  You: Hi there!
                </div>
              </div>

              {/* Input Area */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-md px-3 py-2 bg-gray-600 text-white outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">
                  Send
                </button>
              </div>
            </TabsContent>

            {/* Video Tab */}
            <TabsContent value="video">
              <div className="aspect-video w-full bg-gray-700 m-2 rounded-[0.3rem] overflow-hidden">
                <RemoteVideoView stream={remoteStream} />
              </div>
              <div className="aspect-video w-full bg-gray-700 m-2 rounded-[0.3rem] overflow-hidden">
                <CameraView isCameraOn={cameraOn} micOn={micOn} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
      <div className="h-auto">
        <MeetngFooter
          cameraOn={cameraOn}
          setCameraOn={setCameraOn}
          micOn={micOn}
          setMicOn={setMicOn}
        />
      </div>
    </div>
  );
};

export default MeetingRoom;
