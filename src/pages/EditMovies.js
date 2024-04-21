import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { Link } from "react-router-dom"
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { MyContext } from "../context/Context"
import ClipLoader from "react-spinners/ClipLoader";
import ModalComponent from "../components/ModalComponent"



const EditMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

// UseState pro upozornění při mazání filmu, který není přidán aktuálním uživatelem
  const [deleteNotif, setDeleteNotif] = useState(false)

// UseState pro filtr filmů
  const [search, setSearch] = useState("")


// Destructuring context
const { user, Modal, showModal } = MyContext()
  
// Funkce pro smazání filmu 
  const handleDelete = async (id) => {
        if(window.confirm("Opravdu si přejete smazat tento film ??")){
            try {
                await deleteDoc((doc(db, "movies", id)))
                setMovies(movies.filter( (movie) => movie.id !== id ))
            } catch (err)  {
                console.log(err)
                setDeleteNotif(true)
                }
            }
        }


  // Funkce pro načtení dat z databáze
  useEffect( () => {
    setLoading(true)
    const unsub = onSnapshot(
      collection(db, "movies"),
      (snapshot) => {
        let list = []
        snapshot.docs.forEach( (doc) => {
          list.push({id: doc.id, ...doc.data()})

        })
        setMovies(list)
        setLoading(false)
      },
      (error) => {
        console.log(error)
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
      { showModal && <ModalComponent text="Úspěšně přihlášeno" />}
      <form className="w-full text-center">
        <input 
          className="text-black w-[300px] p-1 my-2 rounded" 
          type="text" 
          placeholder="Vyhledat film" 
          onChange={ (e) => setSearch(e.target.value)} 
        />
      </form>
      
      { deleteNotif && <div className="w-[500px] h-[200px] flex flex-col justify-center items-center text-center absolute m-auto top-0 bottom-0 right-0 left-0 bg-red-500 "><h2 className="text-2xl">Nemáte oprávnění mazat filmy, které jste nepřidali Vy!</h2>
      <button onClick={ () => setDeleteNotif(false)}  className="bg-black p-2 mt-4 rounded">Ok</button></div>}
      
      <div className="flex flex-col flex-nowrap sm:flex sm:flex-row m-4 sm:flex-wrap">
        { movies && movies.filter((movie) => {
          return search.toLowerCase() === "" ? movie : movie.title.toLowerCase().includes(search)
        }).map( (oneMovie) => {
          const {title,  id,  img} = oneMovie 
            return <div className="flex flex-col justify-center items-center border-2 border-red-600 w-[290px] mx-auto my-2 sm:m-2 shadow-md shadow-red-600" key={id}>
                      <h2 className="text-xl text-white ">{title}</h2>
                      <img className="w-[180px] h-[180px]  " src={img} alt="" />
                      <div className="flex flex-row space-x-2">
                        <Link to={`/movielist/${oneMovie.id}`} className="bg-red-700 p-1 rounded-xl hover:bg-red-600 my-1">Více informací</Link>
                        <button onClick={ () => {handleDelete(id)}} className="bg-red-700 p-1 rounded-xl hover:bg-red-600 my-1">Smazat</button>
                      </div>
                    </div>
        })}
      </div>
    </div>
  )
}

export default EditMovies
