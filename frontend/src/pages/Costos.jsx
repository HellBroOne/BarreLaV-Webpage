import Header from '../comps/Header'
import Footer from '../comps/Footer'
import CostCont from '../comps/Cost-cont'

function Costos() {
    return (
        <>
            <div className="bg-[#e2b6c9] flex flex-col w-full"> 
            <Header /> 
            <section id="inicio" className="pt-24"> 
                <p className="lg:text-6xl md:text-5xl text-2xl  font-lobster tracking-tight text-black lg:p-5 p-2" >
                    COSTOS </p>
                    <hr className='border-2 '></hr>
            </section> 
            <div className='p-3 '>
                <p className='lg:text-2xl md:text-xl text-md text-bold font-mina text-[#8b6250] font-bold'> 
                    Manejamos diferentes costos para las clases. ¡Elige la que más se adapte a ti! 
                </p>
                <div>
                    <p className="
                        text-sm md:text-base
                        tracking-widest
                        text-[#8b6250]
                        uppercase
                    
                    ">
                        Elige el paquete ideal para ti
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-10">

                <CostCont
                    desc="Primera clase"
                    cost="50"
                    vig="Vigencia 1 día"
                    bg_color="bg-[#f6df73]"
                />

                <CostCont
                    desc="Clase suelta"
                    cost="80"
                    vig="Vigencia 2 días"
                    bg_color="bg-[#f6df73]"
                />

                <CostCont
                    desc="5 clases"
                    cost="375"
                    vig="Vigencia 10 días"
                    bg_color="bg-[#f6df73]"
                />

                <CostCont
                    desc="10 clases"
                    cost="700"
                    vig="Vigencia 30 días"
                    bg_color="bg-[#f6df73]"
                />

                <CostCont
                    desc="15 clases"
                    cost="975"
                    vig="Vigencia 30 días"
                    bg_color="bg-[#f6df73]"
                />

                <CostCont
                    desc="20 clases"
                    cost="1200"
                    vig="Vigencia 30 días"
                    bg_color="bg-[#f6df73]"
                />
            </div>

            {/* Nota */}
            <div className="mt-5 text-center py-5">
                <p className="
                    font-italianno
                    text-3xl
                    text-black
                    font-bold
                ">
                    ¿Eres estudiante? ¡Presenta tu credencial!
                </p>

            </div>
            </div>
            <Footer />
        </>
    )
}

export default Costos;