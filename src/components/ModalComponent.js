import { MyContext } from "../context/Context"

const ModalComponent = ({ text }) => {
  
    const { showModal } = MyContext()
  
  
    return (

       <div>
            <div className={!showModal? " bg-green-500 fixed right-[30%]  top-[-100%] w-[15%] h-[5%]  ease-in-out duration-1000 opacity-80" : "opacity-80 flex flex-row  justify-center items-center bg-green-500 fixed right-[30%] top-0 w-[15%] h-[5%] rounded  ease-in-out duration-1000"}>
                <div className='flex flex-row justify-center items-center'>
                    <h2 className="text-center ">{text}</h2>
                </div>
        
            </div>
        </div>
    
  )

}
export default ModalComponent
