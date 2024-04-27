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
            }
        }
      }


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
      
      <section className="bg-black flex flex-col justify-center items-center pt-8 sm:pt-20 pb-20" >
          {
          movies && <div className={movies.addedBy === user?.email ? "bg-yellow-500 flex flex-col justify-center items-center min-h-[500px] w-[350px] sm:w-[500px]" : "bg-red-500  flex flex-col justify-center items-center  w-[350px] sm:w-[500px]"}>
                      <h2 className="text-center text-2xl m-2">{movies.title}</h2>
                      <img className="w-[200px] mb-1" src={movies.img} alt="" />
                      <p className="mx-2 mb-2 text-center">Hlavní herci: {movies.actors}</p>
                      <p className="mb-2">Rok natočení: {movies.year}</p>
                      <p className="mb-2">Žánr: {movies.genre}</p>
                      <p className="mb-2">Délka filmu: {movies.time} minut</p>
                      <p className="mx-2 mb-2 text-center">Přidal: {movies.addedBy}</p>
                      <div className="flex flex-row space-x-2 my-2">
                        <Link className="bg-black p-2 rounded mb-2 sm:hover:bg-gray-600" to="/movielist">Zpět</Link>
                        {movies.addedBy === user?.email ? <button className="bg-black p-2 rounded mb-2 sm:hover:bg-gray-600" onClick={ () => {handleDelete(id)}}>Smazat</button> : null}
                      </div>
                    </div>
        }
      </section>
  )
}

export default OneMovie
