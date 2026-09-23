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
                        description="El barre es una disciplina de entrenamiento físico que fusiona elementos del ballet clásico, el pilates y el yoga, complementados con trabajo de fuerza isométrica y tonificación."
                        keyword="Ballet • Musculos Bajos • Tonificacion"
                    />

                    <ClassCont
                        number="02"
                        title="SCULPT"
                        description="Sculpt es un entrenamiento de tonificación muscular y definición corporal que combina ejercicios de fuerza, resistencia y movimientos funcionales. Suele ser de mayor intensidad y ritmo más rápido."
                        keyword="Resistencia • Core • Definicion Muscular"
                    />

                </div>

            </main>

            <Footer />

        </div>
    );
}

export default Clases;