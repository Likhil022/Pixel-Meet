import { useEffect, useRef } from "react";

interface RemoteVideoViewProps {
  stream: MediaStream | null;
}

const RemoteVideoView = ({ stream }: RemoteVideoViewProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={false}
        className="w-full h-full object-cover"
      />
      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
          Waiting for remote user...
        </div>
      )}
    </div>
  );
};

export default RemoteVideoView;
