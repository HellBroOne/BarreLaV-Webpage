import Header from '../comps/Header'
import Footer from '../comps/Footer'
import ClassHor from '../comps/Clases-horario'

function Horario() {
    return (
        <>
            <div className="bg-[#e2b6c9] flex flex-col w-full"> 
            <Header /> 
            <section id="inicio" className="pt-24"> 
                <p className="lg:text-6xl md:text-5xl text-2xl font-lobster tracking-tight text-black lg:p-5 p-2" >
                    HORARIO DE CLASES </p>
                    <hr className='border-2 '></hr>
            </section> 
            <div className='flex lg:flex-row flex-col p-12 lg:gap-10 gap-5'>
                <ClassHor />
            </div>
            </div>
            <Footer />
        </>
    )
}

export default Horario;