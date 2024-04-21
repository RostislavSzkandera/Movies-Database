import { Routes, Route } from "react-router-dom"
import { AllContextProvider } from "./context/Context"

import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import AddMovie from "./pages/AddMovie"
import EditMovies from "./pages/EditMovies"
import OneMovie from "./pages/OneMovie"
import Help from "./pages/Help"
import Footer from "./components/Footer"

const App = () => {
  return (
    <>
      <AllContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/help" element={ <Help />} />
          <Route path="/signup" element={ <SignUp />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/movielist" element={ <EditMovies />} />
          <Route path="/addmovie" element={ <AddMovie />} />
          <Route path="/movielist/:id" element={ <OneMovie />} />
        </Routes>
        <Footer />
      </AllContextProvider>
    </>
  )
}

export default App
