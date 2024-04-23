import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import {  onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { useParams, Link } from "react-router-dom"
import { MyContext } from "../context/Context"
import ClipLoader from "react-spinners/ClipLoader";



const OneMovie = () => {
// Použití useParams pro id konkrétního filmu
  const { id } = useParams()
    
    const [ movies, setMovies ] = useState([])
    const [loading, setLoading] = useState(false)
// UseState pro zjištění zda aktuálně přihlášený užival přidal film 
    const [isAddedByMe, setIsAddedByMe] = useState(false)
// UseState pro upozornění při mazání filmu, který není přidán aktuálním uživatelem
    const [deleteNotif, setDeleteNotif] = useState(false)
    
// Použití useNavigate
    const navigate = useNavigate()

// Destructuring context 
    
    const { user } = MyContext()
     
    
// Funkce pro smazání filmu 
    const handleDelete = async (id) => {
      if(window.confirm("Opravdu si přejete smazat tento film ??")){
        try {
            await deleteDoc((doc(db, "movies", id)))
            navigate("/movielist")
        } catch (err)  {
            console.log(err)
            setDeleteNotif(true)
            }
        }
      }

      
  // Funkce pro zjištění, jestli aktuálně přihlášený uživatel přidal film

        
  const checkAuthor =  () => {
    if(!movies) {
      return () => checkAuthor()
    }
    
      if(movies.addedBy === user?.email) {
        setIsAddedByMe(true)}
        // console.log(movies.addedBy)
      }
  
     useEffect( () => {
      
      checkAuthor()
          
      
      }, [movies])

  //Funkce pro načtení dat o jednom filmu 
  useEffect( () => {
    const coinRef = doc(db, "movies", id)
    setLoading(true)
    const unsubscribe = onSnapshot(coinRef, (document) => {
        if(document.exists) {   
            // console.log(document.data())
            setMovies(document.data())

        }
        setLoading(false)
        setIsAddedByMe(false)
    })
    return () => unsubscribe()
  }, [id])
  


    
if(loading) {
    return    <div className="flex flex-row justify-center items-center w-full h-screen">
                  <ClipLoader
                    color="blue"
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
              </div>
}



    return (
      
      <section className="bg-black flex flex-col justify-center items-center pt-4 sm:pt-40" >
        
          { deleteNotif && <div className="flex flex-col justify-center items-center text-center absolute m-auto top-0 bottom-0 right-0 left-0 bg-black w-[250px] sm:w-[450px] h-[200px] p-2"><h2 className="text-2xl">Nemáte oprávnění mazat filmy, které jste nepřidali Vy!</h2>
          <button onClick={ () => setDeleteNotif(false)}  className="bg-red-500 p-2 mt-4 rounded">Ok</button></div>}
          {
          movies && <div className={isAddedByMe ? "bg-yellow-500 flex flex-col justify-center items-center w-[350px] sm:w-[500px]" : "bg-red-500  flex flex-col justify-center items-center  w-[350px] sm:w-[500px]"}>
                      <h2 className="text-center text-2xl m-2">{movies.title}</h2>
                      <img className="w-[200px] mb-1" src={movies.img} alt="" />
                      <p className="mb-2">Hlavní herci: {movies.actors}</p>
                      <p className="mb-2">Rok natočení: {movies.year}</p>
                      <p className="mb-2">Žánr: {movies.genre}</p>
                      <p className="mb-2">Délka filmu: {movies.time} minut</p>
                      <p className="mb-2">Přidal: {movies.addedBy}</p>
                      <div className="flex flex-row space-x-2 my-2">
                        <Link className="bg-black p-2 rounded mb-2 sm:hover:bg-gray-600" to="/movielist">Zpět</Link>
                        <button className="bg-black p-2 rounded mb-2 sm:hover:bg-gray-600" onClick={ () => {handleDelete(id)}}>Smazat</button>
                      </div>
                    </div>
        }
      </section>
  )
}

export default OneMovie
