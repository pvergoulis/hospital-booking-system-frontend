import { Outlet } from "react-router"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"


const BeforeLoginLayout = () =>{

    return(
        <>
        <Header/>

        <div className="min-h-[55vh] pt-16">
            <Outlet/>
        </div>

        <Footer/>
        
        </>
    )
}

export default BeforeLoginLayout