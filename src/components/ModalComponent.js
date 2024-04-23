import { MyContext } from "../context/Context"

const ModalComponent = ({ text }) => {
  
    const { showModal } = MyContext()
  
  
    return (

       <div>
            <div className={!showModal? " bg-green-500 fixed right-[20%]  top-[-100%] w-[17%] min-h-[30px]  ease-in-out duration-1000 opacity-80 p-1" : "opacity-80 flex flex-row  justify-center items-center bg-green-500 fixed right-[20%] sm:right-[30%] top-0 w-[17%] min-h-[30px] rounded  ease-in-out duration-1000 p-1"}>
                <div className='flex flex-row justify-center items-center'>
                    <h2 className="text-center ">{text}</h2>
                </div>
        
            </div>
        </div>
    
  )

}
export default ModalComponent
