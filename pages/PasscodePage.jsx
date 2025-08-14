import { useState } from "react";

export default function PasscodePage({ onSignIn }) {
  const [passcode, setPasscode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(passcode);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto flex flex-col items-center gap-4 px-4"
    >
      <h1 className=" w-full text-center text-lg md:text-xl font-medium">
        Enter the passcode to watch
        <br />
        “2025_1 Online Facilitation Briefing for Students”
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
