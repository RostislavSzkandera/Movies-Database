import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { MyContext } from "../context/Context"
import ResetPasswordForm from "../components/ResetPasswordForm"
import ModalComponent from "../components/ModalComponent"




const Login = () => {
  
  
  const [email, setEmail ] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  // Destructuring context
  const  { logIn , user, SignWithGoogle, Modal, showModal }  = MyContext()
  
  // Použití useNavigate
  const navigate = useNavigate()

  // Otevření okna pro zapomenuté heslo
  const [open, setOpen ] = useState(false)




// console.log(user?.email)

// Odesláni přihlašovacího formuláře

const handleSubmit = async (e) => {
      e.preventDefault()

      setError("")


      try {
        await logIn(email, password)
        navigate("/movielist")
      } catch(error) {
        setError("Nesprávné jméno nebo heslo!")
      }
    }


    

  
  return  (
    <div className="w-full min-h-[700px] flex flex-col justify-center items-center">
      <div className="w-[500px] min-h-[600px] flex flex-col justify-center items-center bg-gray-800 ">
        <h2 className="text-2xl mb-4">Přihlášení</h2>
        <form className="flex flex-col justify-center items-center w-[300px]" onSubmit={handleSubmit}>
            {error && <p className="p-1 text-red-500 text-xl">{error}</p>}
            <label htmlFor="name">Jméno</label>
            <input 
              autoComplete="off" 
              id="name" 
              className="m-2 text-black p-2" 
              type="email" 
              placeholder="Email"   
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
              className="bg-red-600 p-2 rounded cursor-pointer w-[200px] mt-4 hover:bg-red-500" 
              type="submit" 
              onClick={Modal}
              value="Přihlásit se" 
            />
            
        </form>
        
        <p onClick={ () => setOpen(!open)} className="mt-4 cursor-pointer hover:underline">Zapomněli jste heslo?</p>
        { open && <ResetPasswordForm open={open} setOpen={setOpen} />}

        <button onClick={ () => {
          SignWithGoogle()
          Modal()
        }} className="bg-red-600 p-2 rounded cursor-pointer w-[200px] mt-12 hover:bg-red-500">Přihlásit přes Google</button>
          <p className="mt-4">Ještě nejsi registrovaný?</p>
          <Link to="/signup"> <span className="font-bold hover:underline">Registruj se zde</span></Link>
      </div>
    </div>
  )
}

export default Login
