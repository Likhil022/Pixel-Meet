import { useEffect, useRef } from "react";
import { VideoOff, MicOff } from "lucide-react";

interface Props {
  isCameraOn: boolean;
  micOn: boolean;
}

const CameraView = ({ isCameraOn, micOn }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Only restart stream when camera state changes
  useEffect(() => {
    const startCamera = async () => {
      try {
        if (isCameraOn) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          streamRef.current = stream;

          // Assign stream to video element
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } else {
          // Stop only video tracks
          streamRef.current?.getVideoTracks().forEach((track) => track.stop());
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      // Clean up on unmount
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [isCameraOn]);

  // When mic state changes, enable/disable audio track (no full restart)
  useEffect(() => {
    const stream = streamRef.current;
    const audioTracks = stream?.getAudioTracks();

    if (audioTracks && audioTracks.length > 0) {
      audioTracks.forEach((track) => {
        track.enabled = micOn;
      });
    }
  }, [micOn]);

  return (
    <div className="relative w-full h-full rounded-[0.3rem] overflow-hidden shadow-lg bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Camera OFF overlay */}
      {!isCameraOn && (
        <div className="absolute inset-0 bg-gray-700 bg-opacity-80 flex items-center justify-center transition-opacity duration-300">
          <VideoOff className="w-12 h-12 text-white opacity-70" />
        </div>
      )}

      {/* Mic OFF icon */}
      {isCameraOn && !micOn && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-1 rounded-full">
          <MicOff className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default CameraView;
