import { useState } from "react"
import { MyContext } from "../context/Context"





const ResetPasswordForm = ({ open , setOpen }) => {
    const [email, setEmail] = useState("")

// Destructuring context
    const { resetPassword } = MyContext()
 


// Funkce pro změnu hesla 
    const handleSubmit = (e) => {
        e.preventDefault()
        resetPassword(email).then( (data => {
            alert("Podívejte se do e-mailu.")
            setEmail("")
            setOpen(!open)
        })). catch (err => {
            alert("Něco se nepovedlo")
        })
    }
 
    return (
    <div>
        <form onSubmit={handleSubmit} className="text-black">
            <input 
                className="p-1 mr-2" 
                type="email" 
                placeholder="Váš Email" 
                onChange={ (e) => setEmail(e.target.value)} 
                value={email}  
            />
            <input 
                className="bg-black p-1 text-white cursor-pointer mr-2" 
                type="submit" 
                value="Odeslat" 
            />
            
        </form>
        <div className="mt-2 w-full  flex flex-row justify-center">
        <button onClick={() => setOpen(!open)} className="w-[100px] text-center mx-auto bg-black p-1 text-white cursor-pointer">Zavřít</button>
        </div>
    </div>
  )
}

export default ResetPasswordForm
