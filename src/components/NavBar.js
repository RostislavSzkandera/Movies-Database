import { useState } from "react"
import { MyContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom"

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";



const NavBar = () => {
// UseState pro zobrazení mobilního menu
    const [showNav, setShowNav] = useState(true)
  
// Destructuring context
    const { user, logOut, Modal } = MyContext()
// Použití useNavigate
    const navigate = useNavigate()

// Funkce pro otevření mobilního menu
    const menuHandler = () => {
        setShowNav(!showNav)
        }
    
// Funkce pro odhlášení uživatele
    const logout = async () => {
            await logOut()
            navigate("/")
            
        }
          
    
    
    return (
        <section>
        
        {
            user?.email ? 
            
                (<div className="bg-black w-full h-16 fixed lg:flex lg:flex-row justify-between items-center">
                    <div className="flex flex-row justify-between w-full">
                        <p className="flex flex-col lg:flex-row text-xl ml-2 sm:mx-2">Přihlášen: <span className="text-yellow-400 mx-0 sm:mx-1">{user?.email}</span></p>

                        <div className="m-2 lg:hidden z-50 mt-4">
                            {showNav? <GiHamburgerMenu size={30} onClick={menuHandler} /> : <AiOutlineClose size={30} onClick={menuHandler} /> }
                        </div>

                        {/* Mobilní MENU pro přihlášené */}

                        <nav className={showNav? "fixed left-[-100%] w-[100%] h-[100%] ease-in-out duration-1000 z-20" : "bg-black border border-white fixed left-0 top-0 w-[100%] h-[100%] uppercase ease-in-out duration-1000 z-20  lg:hidden" }>
                            <ul className="flex flex-col space-y-12 mt-60 uppercase tracking-wider font-bold ">
                                <li className="border-b border-white w-full text-center mx-auto pb-2"><Link onClick={menuHandler} className="cursor-pointer"  to="/help">Nápověda</Link></li>
                                <li className="border-b border-white w-full text-center mx-auto pb-2"><Link onClick={menuHandler} className="cursor-pointer"  to="/movielist">Upravit seznam</Link></li>
                                <li className="border-b border-white w-full text-center mx-auto pb-2"><Link onClick={menuHandler} className="cursor-pointer"  to="/addmovie">Přidání filmu</Link></li>
                                <li className="border-b border-white w-full text-center mx-auto pb-2"><button  className="cursor-pointer uppercase" onClick={ () => {
                                    logout()
                                    menuHandler()
                                    Modal()
                                    navigate("/")
                                    }} >Odhlásit se</button></li> 
                            </ul>
                        </nav>

                        {/* PC MENU pro přihlášené  */}
                        <nav className="hidden lg:block">
                            <ul className="flex flex-row justify-center items-center">
                                <li className="mt-1"><Link className="mr-4 p-2 font-bold  bg-red-700 rounded-xl hover:bg-red-600"  to="/help">Nápověda</Link></li>
                                <li className="mt-1"><Link className="mr-4 p-2 font-bold  bg-red-700 rounded-xl hover:bg-red-600"  to="/movielist">Upravit seznam</Link></li>
                                <li className="mt-1"><Link className="mr-4 p-2 font-bold bg-red-700 rounded-xl hover:bg-red-600" to="/addmovie">Přidání filmu</Link></li>
                                <li className="mt-1"><button className="mr-4 p-2 font-bold bg-red-700 rounded-xl hover:bg-red-600" to="/signout" onClick={ () => {
                                    logout()
                                    Modal()
                                    navigate("/")
                                    }} >Odhlásit se</button></li>
                            </ul>
                        </nav>           

                    </div>
                </div> ) : 
                
                (
                <div className="w-full h-12 bg-black fixed flex flex-row justify-between">
                    
                    <div>
                        <p className="mt-2 ml-2 text-xl text-red-500">Nejsi přihlášen</p>
                    </div>
                    

                    <div className="mr-4 lg:hidden z-50 mt-2  ">
                        {showNav? <GiHamburgerMenu size={30} onClick={menuHandler} /> : <AiOutlineClose size={30} onClick={menuHandler} /> }
                    </div>

                    {/* Mobilní MENU pro nepřihlášené */}
                    <nav className={showNav? "fixed left-[-100%] w-[100%] h-[100%]  ease-in-out duration-1000 z-20" : "bg-black border border-white fixed left-0 top-0 w-[100%] h-[100%] uppercase ease-in-out  duration-1000 z-20  lg:hidden " }>
                        <ul className="flex flex-col space-y-12 mt-60 uppercase tracking-wider font-bold ">
                            <li className="border-b border-white w-full text-center mx-auto pb-2"><Link onClick={menuHandler} className="cursor-pointer"  to="/">Úvod</Link></li>
                            <li className="border-b border-white w-full text-center mx-auto pb-2"><Link onClick={menuHandler} className="cursor-pointer"  to="/help">Nápověda</Link></li>
                            <li className="border-b border-white w-full text-center mx-auto pb-2"><Link onClick={menuHandler} className="cursor-pointer"  to="/login">Přihlášení</Link></li>
                            <li className="border-b border-white w-full text-center mx-auto pb-2"><Link onClick={menuHandler} className="cursor-pointer"  to="/signup">Registrace</Link></li>
                        </ul>
                    </nav>

                    {/* PC MENU pro nepřihlášené  */}
                    <nav className="hidden lg:block mt-[12px]">
                        <ul className="flex flex-row">
                            <li><Link className="mr-4 mt-2  p-2 font-bold bg-red-700 rounded-xl hover:bg-red-600"  to="/">Úvod</Link></li>
                            <li><Link className="mr-4 mt-2 p-2 font-bold  bg-red-700 rounded-xl hover:bg-red-600"  to="/help">Nápověda</Link></li>
                            <li><Link className="mr-4 mt-2  p-2 font-bold bg-red-700 rounded-xl hover:bg-red-600"  to="/login">Přihlášení</Link></li>
                            <li><Link className="mr-4 mt-2  p-2 font-bold bg-red-700 rounded-xl hover:bg-red-600" to="signup">Registrace</Link></li>
                        </ul>
                    </nav>
                </div>)
}

        
      
        </section>
  )
}

export default NavBar
