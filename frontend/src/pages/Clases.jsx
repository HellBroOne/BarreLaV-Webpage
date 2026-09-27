import Header from "../comps/Header";
import Footer from "../comps/Footer";
import ClassCont from "../comps/Class-cont";

function Clases() {

    return (
        <div className="min-h-screen bg-[#e2b6c9] flex flex-col">

            <Header />

            <main className="flex-1 pt-24">

                {/* TÍTULO */}
                <section className="px-4 py-8 md:px-8 lg:px-12">

                    <p className="text-4xl md:text-5xl lg:text-6xl font-lobster tracking-tight text-black">
                        NUESTRAS CLASES
                    </p>

                    <div className="mt-3 h-1 w-32 bg-[#7b1e4e] rounded-full"></div>

                </section>


                {/* CLASES */}
                <div className="flex lg:flex-row flex-col p-6 md:p-10 lg:p-12 lg:gap-10 gap-5">

                    <ClassCont
                        number="01"
                        title="BARRE"
                        description={`El Barre es una disciplina que crea un entrenamiento completo y accesible para todos los niveles. \n
                        Su nombre proviene de la “barra” de ballet, un elemento importante en las clases, que se utiliza como apoyo para realizar ejercicios basados en la danza clásica, pero adaptados al fitness. 
                        Se le suman técnicas de Pilates y posturas de yoga, creando una experiencia que mejora la fuerza, la postura, la flexibilidad y el equilibrio.`}
                        keyword="Ballet • Musculos Bajos • Tonificacion"
                    />

                    <ClassCont
                        number="02"
                        title="SCULPT"
                        description={`Sculpt es una disciplina de entrenamiento funcional y de resistencia que busca esculpir y tonificar el cuerpo de manera integral. \n
                        Combina ejercicios de fuerza, cardio y estiramiento en una rutina intensa y dinámica, usando accesorios ligeros como pesas, bandas elásticas o el peso corporal. 
                        Cada sesión trabaja todos los grupos musculares de forma equilibrada y eficiente.`}
                        keyword="Resistencia • Core • Definicion Muscular"
                    />

                </div>

            </main>

            <Footer />

        </div>
    );
}

export default Clases;