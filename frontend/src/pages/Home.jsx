import Header from '../comps/Header'
import MainImg from '../comps/MainImg'
import SectionImg from '../comps/SectionImage'
import SectionImgLft from '../comps/SectionImageLeft'
import Footer from '../comps/Footer'
import barr2 from "../assets/barre-2.jpg";
import barr3 from "../assets/barre-3.png";
import barr4 from "../assets/barre-4.png";

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
                    image={barr2} 
                    className="bg-[#462036]"/> 
                
                <SectionImgLft
                    title="PRIMER ESTUDIO EN VALPARAÍSO"
                    body="El primer estudio de Barre en Valparaíso, ofreciendo clases de alta calidad para todos los niveles. Nuestro enfoque se centra en la técnica, la seguridad y el bienestar de nuestros estudiantes, brindando un ambiente acogedor y motivador para alcanzar sus objetivos de fitness y salud."
                    image={barr4} 
                    className="bg-[#600297]"/>
                
                <SectionImg 
                    title="DOS TIPOS DE CLASE: BARRE Y SCULPT"
                    body="Tenemos dos tipos de clases: Barre y Sculpt. El Barre se enfoca en movimientos de ballet y tonificación, mientras que el Sculpt combina ejercicios de fuerza y resistencia para esculpir el cuerpo. Ambas clases son efectivas para mejorar la postura, la flexibilidad y la fuerza muscular."
                    image={barr3} 
                    className="bg-[#fd6881]"/> 
            </div>
            <Footer />
        </>
    )
}

export default Home;