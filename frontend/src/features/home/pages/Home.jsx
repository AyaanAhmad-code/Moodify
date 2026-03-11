import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router'; 
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from '../components/Player';
import { useSong } from '../hooks/useSong';
import { useAuth } from '../../auth/hooks/useAuth'; 
import './Home.scss';

const Home = () => {
    // 1. Pull the pure, simplified data from your hook
    const { song, songsList, handleSong, playSpecificSong, isPlaying } = useSong();
    
    const { user, handleLogout } = useAuth(); 
    const navigate = useNavigate();
    
    const [historyTab, setHistoryTab] = useState('today');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const activeMood = song?.mood || 'neutral';
    const moodColor = '#ff6b00'; 

    // Search Debouncer
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Filter the list based on search
    const filteredSongs = songsList?.filter((track) => {
        const lowerCaseQuery = debouncedQuery.toLowerCase();
        return track.title?.toLowerCase().includes(lowerCaseQuery) || track.artist?.toLowerCase().includes(lowerCaseQuery);
    }) || [];

    const onLogoutClick = async () => {
        await handleLogout();
        navigate('/'); 
    };

    const getVibeData = (mood) => {
        const vibes = {
            happy: { text: "High energy, major scales, and driving rhythms to boost your serotonin.", color: "#ff6b00", glow: "rgba(255, 107, 0, 0.4)" },
            sad: { text: "Slower tempos and minor keys to provide comfort and emotional reflection.", color: "#00e5ff", glow: "rgba(0, 229, 255, 0.4)" }, // Blue for sad
            neutral: { text: "Balanced frequencies and steady beats to maintain your focus and clarity.", color: "#4ADE80", glow: "rgba(74, 222, 128, 0.4)" }, // Green for neutral
            surprised: { text: "Dynamic shifts and energetic drops to match your elevated state.", color: "#ff00ff", glow: "rgba(255, 0, 255, 0.4)" } // Pink for surprised
        };
        return vibes[mood?.toLowerCase()] || vibes.neutral;
    };

    const currentVibe = getVibeData(activeMood);

    return (
        <div className="dashboard-wrapper">
            <nav className="dashboard-nav">
                <Link to="/" className="dashboard-nav__logo">
                    Moodify<span className="dot">•</span>
                </Link>
                <div className="dashboard-nav__user">
                    <span className="username">{user?.username || 'User'}</span>
                    <button onClick={onLogoutClick} className="logout-btn">Logout</button>
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
                            <FaceExpression onClick={(expression) => { handleSong({ mood: expression }) }} />
                        </div>
                    </div>
                </aside>

                {/* CENTER: Analysis & Player */}
                <main className="col-center">
                    <div className="glass-card mood-analysis-card">
                        <div className="analysis-info">
                            <span className="label">CURRENT MOOD ANALYSIS</span>
                            <h1 className="mood-text" style={{ color: moodColor }}>{activeMood}</h1>
                            <div className="match-bar-container">
                                <div className="match-bar-fill" style={{ width: '98%', backgroundColor: moodColor, boxShadow: `0 0 10px ${moodColor}` }}></div>
                            </div>
                            <span className="match-percentage" style={{ color: moodColor }}>98% match</span>
                        </div>
                        <div className="analysis-emoji">
                            {activeMood.toLowerCase() === 'happy' ? '😄' : activeMood.toLowerCase() === 'sad' ? '😢' : '😐'}
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
                                    style={{ backgroundColor: currentVibe.color, boxShadow: `0 0 10px ${currentVibe.color}` }}
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
                                        boxShadow: `0 0 40px ${currentVibe.glow}`
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
                                <h3 style={{ color: currentVibe.color }}>{activeMood} Energy</h3>
                                <p>{currentVibe.text}</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card player-wrapper-card">
                        {song ? <Player /> : <div className="empty-player">Detect a mood to start playing music</div>}
                    </div>
                </main>

                {/* RIGHT: List of Songs */}
                <aside className="col-right">
                    <div className="glass-card playlist-card">
                        <div className="card-header">
                            <h3>AI Recommended for you</h3>
                        </div>
                        
                        <div className="search-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18">
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
                                        className={`track-item ${song?._id === track._id || song?.url === track.url ? 'active' : ''}`}
                                        onClick={() => playSpecificSong(track)}
                                    >
                                        <span className="track-number">{index + 1}</span>
                                        <img src={track.posterUrl} alt={track.title} className="track-item__poster" />
                                        <div className="track-item__info">
                                            <h4>{track.title}</h4>
                                            <p>{track.artist || 'Unknown Artist'}</p>
                                        </div>
                                        {(song?._id === track._id || song?.url === track.url) && (
                                            <div className="playing-bars">
                                                <span></span><span></span><span></span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="empty-playlist">
                                    {songsList.length > 0 ? "No songs match your search." : "Waiting for mood detection..."}
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
}

export default Home;