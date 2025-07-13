import { useUser } from "@clerk/clerk-react";
import { Circle, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { Link } from "react-router-dom";

const MeetngFooter = ({ cameraOn, setCameraOn, micOn, setMicOn }: Props) => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex justify-between items-center p-4 h-12 fixed bottom-0 w-full bg-[#182750] text-white border-t-1">
      <div className="flex items-center gap-2">
        <Link to="/">
          <p className="text-xl h-10 font-bold bg-gray-500 rounded-md py-1 px-1.5 mx-1">
            PM
          </p>
        </Link>
        <div className="w-px h-5 bg-gray-300 hover:bg-gray-200 cursor-pointer" />
        {isSignedIn && user && (
          <div className="flex items-center gap-2 bg-gray-500 rounded-md p-2 h-10 cursor-pointer">
            <img
              src={user.imageUrl}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="align-middle cursor-pointer ">
              <span className="text-sm">{user.fullName}</span>
              <p className="text-sm flex items-center gap-1 text-gray-300">
                <Circle className="w-2 h-2 p-0 fill-green-500 opacity-100" />
                Availble
              </p>
            </div>
          </div>
        )}
        <div>
          <div className="">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-2 m-2 rounded-full ${
                micOn ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {micOn ? (
                <Mic className="w-5 h-5" />
              ) : (
                <MicOff className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setCameraOn(!cameraOn)}
              className={`p-2 rounded-full ${
                cameraOn ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {cameraOn ? (
                <Video className="w-5 h-5" />
              ) : (
                <VideoOff className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
type Props = {
  cameraOn: boolean;
  setCameraOn: (on: boolean) => void;
  micOn: boolean;
  setMicOn: (on: boolean) => void;
};

export default MeetngFooter;
