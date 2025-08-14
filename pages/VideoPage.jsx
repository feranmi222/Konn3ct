import { useState } from "react";
import ChatPanel from "../components/ChatPanel";

export default function VideoPage() {
  const [chatOpen, setChatOpen] = useState(true);
  const [fullScreenChat, setFullScreenChat] = useState(false);
  return (
    <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto h-full relative">
      {/* Video Section */}
      <div
        className={`flex-1 p-4 transition-all duration-300 ${chatOpen && !fullScreenChat ? "md:w-2/3" : "w-full"
          } ${fullScreenChat ? "hidden md:block" : ""}`}
      >
        <video controls className="w-full rounded-md">
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* Chat */}
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}

      {/* Reopen button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-20 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          💬 Chat
        </button>
      )}
    </div>
  );
}
