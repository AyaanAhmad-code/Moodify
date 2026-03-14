import { useContext } from "react";
import { authContext } from "../auth.context";
import { login,register,logout,getMe } from "../services/auth.api";
import { useEffect } from "react";

export const useAuth = () =>{
    const context = useContext(authContext);
    const {loading,user,setUser,setLoading,hasFetched} = context;

    async function handleRegister({username,email,password}){
        const data = await register({username,email,password})
        setUser(data.user)
    }

    async function handleLogin({email,username,password}){
        const data = await login({username,email,password})
        setUser(data.user)
    }

    async function handleGetMe(){
        setLoading(true)
        try {
            const data = await getMe()
            setUser(data.user)
        } catch (error) {
            // If backend says not logged in, just clear the user
            setUser(null)
        } finally {
            // Always turn off the loading screen, even if it fails!
            setLoading(false)
        }
    }

    async function handleLogout() {
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }

    useEffect(()=>{
        // NEW: Only run handleGetMe if it hasn't been run yet.
        // This completely stops the infinite flashing loop!
        if (!hasFetched.current) {
            hasFetched.current = true;
            handleGetMe();
        }
    },[])

    return ({handleLogin,handleRegister,handleGetMe,handleLogout,user,loading})
}