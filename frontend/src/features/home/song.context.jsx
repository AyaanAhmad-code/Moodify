import { useState } from "react";
import { createContext } from "react";

export const songContext = createContext()

export const SongContextProvider = ({children}) =>{
    const [ song, setSong ] = useState(null)
    const [ songsList, setSongsList ] = useState([]);
    const [loading, setLoading] = useState(false)
    const [ isPlaying, setIsPlaying ] = useState(false);

    return (
        <songContext.Provider value={{loading,setLoading,song, setSong, songsList, setSongsList, 
            isPlaying, setIsPlaying}}>
            {children}
        </songContext.Provider>
    )
}