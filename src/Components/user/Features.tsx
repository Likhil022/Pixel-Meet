// src/components/Features.jsx
import { Video, Mic, ShieldCheck, MessageCircle } from "lucide-react";

const features = [
  {
    title: "Instant Rooms",
    description:
      "Create and join meetings with a single click — no installation needed.",
    icon: <Video className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Crystal Clear Calls",
    description:
      "High-quality video and audio to keep conversations smooth and clear.",
    icon: <Mic className="w-8 h-8 text-green-600" />,
  },
  {
    title: "Secure & Private",
    description: "End-to-end encrypted rooms. Your data stays yours.",
    icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
  },
  {
    title: "Real-Time Chat",
    description: "Chat live with participants during calls.",
    icon: <MessageCircle className="w-8 h-8 text-pink-600" />,
  },
];

export default function Features() {
  return (
    <section className="py-16 my-10 bg-white rounded-[0.5rem] w-full ">
      <div className="max-w-6xl mx-auto px-6 pb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Powerful Features
        </h2>
        <p className="text-gray-600 mb-12">
          Everything you need for seamless online meetings.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition flex flex-col justify-center items-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
