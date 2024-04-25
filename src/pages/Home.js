import {  useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { db } from "../firebase/config"
import { collection, onSnapshot } from "firebase/firestore"
import ClipLoader from "react-spinners/ClipLoader";
import { MyContext } from "../context/Context";
import ModalComponent from "../components/ModalComponent"
import {FaArrowCircleUp} from "react-icons/fa"

const Home = () => {
  
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
// Destructuring context
  const { Modal, showModal, visible, scrollToTop } = MyContext()

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
  return    <div className="w-full h-screen flex flex-row justify-center items-center">
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
       {visible && <button className="fixed right-[20px] bottom-[60px] z-40" onClick={scrollToTop}><FaArrowCircleUp className="text-[40px] text-gray-700" /></button> }
      
      
      {showModal && <ModalComponent text="Úspěšně odhlášeno" />}
      { error &&  <div className="text-xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <p className="mb-2" >V databázi nejsou žádné filmy, musíš nějaký přidat.</p>
                      <Link className="text-red-500 hover:underline" to="/login">Přihlásit se</Link>
                  </div>
      }
      
     <div className=" flex flex-col flex-nowrap sm:flex sm:flex-row m-4 sm:flex-wrap ">
        { movies && movies.map( (oneMovie) => {
          const { title,  id, img } = oneMovie 
          
          return <div className="mx-auto my-2  flex flex-col justify-center items-center border-2 border-red-600 w-[290px] sm:m-2 shadow-md shadow-red-600" key={id}>
            <h2 className="flex flex-row justify-center items-center h-12 text-xl text-center m-1 text-white ">{title}</h2>
            <img className="w-[180px] h-[180px] my-1" src={img} alt="" />
          </div>
        })}
      </div>
    </div>
  )
}

export default Home
