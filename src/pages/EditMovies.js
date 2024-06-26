import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { Link } from "react-router-dom"
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { MyContext } from "../context/Context"
import ClipLoader from "react-spinners/ClipLoader";
import ModalComponent from "../components/ModalComponent"
import {FaArrowCircleUp} from "react-icons/fa"




const EditMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


// UseState pro filtr filmů
  const [genreFilter, setGenreFilter] = useState("")
  

// Destructuring context
const { user, Modal, showModal, visible, scrollToTop } = MyContext()
  
// Funkce pro smazání filmu 
  const handleDelete = async (id) => {
        if(window.confirm("Opravdu si přejete smazat tento film ??")){
            try {
                await deleteDoc((doc(db, "movies", id)))
                setMovies(movies.filter( (movie) => movie.id !== id ))
            } catch (err)  {
                console.log(err)
                }
            }
        }

  // Funkce pro načtení dat z databáze
  useEffect( () => {
    setLoading(true)
    const unsub = onSnapshot(
      collection(db, "movies"),
      (snapshot) => {
        if(snapshot.empty){  
          setError(true)
          setLoading(false)
        } else {
          let list = []  
          snapshot.docs.forEach( (doc) => {
            list.push({id: doc.id, ...doc.data()})
  
          })
          setMovies(list)
          setLoading(false)
        
      }
    },
      (err) => {
        console.log(err)
      }
    )
   
    return () => {
      unsub()
    }
    
  },[])

 

  if(loading) {
    return  <div className="flex flex-row justify-center items-center w-full h-screen">
                  <ClipLoader
                    color="blue"
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
            </div>
  }


  return (
    <div className="mb-20">
     
      {visible && <button className="fixed right-[10px] bottom-[40px]" onClick={scrollToTop}><FaArrowCircleUp className="text-[40px] text-gray-700" /></button> }

      { showModal && <ModalComponent text="Úspěšně přihlášeno" />}
      <div className="flex flex-row justify-center items-center m-2">
        <button className="border border-red-500 p-1 rounded" onClick={() => window.location.reload()}>Všechny filmy</button>
      </div>
      <div className="w-[90%] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mx-auto gap-1">
        <button className="border border-red-500 p-1 rounded" onClick={() => setGenreFilter("Komedie")} >Komedie</button>
        <button className="border border-red-500 p-1 rounded" onClick={() => setGenreFilter("Akční")} >Akční</button>
        <button className="border border-red-500 p-1 rounded" onClick={() => setGenreFilter("Romantický")} >Romantický</button>
        <button className="border border-red-500 p-1 rounded" onClick={() => setGenreFilter("Sci-fi")} >Sci-fi</button>
        <button className="border border-red-500 p-1 rounded" onClick={() => setGenreFilter("Horor")} >Horor</button>
        <button className="border border-red-500 p-1 rounded" onClick={() => setGenreFilter("Fantasy")} >Fantasy</button>
        <button className="border border-red-500 p-1 rounded" onClick={() => setGenreFilter("Thriller")} >Thriller</button>
        <button className="border border-red-500 p-1 rounded" onClick={() => setGenreFilter("Animovaný")} >Animovaný</button>
      </div>
     
      { error &&  <div className="text-xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <p className="mb-2" >V databázi nejsou žádné filmy, musíš nějaký přidat.</p>
                      <Link className="text-red-500 hover:underline" to="/addmovie">Přidat film</Link>
                  </div>
      }
 
      <div className="flex flex-col flex-nowrap sm:flex sm:flex-row mx-auto sm:flex-wrap sm:justify-center ">
        { movies && movies
          .filter((movie) => {
          return genreFilter.toLowerCase() === "" ? movie : movie.genre.toLowerCase().includes(genreFilter.toLowerCase()) 
          
        }).map( (oneMovie) => {
          const {title,  id,  img, addedBy} = oneMovie 
            return <div className="flex flex-col justify-center items-center border-2 my-2 mx-auto border-red-600 w-[290px] sm:m-2 shadow-md shadow-red-600" key={id}>
                      <h2 className="flex flex-row justify-center items-center h-12 text-xl text-center m-1 text-white ">{title}</h2>
                      <img className="w-[180px] h-[180px]  " src={img} alt="" />
                      <div className="flex flex-row space-x-2 ">
                        <Link to={`/movielist/${oneMovie.id}`} className="bg-red-700 p-1 rounded-xl sm:hover:bg-red-600  my-1">Více informací</Link>
                        {addedBy === user?.email ? <button onClick={ () => {handleDelete(id)}} className="bg-red-700 p-1 rounded-xl sm:hover:bg-red-600 my-1">Smazat</button> : null}
                      </div>
                    </div>
        })}
      </div>
    </div>
  )
}

export default EditMovies
