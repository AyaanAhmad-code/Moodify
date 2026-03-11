import { router } from "./app.routes"
import { RouterProvider } from "react-router";
import "./features/style/global.scss"
import { AuthProvider } from "./features/auth/auth.context";
import { SongContextProvider } from "./features/home/song.context"

function App() {

  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router}/>
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App
