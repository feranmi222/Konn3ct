import { useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaCog,
  FaComments,
  FaDownload,
  FaClosedCaptioning,
  FaExpand,
  FaFastForward,
  FaFastBackward,
} from "react-icons/fa";
import ChatPanel from "../components/ChatPanel";

export default function VideoPage() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1); // playback speed state

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    videoRef.current.volume = vol;
  };

  const handleProgressChange = (e) => {
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setProgress(time);
  };

  const updateProgress = () => {
    setProgress(videoRef.current.currentTime);
  };

  const skip = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  const toggleCaptions = () => {
    setCaptionsOn(!captionsOn);
    alert(`Captions ${!captionsOn ? "enabled" : "disabled"}`);
  };

  const handleDownload = () => {
    const url =
      "https://meet.konn3ct.ng/presentation/8f2b2142080438f766fd0f47c999e9158a9c2208-1739435254662/video/webcams.mp4";
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "video.mp4");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    videoRef.current.playbackRate = rate;
  };

  return (
  <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto h-[calc(100vh-120px)] relative px-4 md:px-6 lg:px-8 mt-6">
    {/* Video Section */}
    <div className="flex-1 relative w-full rounded-xl border-2 border-gray-300 shadow-xl overflow-hidden">
      <video
        ref={videoRef}
        src="https://meet.konn3ct.ng/presentation/8f2b2142080438f766fd0f47c999e9158a9c2208-1739435254662/video/webcams.mp4"
        className="w-full h-full object-contain"
        onTimeUpdate={updateProgress}
        onEnded={() => setIsPlaying(false)}
      ></video>

        {/* Custom Controls */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-3 text-white">
          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={videoRef.current?.duration || 0}
            value={progress}
            onChange={handleProgressChange}
            className="w-full accent-blue-500"
          />

          <div className="flex justify-between items-center mt-2">
            {/* Left Controls */}
            <div className="flex items-center gap-3">
              <button onClick={() => skip(-10)}>
                <FaFastBackward size={20} />
              </button>
              <button onClick={togglePlayPause}>
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>
              <button onClick={() => skip(10)}>
                <FaFastForward size={20} />
              </button>

              {/* Desktop Only */}
              <div className="hidden md:flex items-center gap-3">
                <button onClick={() => setChatOpen(true)}>
                  <FaComments size={20} />
                </button>
                <button onClick={toggleCaptions}>
                  <FaClosedCaptioning
                    size={20}
                    className={captionsOn ? "text-blue-400" : ""}
                  />
                </button>
                <div className="flex items-center gap-1">
                  {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 accent-blue-500"
                  />
                </div>
                <button onClick={handleDownload}>
                  <FaDownload size={20} />
                </button>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Expand */}
              <button
                onClick={() => {
                  if (videoRef.current.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                  }
                }}
              >
                <FaExpand size={20} />
              </button>

              {/* Settings */}
              <div className="relative">
                <button onClick={() => setShowSettings(!showSettings)}>
                  <FaCog size={20} />
                </button>
                {showSettings && (
                  <div className="absolute bottom-8 right-0 bg-gray-800 p-2 rounded shadow-lg flex flex-col gap-2 text-sm min-w-[150px]">
                    {/* 🔹 Mobile-only controls */}
                    <button
                      className="md:hidden flex items-center gap-2"
                      onClick={() => setChatOpen(true)}
                    >
                      <FaComments /> Chat
                    </button>
                    <button
                      className="md:hidden flex items-center gap-2"
                      onClick={toggleCaptions}
                    >
                      <FaClosedCaptioning /> Captions
                    </button>
                    <div className="md:hidden flex items-center gap-2">
                      {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full accent-blue-500"
                      />
                    </div>
                    <button
                      onClick={handleDownload}
                      className="md:hidden flex items-center gap-2"
                    >
                      <FaDownload /> Download
                    </button>

                    {/* 🔹 Desktop-only speed control */}
                    <div className="hidden md:flex flex-col gap-1">
                      <span className="text-gray-300">Playback Speed</span>
                      {[0.5, 1, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handleSpeedChange(rate)}
                          className={`px-2 py-1 rounded ${
                            playbackRate === rate
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-700"
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </div>
  );
}
