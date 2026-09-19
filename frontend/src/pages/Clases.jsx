import Header from '../comps/Header'
import Footer from '../comps/Footer'
import ClassCont from '../comps/Class-cont'

function Clases() {
    return (
        <>
            <div className="bg-[#e2b6c9] flex flex-col w-full"> 
            <Header /> 
            <section id="inicio" className="pt-24"> 
                <p className="lg:text-6xl md:text-5xl text-2xl  font-lobster tracking-tight text-black lg:p-5 p-2" >
                    NUESTRAS CLASES </p>
                    <hr className='border-2 '></hr>
            </section> 
            <div className='flex lg:flex-row flex-col p-12 lg:gap-10 gap-5'>
              <ClassCont number="01" title="BARRE" 
              description="El barre es una disciplina de entrenamiento físico que fusiona elementos del ballet clásico, 
              el pilates y el yoga, complementados con trabajo de fuerza isométrica y tonificación."
              keyword="Ballet • Musculos Bajos • Tonificacion"/>
              <ClassCont number="02" title="SCULPT" 
              description="Sculpt es un entrenamiento de tonificación muscular y definición 
              corporal que combina ejercicios de fuerza, resistencia y movimientos funcionales.
              Suele ser de mayor intensidad y ritmo más rápido." 
              keyword="Resistencia • Core • Definicion Muscular"/>
            </div>
            </div>
            <Footer />
        </>
    )
}

export default Clases;