// src/components/HowItWorks.jsx
import { LogIn, Share2, Users } from "lucide-react";

const steps = [
  {
    title: "Sign In or Create Room",
    description:
      "Start a new meeting instantly or log in to manage your sessions.",
    icon: <LogIn className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Share the Link",
    description: "Send the room link to participants. No downloads needed.",
    icon: <Share2 className="w-8 h-8 text-teal-600" />,
  },
  {
    title: "Talk, Chat & Share",
    description: "Communicate freely with video, audio, and real-time chat.",
    icon: <Users className="w-8 h-8 text-rose-600" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          How Pixel Meet Works
        </h2>
        <p className="text-gray-600 mb-12">
          Start a meeting in 3 simple steps.
        </p>

        <div className="grid gap-12 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
