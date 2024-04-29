import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import {  onSnapshot, deleteDoc, doc, updateDoc} from "firebase/firestore"
import { useParams, Link } from "react-router-dom"
import { MyContext } from "../context/Context"
import ClipLoader from "react-spinners/ClipLoader";



const OneMovie = () => {
// Použití useParams pro id konkrétního filmu
  const { id } = useParams()
    
    const [ movies, setMovies ] = useState([])
    const [loading, setLoading] = useState(false)

// useState pro přidání komentáře
    const [newValue, setNewValue ] = useState("")
    
// useState pro zobrazení a skrytí komentáře
    const [showComments, setShowComments] = useState(false)

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
            console.log(document.data())
              setMovies(document.data())

        }
        
        setLoading(false)
    })
    return () => unsubscribe()
  }, [id])
  

// Funkce pro přidání komentáře
  const handleComment = async (e) => {
      e.preventDefault()
    const currentTime = new Date()
    const formattedDate = currentTime.toLocaleString();
    const newData = [...movies.comments, newValue]
    const newAuthor = [...movies.commentedBy, user?.email]
    const newDate = [...movies.commentedAt, formattedDate  ]
      
    try {
        const docRef = doc(db, "movies", id)
        await updateDoc(docRef, {
          comments: newData,
          commentedBy: newAuthor,
          commentedAt: newDate
        })
        setNewValue("")
          
      } catch (error) {
          console.log(error)
      }
     
  }


    
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
        <div><button onClick={() => setShowComments(!showComments)} className="bg-red-600 sm:hover:bg-red-500 p-2 mt-4 rounded cursor-pointer ">Zobrazit komentáře</button></div>
      {
        showComments && 
        <div className="w-[90%] sm:w-[50%] pb-20">
          <div className="flex flex-col items-center justify-center mt-8 mb-8">
            <h2>Okomentuj tento film</h2>
            <form className="flex flex-col" onSubmit={handleComment}>
              <textarea 
                placeholder="Přidejte komentář" 
                required 
                className="w-[300px] sm:w-[500px] h-[200px] sm:h-[150px] text-black p-1 my-2" 
                minLength="5"
                
                value={newValue} 
                onChange={(e) => setNewValue(e.target.value)}
              />
              <input 
                className="bg-red-600 my-1 cursor-pointer w-[100px] mx-auto rounded p-1 sm:hover:bg-red-500" 
                type="submit" 
                value="Přidat"  
              />
            </form>
          </div>
          <div>
          
            {
              movies &&  <div className="flex flex-col">
                {movies.comments.length === 0 ? <p className="text-center">Tento film ještě nikdo neokomentoval. Buď první!</p> : null }
              {
                movies.comments && movies.comments.map( (comment, index) => {
                  return <div className="border-2 border-red-600 rounded p-2 my-1" key={index}>
                    <p className="text-[15px] my-1">{movies.commentedBy[index]}</p>
                    <p className="text-[12px] my-1">{movies.commentedAt[index]}</p>
                    <p className="my-2">{comment}</p> 
                  </div>
                  
                })
              }
            
            </div>
            }
          </div>
        </div>
      }
      </section>
  )
}

export default OneMovie
