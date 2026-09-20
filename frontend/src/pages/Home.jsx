import Header from '../comps/Header'
import MainImg from '../comps/MainImg'
import SectionImg from '../comps/SectionImage'
import SectionImgLft from '../comps/SectionImageLeft'
import Footer from '../comps/Footer'

function Home() {
    return (
        <>
            <div className="bg-[#e2b6c9] flex flex-col w-full min-h-screen"> 
                <Header /> 
                <section id="inicio" className="pt-16 lg:pt-24"> 
                    <MainImg />
                </section> 
                <SectionImg 
                    title="CONOCE EL BARRE"
                    body="El Barre es un método de entrenamiento que combina elementos del ballet, pilates y yoga para fortalecer y tonificar el cuerpo. Se centra en movimientos precisos y controlados, utilizando la barra como soporte para mejorar la postura, la flexibilidad y la fuerza muscular."
                    image="/src/assets/barre-2.jpg"
                    className="bg-[#462036]"/> 
                
                <SectionImgLft
                    title="PRIMER ESTUDIO EN VALPARAÍSO"
                    body="El primer estudio de Barre en Valparaíso, ofreciendo clases de alta calidad para todos los niveles. Nuestro enfoque se centra en la técnica, la seguridad y el bienestar de nuestros estudiantes, brindando un ambiente acogedor y motivador para alcanzar sus objetivos de fitness y salud."
                    image="/src/assets/barre-4.png"
                    className="bg-[#600297]"/>
                
                <SectionImg 
                    title="DOS TIPOS DE CLASE: BARRE Y SCULPT"
                    body="Tenemos dos tipos de clases: Barre y Sculpt. El Barre se enfoca en movimientos de ballet y tonificación, mientras que el Sculpt combina ejercicios de fuerza y resistencia para esculpir el cuerpo. Ambas clases son efectivas para mejorar la postura, la flexibilidad y la fuerza muscular."
                    image="/src/assets/barre-3.png"
                    className="bg-[#fd6881]"/> 
            </div>
            <Footer />
        </>
    )
}

export default Home;