import Header from '../comps/Header'
import Footer from '../comps/Footer'
import ReservationForm from '../comps/ReservationForm';

function Reservar() {
    return (
        <>
            <div className="bg-[#e2b6c9] flex flex-col w-full"> 
            <Header /> 
                <section id="inicio" className="pt-24"> 
                <p className="lg:text-6xl md:text-5xl text-2xl  font-lobster tracking-tight text-black lg:p-5 p-2" >
                        RESERVA TU CLASE </p>
                    <hr className='border-2 '></hr>
                </section> 
                <div className='p-5'>
                     <ReservationForm claseId={1}/>
                <div/>
            </div>
            <Footer />
            </div>
        </>
    )
}

export default Reservar;