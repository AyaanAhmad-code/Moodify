import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import { useAuth } from "../../auth/hooks/useAuth";
import "./Home.scss";

const Home = () => {
  // 1. Pull the pure, simplified data from your hook
  const { song, songsList, handleSong, playSpecificSong, isPlaying } =
    useSong();

  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const [historyTab, setHistoryTab] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [detectedMood, setDetectedMood] = useState(null);

  const activeMood = detectedMood || song?.mood || "neutral";
  const moodColor = "#ff6b00";

  // Search Debouncer
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filter the list based on search
  const filteredSongs =
    songsList?.filter((track) => {
      const lowerCaseQuery = debouncedQuery.toLowerCase();
      return (
        track.title?.toLowerCase().includes(lowerCaseQuery) ||
        track.artist?.toLowerCase().includes(lowerCaseQuery)
      );
    }) || [];

  const onLogoutClick = async () => {
    await handleLogout();
    navigate("/");
  };

  const getVibeData = (mood) => {
    const vibes = {
      happy: {
        text: "High energy, major scales, and driving rhythms to boost your serotonin.",
        color: "#ff6b00",
        glow: "rgba(255, 107, 0, 0.4)",
      },
      sad: {
        text: "Slower tempos and minor keys to provide comfort and emotional reflection.",
        color: "#00e5ff",
        glow: "rgba(0, 229, 255, 0.4)",
      }, // Blue for sad
      neutral: {
        text: "Balanced frequencies and steady beats to maintain your focus and clarity.",
        color: "#4ADE80",
        glow: "rgba(74, 222, 128, 0.4)",
      }, // Green for neutral
      surprised: {
        text: "Dynamic shifts and energetic drops to match your elevated state.",
        color: "#ff00ff",
        glow: "rgba(255, 0, 255, 0.4)",
      }, // Pink for surprised
    };
    return vibes[mood?.toLowerCase()] || vibes.neutral;
  };

  const currentVibe = getVibeData(activeMood);

  const getDynamicMetrics = (currentSong, baseVibe, currentMood) => {
    let resNum = parseInt(baseVibe?.resonance) || 85; 
    let intNum = parseInt(baseVibe?.intensityWidth) || 50;

    if (currentSong && typeof currentSong.title === 'string' && currentSong.title.length > 0) {
      const songHash = currentSong.title
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      resNum = 75 + (songHash % 24);

      intNum = 60 + ((songHash * 2) % 36);

      // Bonus feature: If the song's mood perfectly matches the user's face, give a 5% "Synergy Boost"
      if (currentSong.mood === currentMood) {
        resNum = Math.min(99, resNum + 5);
        intNum = Math.min(99, intNum + 5);
      }
    }

    resNum = isNaN(resNum) ? 85 : resNum;
    intNum = isNaN(intNum) ? 50 : intNum;

    // Convert the raw numbers back into the UI formats
    return {
      resonanceText: `${resNum}%`,
      resonanceWidth: `${resNum}%`,
      intensityText:
        intNum >= 85
          ? "Peak"
          : intNum >= 75
            ? "High"
            : intNum >= 65
              ? "Steady"
              : "Low",
      intensityWidth: `${intNum}%`,
    };
  };

  // Calculate the live metrics right before rendering!
  const liveMetrics = getDynamicMetrics(song, currentVibe, activeMood);

  return (
    <div className="dashboard-wrapper">
      <nav className="dashboard-nav">
    <Link to="/" className="dashboard-nav__logo">
        Moodify<span className="dot">•</span>
    </Link>
    
    <div className="dashboard-nav__user">
        <div className="user-profile">
            {/* Dynamically displays the first letter of the username */}
            <div className="avatar">{user?.username?.charAt(0).toUpperCase() || 'U'}</div>
            <span className="username">{user?.username || 'User'}</span>
        </div>
        
        <button onClick={onLogoutClick} className="logout-btn">
            <span>Logout</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
        </button>
    </div>
</nav>

      <div className="dashboard-grid">
        {/* LEFT: Camera */}
        <aside className="col-left">
          <div className="glass-card capture-card">
            <div className="card-header text-center">
              <span className="brand-subtitle">MOODIFY</span>
              <h2>Expression Capture</h2>
            </div>
            <div className="capture-window">
              <FaceExpression
                onClick={(expression) => {
                  setDetectedMood(expression);
                  handleSong({ mood: expression });
                }}
              />
            </div>
          </div>
        </aside>

        {/* CENTER: Analysis & Player */}
        <main className="col-center">
          {/* CENTER: Aura & Energy Profile (Replaces Clinical Mood Analysis) */}
          <div className="glass-card aura-analysis-card">
            <div className="aura-header">
              <span className="label">YOUR CURRENT AURA</span>
              <div className="aura-status">
                <span
                  className="pulse-dot"
                  style={{
                    backgroundColor: currentVibe.color,
                    boxShadow: `0 0 10px ${currentVibe.color}`,
                  }}
                ></span>
                <span
                  style={{
                    color: currentVibe.color,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {activeMood} State
                </span>
              </div>
            </div>

            <div className="aura-visual-container">
              <div
                className="aura-orb"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${currentVibe.color}, transparent 70%)`,
                  boxShadow: `0 0 50px ${currentVibe.glow}, inset 0 0 20px ${currentVibe.glow}`,
                }}
              >
                <span className="aura-icon">
                  {activeMood.toLowerCase() === "happy"
                    ? "✨"
                    : activeMood.toLowerCase() === "sad"
                      ? "🌧️"
                      : activeMood.toLowerCase() === "surprised"
                        ? "⚡"
                        : "〰️"}
                </span>
              </div>
            </div>

            <div className="energy-metrics">
              <div className="metric">
                <div className="metric-labels">
                  <span>Resonance</span>
                  {/* Now using the live, song-based metrics! */}
                  <span style={{ color: currentVibe.color }}>
                    {liveMetrics.resonanceText}
                  </span>
                </div>
                <div className="mini-bar">
                  <div
                    style={{
                      width: liveMetrics.resonanceWidth,
                      background: currentVibe.color,
                      boxShadow: `0 0 8px ${currentVibe.color}`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="metric">
                <div className="metric-labels">
                  <span>Intensity</span>
                  <span style={{ color: currentVibe.color }}>
                    {liveMetrics.intensityText}
                  </span>
                </div>
                <div className="mini-bar">
                  <div
                    style={{
                      width: liveMetrics.intensityWidth,
                      background: currentVibe.color,
                      boxShadow: `0 0 8px ${currentVibe.color}`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Vibe Sync Visualizer (Replaced Mood History) */}
          <div className="glass-card vibe-sync-card">
            <div className="vibe-header">
              <div>
                <span className="label">AI ACOUSTIC INSIGHT</span>
                <h3>Vibe Synchronization</h3>
              </div>
              {/* 🔥 DEBUGGER UI: This proves if React state is working */}
              <div className="live-indicator">
                <span
                  className="dot"
                  style={{
                    backgroundColor: currentVibe.color,
                    boxShadow: `0 0 10px ${currentVibe.color}`,
                  }}
                ></span>
                {isPlaying ? "SYNCED" : "STANDBY"}
              </div>
            </div>

            <div className="vibe-content">
              <div className="vibe-visualizer">
                {/* 🔥 Forced strictly evaluated class names */}
                <div
                  className={isPlaying ? "pulsing-orb active" : "pulsing-orb"}
                  style={{
                    background: `radial-gradient(circle, ${currentVibe.color} 0%, transparent 70%)`,
                    boxShadow: `0 0 40px ${currentVibe.glow}`,
                  }}
                ></div>
                <div className="wave-bars">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={isPlaying ? "bar playing" : "bar"}
                      style={{ backgroundColor: currentVibe.color }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="vibe-text">
                <h3 style={{ color: currentVibe.color }}>
                  {activeMood} Energy
                </h3>
                <p>{currentVibe.text}</p>
              </div>
            </div>
          </div>

          <div className="glass-card player-wrapper-card">
            {song ? (
              <Player />
            ) : (
              <div className="empty-player">
                Detect a mood to start playing music
              </div>
            )}
          </div>
        </main>

        {/* RIGHT: List of Songs */}
        <aside className="col-right">
          <div className="glass-card playlist-card">
            <div className="card-header">
              <h3>AI Recommended for you</h3>
            </div>

            <div className="search-box">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="18"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search songs or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="playlist-tracks">
              {/* MAP OVER THE SONGS LIST */}
              {filteredSongs.length > 0 ? (
                filteredSongs.map((track, index) => (
                  <div
                    key={track._id || track.id || index}
                    className={`track-item ${song?._id === track._id || song?.url === track.url ? "active" : ""}`}
                    onClick={() => playSpecificSong(track)}
                  >
                    <span className="track-number">{index + 1}</span>
                    <img
                      src={track.posterUrl}
                      alt={track.title}
                      className="track-item__poster"
                    />
                    <div className="track-item__info">
                      <h4>{track.title}</h4>
                    </div>
                    {(song?._id === track._id || song?.url === track.url) && (
                      <div className="playing-bars">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="empty-playlist">
                  {songsList.length > 0
                    ? "No songs match your search."
                    : "Waiting for mood detection..."}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
