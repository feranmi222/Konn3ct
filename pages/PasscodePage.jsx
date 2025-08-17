import { useState, useEffect } from "react";

export default function PasscodePage({ onSignIn, recordId }) {
  const [passcode, setPasscode] = useState("");
  const [meetingName, setMeetingName] = useState("Loading...");

  useEffect(() => {
    if (!recordId) return;

    const fetchTitle = async () => {
      try {
        // ✅ Fetch metadata.xml for this recordId
        const response = await fetch(
          `/api/presentation/${recordId}/metadata.xml`
        );

        if (!response.ok) throw new Error("Failed to fetch metadata");

        const text = await response.text();

        // Parse XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        // Try multiple possible title fields
        const titleNode =
          xmlDoc.getElementsByTagName("meetingName")[0] ||
          xmlDoc.getElementsByTagName("name")[0] ||
          xmlDoc.getElementsByTagName("title")[0];

        if (titleNode) {
          setMeetingName(titleNode.textContent);
        } else {
          setMeetingName("Untitled Meeting");
        }
      } catch (err) {
        console.error("Error fetching meeting title:", err);
        setMeetingName("Failed to load meeting");
      }
    };

    fetchTitle();
  }, [recordId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(passcode);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto flex flex-col items-center gap-4 px-4"
    >
      <h1 className="w-full text-center text-lg md:text-xl font-medium">
        Enter the passcode to watch
        <br />
        “{meetingName}”
      </h1>

      <input
        type="text"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
        placeholder="Passcode"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
      >
        Sign In
      </button>
    </form>
  );
}
