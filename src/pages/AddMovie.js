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

    const [errors, setErrors] = useState({})
    
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
      setErrors(validateValues(year, time));
      if(year.length === 4 && time.length < 4) {
        await addDoc(collection(db, "movies"), {
          ...data,
          addedBy: user?.email,
          userid: auth?.currentUser?.uid,
          timestamp: serverTimestamp(),
      }).catch (err => {
        console.log(err)
      })

          navigate("/movielist")
      }
       
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
  
   

  // Validační funkce formuláře
const validateValues = (inputValues) => {
  let errors = {};
  if (year.length !== 4 ) {
    errors.year = "Rok musí mít 4 čísla";
  }
  if (time.length > 3) {
    errors.time = "Čas musí mít maximálně 3 čísla (v minutách)";
  }
 
  return errors;
};

  
  return (
    
    <div>
          <h2 className="text-center text-2xl pt-8 sm:pt-28">Přidání filmu</h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center pt-8 ">
              
              {errors.year ? (
              <p className="text-red-500 text-center mb-2">
                  {errors.year}
              </p>
            ) : null}
            {errors.time ? (
              <p className="text-red-500 text-center mb-2">
                  {errors.time}
              </p>
            ) : null}
            
          
          <label htmlFor="photo">Vložte obrázek</label>
          <input 
            id="photo"
            type="file"
            onChange={ (e) => setFile(e.target.files[0])} 
            className="bg-white text-black w-[300px] sm:w-[500px] mb-4 p-2 placeholder:text-black mt-2"
            required
        />
        <input 
            type="text" 
            placeholder="Název filmu"
            className="bg-white text-black w-[300px] sm:w-[500px] mb-4 p-2 placeholder:text-black"
            onChange={handleChange}
            value={title}
            required
            name="title"
            autoFocus
            autoComplete="off"
            maxLength={40}
            
        />
        <input 
            type="number" 
            placeholder="Rok natočení"
            className="bg-white text-black w-[300px] sm:w-[500px] mb-4 p-2 placeholder:text-black"
            onChange={handleChange}
            value={year}
            required
            name="year"
            autoComplete="off"
            
            
        
            
        />
        <input 
            type="number" 
            placeholder="Délka filmu v minutách"
            className="bg-white text-black w-[300px] sm:w-[500px] mb-4 p-2 placeholder:text-black"
            onChange={handleChange}
            value={time}
            required
            name="time"
            autoComplete="off"
            
            
            
        />
        
        <select className="bg-white text-black w-[300px] sm:w-[500px] mb-4 p-2" required name="genre" value={genre} onChange={handleChange}>
                    <option disabled value="">--Vyberte žánr--</option>
                    <option value="Komedie">Komedie</option>
                    <option value="Akční">Akční</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horor">Horor</option>
                    <option value="Sci-fi">Sci-fi</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Animovaný">Animovaný</option>
                    <option value="Romantický">Romantický</option>
        </select>


        
        <input 
            type="text" 
            placeholder="Hlavní herci"
            className="bg-white text-black w-[300px] sm:w-[500px] mb-4 p-2 placeholder:text-black"
            onChange={handleChange}
            value={actors}
            required
            name="actors"
            autoComplete="off"
            maxLength={80}
            minLength={5}
            
        />
        <input 
            type="submit"
            value="Přidat film"
            disabled={progress !== null && progress < 100}
            className={progress? "bg-red-700 p-2 sm:hover:bg-red-600 cursor-pointer rounded-xl" : "bg-gray-700 p-2 sm:hover:bg-red-600 cursor-pointer rounded-xl"} 
        />
      </form> 
        
    </div>
  )
}

export default AddMovie
