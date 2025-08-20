import { useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaComments,
  FaClosedCaptioning,
  FaExpand,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import backward from "../src/assets/icons/undo-02.png";
import forward from "../src/assets/icons/redo-02.png";
import play from "../src/assets/icons/Vector1.png";
import pause from "../src/assets/icons/pause.png";
import setting from "../src/assets/icons/settings-01.png";
import volumeIcon from "../src/assets/icons/volume-high.png";
import expand from "../src/assets/icons/maximize-screen.png";
import caption from "../src/assets/icons/closed-caption.png";
import chat from "../src/assets/icons/bubble-chat.png";
import mute from "../src/assets/icons/silent.png";
import download from "../src/assets/icons/download.png";
import ChatPanel from "../components/ChatPanel";

export default function VideoPage({ recordId }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

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
    const url = `https://meet.konn3ct.ng/presentation/${recordId}/video/webcams.mp4`;
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
          src={`https://meet.konn3ct.ng/presentation/${recordId}/video/webcams.mp4`}
          className="w-full h-full object-cover"
          onTimeUpdate={updateProgress}
          onEnded={() => setIsPlaying(false)}
        ></video>

        {/* Custom Controls Overlay */}
        <div className="absolute bottom-2 rounded-3xl m-2 left-0 right-0 bg-black/80 p-4 text-white">
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
            {/* LEFT CONTROLS */}
            <div className="flex items-center gap-4">
              {/* Volume (desktop only) */}
              <div className="hidden md:flex items-center gap-2 relative">
                <button onClick={() => setShowVolumeSlider(!showVolumeSlider)}>
                  {volume > 0 ? (
                    <img src={volumeIcon} alt="Volume" className="h-6" />
                  ) : (
                    <img src={mute} alt="Mute" className="h-6" />
                  )}
                </button>
                {showVolumeSlider && (
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 accent-blue-500"
                  />
                )}
              </div>

              {/* Backward */}
              <button onClick={() => skip(-10)}>
                <img src={backward} alt="Backward" className="h-6 sm:h-6" />
              </button>

              {/* Play / Pause */}
              <button onClick={togglePlayPause}>
                {isPlaying ? (
                  <img src={pause} alt="Pause" className="h-6 sm:h-6" />
                ) : (
                  <img src={play} alt="Play" className="h-6 sm:h-6" />
                )}
              </button>

              {/* Forward */}
              <button onClick={() => skip(10)}>
                <img src={forward} alt="Forward" className="h-6 sm:h-6" />
              </button>
            </div>

            {/* RIGHT CONTROLS */}
            <div className="flex items-center gap-4">
              {/* Settings */}
              <div className="relative">
                {showSettings && (
                  <div className="absolute bottom-8 right-0 bg-gray-800 p-3 rounded shadow-lg flex flex-col gap-3 text-sm min-w-[160px]">
                    {/* Mobile-only menu */}
                    <button
                      className="md:hidden flex items-center gap-2"
                      onClick={() => setChatOpen(true)}
                    >
                      <img src={chat} alt="Chat" className="h-5" /> Chat
                    </button>
                    <button
                      className="md:hidden flex items-center gap-2"
                      onClick={toggleCaptions}
                    >
                      <img src={caption} alt="Captions" className="h-5" /> Captions
                    </button>
                    <div className="md:hidden flex items-center gap-2 relative">
                      <button onClick={() => setShowVolumeSlider(!showVolumeSlider)}>
                        {volume > 0 ? (
                          <img src={volumeIcon} alt="Volume" className="h-5" />
                        ) : (
                          <img src={mute} alt="Mute" className="h-5" />
                        )}
                      </button>
                      {showVolumeSlider && (
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-full accent-blue-500"
                        />
                      )}
                    </div>
                    <button
                      onClick={handleDownload}
                      className="md:hidden flex items-center gap-2"
                    >
                      <img src={download} alt="Download" className="h-6" />
                    </button>

                    {/* Desktop-only speed control */}
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
              <button onClick={() => setShowSettings(!showSettings)}>
                <img src={setting} alt="Settings" className="h-6 sm:h-6" />
              </button>

              {/* Expand (always visible) */}
              <button
                onClick={() => {
                  if (videoRef.current.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                  }
                }}
              >
                <img src={expand} alt="Expand" className="h-6 sm:h-6" />
              </button>

              {/* Captions (desktop only) */}
              <button className="hidden md:block" onClick={toggleCaptions}>
                <img src={caption} alt="Captions" className="h-6 sm:h-6" />
              </button>

              {/* Chat (desktop only) */}
              <button className="hidden md:block" onClick={() => setChatOpen(true)}>
                <img src={chat} alt="Chat" className="h-6 sm:h-6" />
              </button>

              {/* Download (desktop only) */}
              <button className="hidden md:block" onClick={handleDownload}>
                <img src={download} alt="Download" className="h-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </div>
  );
}
