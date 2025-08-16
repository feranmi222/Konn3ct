import { useState } from "react";

export default function ChatPanel({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
      >
        💬
      </button>

      {/* Chat Panel */}
      <aside
        className={`
          ${isOpen ? "fixed inset-0 z-40 bg-white" : "hidden"} 
          md:flex md:static md:w-1/3 border border-gray-300 rounded-lg p-4 flex-col bg-white m-3
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Konn3ct AI</h2>
          <button
            onClick={() => {
              setIsOpen(false);
              if (onClose) onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Welcome to Konn3ct AI. Here are some things you can try...
        </p>

        <div className="space-y-2 mt-5 mb-4 p-2">
          <button className="w-full border rounded-md py-2">Highlights</button>
          <button className="w-full border rounded-md py-2">Meeting Summary</button>
        </div>

        <input
          type="text"
          placeholder="Ask anything about the meeting..."
          className="border rounded-md p-2 w-full mt-60 md:mt-auto"
        />
      </aside>
    </>
  );
}
