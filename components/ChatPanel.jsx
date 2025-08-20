import { useState, useEffect } from "react";

const BASE_URL = "https://kv4-ai.vercel.app/konn3ctai";
const UUID = "565665yu-9878"; // replace dynamically if needed
const MEETING_ID = "535353";  // replace dynamically if needed

export default function ChatPanel({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✅ Load conversation when chat opens
  useEffect(() => {
    if (!isOpen) return;

    fetch(`${BASE_URL}/bot?uuid=${UUID}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data);
      })
      .catch((err) => console.error("Conversation fetch error:", err));
  }, [isOpen]);

  // ✅ Send message to bot
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(`${BASE_URL}/bot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid: UUID, message: input }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "No response" },
      ]);
    } catch (err) {
      console.error("Bot error:", err);
    }

    setInput("");
  };

  // ✅ Quick actions
  const fetchHighlight = async () => {
    const res = await fetch(`${BASE_URL}/highlights`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetingID: MEETING_ID }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "bot", text: data.highlights || "No highlights" }]);
  };

  const fetchSummary = async () => {
    const res = await fetch(`${BASE_URL}/summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetingID: MEETING_ID }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "bot", text: data.summary || "No summary" }]);
  };

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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-md ${
                msg.role === "user"
                  ? "bg-blue-100 text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Quick Action Buttons */}
        <div className="space-y-2 mt-5 mb-4 p-2">
          <button
            onClick={fetchHighlight}
            className="w-full border rounded-md py-2"
          >
            Highlights
          </button>
          <button
            onClick={fetchSummary}
            className="w-full border rounded-md py-2"
          >
            Meeting Summary
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask anything about the meeting..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="border rounded-md p-2 w-full"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-3 rounded-md"
          >
            Send
          </button>
        </div>
      </aside>
    </>
  );
}
