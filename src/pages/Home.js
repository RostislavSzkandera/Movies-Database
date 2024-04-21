import {  useEffect, useState } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot } from "firebase/firestore"
import ClipLoader from "react-spinners/ClipLoader";
import { MyContext } from "../context/Context";
import ModalComponent from "../components/ModalComponent"

const Home = () => {
  
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  
// Destructuring context
  const { Modal, showModal } = MyContext()

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
      {showModal && <ModalComponent text="Úspěšně odhlášeno" />}
     <div className=" flex flex-col flex-nowrap sm:flex sm:flex-row m-4 sm:flex-wrap ">
        { movies && movies.map( (oneMovie) => {
          const { title,  id, img } = oneMovie 
          
          return <div className="mx-auto my-2  flex flex-col justify-center items-center border-2 border-red-600 w-[290px] sm:m-2 shadow-md shadow-red-600" key={id}>
            <h2 className="text-xl text-white my-1 ">{title}</h2>
            <img className="w-[180px] h-[180px] my-1" src={img} alt="" />
          </div>
        })}
      </div>
    </div>
  )
}

export default Home
