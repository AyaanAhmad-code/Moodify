import { getSong } from "../services/service.api"
import { useContext } from "react"
import { songContext } from "../song.context"

export const useSong = () => {
    const context = useContext(songContext)

    const { 
        loading, setLoading, 
        song, setSong, 
        songsList, setSongsList, 
        isPlaying, setIsPlaying 
    } = context

    async function handleSong({ mood }) {
        setLoading(true);
        try {
            const data = await getSong({ mood });
            
            let fetchedSongs = [];
            
            // Extract the songs array safely
            if (Array.isArray(data)) {
                fetchedSongs = data;
            } else if (data?.songs && Array.isArray(data.songs)) {
                fetchedSongs = data.songs; 
            } else if (data?.song && Array.isArray(data.song)) {
                fetchedSongs = data.song; 
            } else if (data?.data && Array.isArray(data.data)) {
                fetchedSongs = data.data;
            } else if (data?.song) {
                fetchedSongs = [data.song]; 
            } else if (data && typeof data === 'object') {
                fetchedSongs = [data];
            }

            if (fetchedSongs.length > 0) {
                setSongsList(fetchedSongs); 
                
                // Play a random song from the list initially
                const randomIndex = Math.floor(Math.random() * fetchedSongs.length);
                setSong(fetchedSongs[randomIndex]); 
            } else {
                setSongsList([]);
                setSong(null);
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
            setSongsList([]);
            setSong(null);
        } finally {
            setLoading(false);
        }
    }

    const playSpecificSong = (clickedSong) => {
        setSong(clickedSong);
    };

    // ⚡ NEW: Go to the next track in the playlist
    const nextTrack = () => {
        if (!songsList || songsList.length === 0 || !song) return;

        // Find the index of the currently playing song
        const currentIndex = songsList.findIndex(s => s._id === song._id);
        
        // If we are at the very last song, loop back to the first song (index 0)
        if (currentIndex === songsList.length - 1) {
            setSong(songsList[0]);
        } else {
            // Otherwise, just play the next one
            setSong(songsList[currentIndex + 1]);
        }
    };

    // ⚡ NEW: Go to the previous track in the playlist
    const prevTrack = () => {
        if (!songsList || songsList.length === 0 || !song) return;

        const currentIndex = songsList.findIndex(s => s._id === song._id);

        // If we are at the first song, loop back to the very last song
        if (currentIndex === 0) {
            setSong(songsList[songsList.length - 1]);
        } else {
            // Otherwise, just play the previous one
            setSong(songsList[currentIndex - 1]);
        }
    };

    // ⚡ Make sure nextTrack and prevTrack are exported here!
    return { 
        loading, 
        song, 
        songsList, 
        handleSong, 
        playSpecificSong, 
        isPlaying, 
        setIsPlaying,
        nextTrack, 
        prevTrack  
    };
}