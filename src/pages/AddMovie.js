import { useState, useEffect } from "react"
import { storage, db, auth } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage"
import { serverTimestamp, addDoc, collection } from "firebase/firestore"
import { MyContext } from "../context/Context"




const initialState = {
    title: "",
    year: "",
    genre: "",
    actors: "",
    time: ""
    
    

}



const AddMovie = () => {
  // useState pro přidání dat
    const [data, setData] = useState(initialState)
    const {title, year, genre, actors, time} = data
    
  // useState pro přidání obrázku
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(null)
  
  // Použití useNavigate
    const navigate = useNavigate()
    
  // Destructuring context
    const { user } = MyContext()

  // Data z formuláře
    const handleChange = (e) => {
      const name = e.target.name
      const value = e.target.value
      setData({...data, [name]: value})
    }

  // Přidání filmu
    const handleSubmit = async (e) => {
      e.preventDefault()
        await addDoc(collection(db, "movies"), {
            ...data,
            addedBy: user?.email,
            userid: auth?.currentUser?.uid,
            timestamp: serverTimestamp(),
        })

            navigate("/movielist")
    }

// Funkce pro přidání obrázku

  useEffect( () => {
    const uploadFile = () => {
        const name = new Date().getTime() + file.name
        const storageRef = ref(storage, file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {
            const progress = 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progress)
            switch (snapshot.state) {
                case "paused":
                    console.log("Upload is Pause")
                    break
                case "running":
                    console.log("Upload is Running")
                    break
                default:
                    break
                }
            }, (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then( (downloadURL) => {
                    setData( (prev) => ({...prev, img: downloadURL}))
                })
            }
        )
    }


file && uploadFile()
  }, [file])
  
    
  
  return (
    
    <div>
          <h2 className=" text-center text-2xl pt-8">Přidání filmu</h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center pt-40">
          <label htmlFor="photo">Obrázek filmu</label>
          <input 
            id="photo"
            type="file"
            onChange={ (e) => setFile(e.target.files[0])} 
            className="bg-white text-black w-[300px] sm:w-[500px] mb-4 p-2"
            required
        />
        <input 
            type="text" 
            placeholder="Název filmu"
            className="bg-white text-black w-[300px] sm:w-[500px] mb-4 p-2"
            onChange={handleChange}
            value={title}
            required
            name="title"
            autoFocus
            autoComplete="off"
            
        />
        <input 
            type="number" 
            placeholder="Rok natočení"
            className="bg-white text-black w-[300px] sm:w-[500px] mb-4 p-2"
            onChange={handleChange}
            value={year}
            required
            name="year"
            autoComplete="off"
            
            
        />
        <input 
            type="number" 
            placeholder="Délka filmu v minutách"
            className="bg-white text-black w-[300px] sm:w-[500px] mb-4 p-2"
            onChange={handleChange}
            value={time}
            required
            name="time"
            autoComplete="off"
            
            
        />
        <input 
            type="text" 
            placeholder="Žánr"
            className="bg-white text-black w-[300px] sm:w-[500px] mb-4 p-2"
            onChange={handleChange}
            value={genre}
            required
            name="genre"
            autoComplete="off"
            
        />
        
        <input 
            type="text" 
            placeholder="Hlavní herci"
            className="bg-white text-black w-[300px] sm:w-[500px] mb-4 p-2"
            onChange={handleChange}
            value={actors}
            required
            name="actors"
            autoComplete="off"
            
            
        />
        <input 
            type="submit"
            value="Přidat film"
            disabled={progress !== null && progress < 100}
            className={progress? "bg-red-700 p-2 hover:bg-red-600 cursor-pointer rounded-xl" : "bg-gray-700 p-2 hover:bg-red-600 cursor-pointer rounded-xl"} 
        />
      </form> 
        
    </div>
  )
}

export default AddMovie
