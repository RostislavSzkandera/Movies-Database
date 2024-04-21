import { MyContext } from "../context/Context"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"




const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword ] = useState("")
    
// Destructuring context
    const { signUp, Modal } = MyContext()

// Použití useNavigate
    const navigate = useNavigate()

// Odeslání registračního formuláře
    const handleSubmit = async (e) => {
        e.preventDefault()

          try {
              await signUp(email, password)
              navigate("/movielist")

          } catch (error) {
              console.log(error)
          }

    }


  return (
    
    <div className="w-full h-[700px] flex flex-col justify-center items-center">
      <div className="w-[500px] h-[500px] flex flex-col justify-center items-center bg-gray-800">
        <h2 className="text-2xl mb-4">Registrace</h2>
        <form  onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-[300px]">
          <label htmlFor="name">Jméno</label>
          <input 
            autoComplete="off" 
            id="name" 
            className="m-2 text-black p-2" 
            type="email" placeholder="Email"   
            onChange={ (e) => setEmail(e.target.value)} 
            required
          />
          
          <label htmlFor="password">Heslo</label>
          <input 
            autoComplete="off" 
            id="password" 
            className="m-2 text-black p-2" 
            type="password" 
            placeholder="Heslo"  
            onChange={ (e) => setPassword(e.target.value)} 
            required 
          />
          
          <input 
            className="bg-red-600 p-2 rounded cursor-pointer w-[200px] mt-8 hover:bg-red-500" 
            type="submit" 
            onClick={Modal}
            value="Registrovat" 
          />
          
        </form>
        
          <p className="mt-4">Už jsi registrovaný?</p>
          <Link to="/login"> <span className="font-bold hover:underline">Přihlaš se zde</span></Link>
      </div>
    </div>
  )
}

export default SignUp
