import { getSong } from "../services/service.api"
import { useContext } from "react"
import { songContext } from "../song.context"

export const useSong = ()=>{
    const context = useContext(songContext)

    const {loading,setLoading,song,setSong, songsList, setSongsList, 
            isPlaying, setIsPlaying} = context

    async function handleSong({ mood }) {
        setLoading(true);
        try {
            const data = await getSong({ mood });
            
            let fetchedSongs = [];
            
            // Extract the songs array
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

    return { loading, song, songsList, handleSong, playSpecificSong, isPlaying, setIsPlaying };
}