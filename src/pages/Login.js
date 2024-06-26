import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { MyContext } from "../context/Context"
import ResetPasswordForm from "../components/ResetPasswordForm"
import ClipLoader from "react-spinners/ClipLoader";





const Login = () => {
  
  
  const [email, setEmail ] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [errors, setErrors] = useState({});
  
  // Destructuring context
  const  { logIn , user, SignWithGoogle, Modal, googleError, setGoogleError, loading }  = MyContext()
  
  // Použití useNavigate
  const navigate = useNavigate()

  // Otevření okna pro zapomenuté heslo
  const [open, setOpen ] = useState(false)




// console.log(user?.email)

// Odesláni přihlašovacího formuláře

const handleSubmit = async (e) => {
      e.preventDefault()
      setError("")
      setGoogleError(false)
      try {
        setErrors(validateValues(email, password));
        await logIn(email, password)
        navigate("/movielist")
      } catch(error) {
        setError("Nesprávné jméno nebo heslo!")
      }
    }


// Validační funkce formuláře
    const validateValues = (inputValues) => {
      let errors = {};
      if (email.length < 12) {
        errors.email = "Email je příliš krátký";
      }
      if (password.length < 6) {
        errors.password = "Heslo je příliš krátké, musíte vyplnit alespoň 6 znaků";
      }
     
      return errors;
    };

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
    
      

  
  return  (
    <div className="w-full min-h-[700px] flex flex-col justify-center items-center pt-4 pb-20 mb-4 sm:pt-8">
      <div className="w-[300px] sm:w-[500px] min-h-[650px] flex flex-col justify-center items-center bg-gray-800 ">
        <h2 className="text-2xl mb-4">Přihlášení</h2>
        <form className="flex flex-col justify-center items-center w-[300px]" onSubmit={handleSubmit}>
             
              {/* Validace formuláře, vypisování chyb */}
              { googleError && <p className="text-red-500 text-center mb-2">Něco se nepovedlo. Zkuste to prosím znovu</p>}
              {error && <p className="text-red-500 text-center mb-2">{error}</p>}
              {errors.email ? (
              <p className="text-red-500 text-center mb-2">
                  {errors.email}
              </p>
            ) : null}
            {errors.password ? (
              <p className="text-red-500 text-center">
                  {errors.password}
              </p>
            ) : null}
            
            <label htmlFor="name">Email</label>
            <input 
              autoComplete="off" 
              id="name" 
              className="m-2 text-black p-2" 
              type="email" 
              placeholder="Email"   
              onChange={ (e) => setEmail(e.target.value)} 
              required
              value={email}
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
              value={password}
            />
            
            <input 
              className="bg-red-600 p-2 rounded cursor-pointer w-[200px] mt-4 sm:hover:bg-red-500" 
              type="submit" 
              onClick={Modal}
              value="Přihlásit se" 
            />
            
        </form>
        
        <p onClick={ () => setOpen(!open)} className="mt-4 mb-1 cursor-pointer sm:hover:underline">Zapomněli jste heslo?</p>
        { open && <ResetPasswordForm open={open} setOpen={setOpen} />}

        <button onClick={ () => {
          SignWithGoogle()
          Modal()
        }} className="bg-red-600 p-2 rounded cursor-pointer w-[200px] mt-12 sm:hover:bg-red-500">Přihlásit přes Google</button>
          <p className="mt-4">Ještě nejsi registrovaný?</p>
          <Link to="/signup"> <span className="font-bold sm:hover:underline">Registruj se zde</span></Link>
      </div>
    </div>
  )
}

export default Login
