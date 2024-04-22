import { MyContext } from "../context/Context"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"




const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword ] = useState("")
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("")
    
    
// Destructuring context
    const { signUp, Modal } = MyContext()

// Použití useNavigate
    const navigate = useNavigate()

// Odeslání registračního formuláře
    const handleSubmit = async (e) => {
        e.preventDefault()
        
          
          try {
              setErrors(validateValues(email, password));
              if(email.length > 11 && password.length > 5 ) {
                await signUp(email, password)
                navigate("/movielist")
              } 
           
           

        } catch (error) {
            setError("Tato emailová adresa už je zaregistrovaná")
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





  return (
    
    <div className="w-full h-[700px] flex flex-col justify-center items-center">
      <div className="w-[500px] h-[500px] flex flex-col justify-center items-center bg-gray-800">
        <h2 className="text-2xl mb-4">Registrace</h2>
        <form  onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-[300px]">
          
          {/* Validace formuláře, vypisování chyb */}
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
          
          <label htmlFor="name">Jméno</label>
          <input 
            autoComplete="off" 
            id="name" 
            className="m-2 text-black p-2" 
            type="email" placeholder="Email"   
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
