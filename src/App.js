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
import PageNotFound from "./pages/PageNotFound"
import PrivateLayouts from "./layouts/PrivateLayouts"


const App = () => {
  return (
    <>
      <AllContextProvider>
        <NavBar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/help" element={ <Help />} />
            <Route path="/signup" element={ <SignUp />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/movielist" element={
                            <PrivateLayouts>
                              <EditMovies />
                            </PrivateLayouts>} 
            />
              <Route path="/addmovie" element={
                                <PrivateLayouts>
                                  <AddMovie />
                                </PrivateLayouts>} 
            />
            <Route path="/movielist/:id" element={ <OneMovie />} />
            <Route path="*" element={ <PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </AllContextProvider>
    </>
  )
}

export default App
