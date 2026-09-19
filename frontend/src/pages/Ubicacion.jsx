import Header from '../comps/Header'
import Footer from '../comps/Footer'
import ClassCont from '../comps/Class-cont'
import { FaLocationDot } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

function Ubicacion() {
    return (
        <>
        <div className="bg-[#e2b6c9] flex flex-col w-full "> 
            <Header /> 
            <section id="inicio" className="pt-24"> 
                <p className="lg:text-6xl md:text-5xl text-2xl  font-lobster tracking-tight text-black lg:p-5 p-2" >
                    UBICACI&Oacute;N  Y CONTACTO </p>
                    <hr className='border-2 '></hr>
            </section> 

            <div className='flex flex-row lg:p-5 items-center p-10 bg-[#fe9aab]'>
                <div className='flex justify-center lg:p-5 -translate-y-5'>
                    <FaLocationDot size={50}/>
                </div>
                <div className='flex flex-col gap-5 lg:gap-1'>
                    <p className="lg:text-2xl md:text-xl text-md text-bold font-russo tracking-tight text-black lg:p-5 p-2" >
                        Frente al Jardin Municipal
                    </p>
                    <p className="lg:text-xl md:text-lg text-sm tracking-tight text-black -translate-y-10 lg:p-5 p-2" >
                        Colonia Centro, frente al jardín municipal. A un costado de farmacia Guadalajara.
                    </p>
                </div>
                <div className='flex flex-col'>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325.16576030703453!2d-103.56706980750673!3d22.771666128174743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869d2aea83b10005%3A0x45d759a8fbc80eff!2sConstituci%C3%B3n%20123%2C%20Centro%2C%2099250%20Valpara%C3%ADso%2C%20Zac.!5e0!3m2!1ses!2smx!4v1789614999528!5m2!1ses!2smx"
                        style={{border:0}}
                        allowFullScreen
                        loading="lazy" 
                        referrerPolicy="strict-origin-when-cross-origin"
                        className='w-55 h-auto lg:h-75 lg:w-100 rounded-lg'
                        z-index="10">    
                    </iframe>
                </div>
            </div>
            <hr className='border-2 border-[#7b1e4e]'></hr>
                <div className='flex flex-row lg:p-5 items-center p-10 bg-[#fe67ad]'>
                    <div className='flex justify-center lg:p-5 -translate-y-5'>
                        <FaInstagram size={50}/>
                    </div>
                    <div className='flex flex-col gap-5 lg:gap-1'>
                        <p className="lg:text-2xl md:text-xl text-md text-bold font-russo tracking-tight text-black lg:p-5 p-2" >
                            S&iacute;guenos en Instagram
                        </p>
                        <p className="lg:text-xl md:text-lg text-sm tracking-tight text-black -translate-y-10 lg:p-5 p-2">
                            Accede a nuestra p&aacute;gina de Instagram: 
                            <a href="https://www.instagram.com/barre_lav/" target="_blank" rel="noopener noreferrer" 
                            className="lg:text-xl md:text-lg text-sm tracking-tight text-[#8102ca] font-bold -translate-y-10 p-1 hover:text-[#400165] transition">
                                @barre_lav
                            </a>
                        </p>
                    </div>
                    <div className='flex flex-col '>
                        <img src="/src/assets/barre-qr.png" alt="QR para la página de Barre LaV" className="w-55 h-auto rounded-lg lg:translate-x-60"/>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Ubicacion;