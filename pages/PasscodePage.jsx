import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function PasscodePage({ onSignIn  }) {
  const [passcode, setPasscode] = useState("");
  const [meetingName, setMeetingName] = useState("Loading...");
  const { recordId } = useParams();
  useEffect(() => {
    
    console.log("Fetching meeting title for recordId:", recordId);
    if (!recordId) return;


    const fetchTitle = async () => {
      try {
        const response = await fetch(
          `https://meet.konn3ct.ng/presentation/${recordId}/metadata.xml`
        );
        if (!response.ok) throw new Error("Failed to fetch metadata");

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        // ✅ First, try <meta><meetingName>
        let titleNode = xmlDoc.getElementsByTagName("meetingName")[0];

        // ✅ Fallback: use the "name" attribute on <meeting>
        if (!titleNode) {
          const meetingNode = xmlDoc.getElementsByTagName("meeting")[0];
          if (meetingNode?.getAttribute("name")) {
            setMeetingName(meetingNode.getAttribute("name"));
            return;
          }
        }

        setMeetingName(titleNode ? titleNode.textContent.trim() : "Invalid Record ID");
      } catch (err) {
        console.error("Error fetching meeting title:", err);
        setMeetingName("Invalid Record ID");
      }
    };

    fetchTitle();
  }, [recordId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(passcode, recordId);
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
