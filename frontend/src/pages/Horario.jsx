import Header from "../comps/Header";
import Footer from "../comps/Footer";
import ClassHor from "../comps/Clases-horario";

function Horario() {
    return (
        <div className="min-h-screen bg-[#e2b6c9] flex flex-col">

            <Header />

            <main className="flex-1 pt-24">

                {/* TÍTULO */}
                <section className="px-4 py-8 md:px-8 lg:px-12">

                    <p className="text-4xl md:text-5xl lg:text-6xl font-lobster tracking-tight text-black">
                        HORARIO DE CLASES
                    </p>

                    <div className="mt-3 h-1 w-32 bg-[#7b1e4e] rounded-full"></div>

                </section>


                {/* INTRODUCCIÓN */}
                <section className="px-4 md:px-8 lg:px-12 pb-6">

                    <p className="
                        lg:text-2xl
                        md:text-xl
                        text-md
                        font-mina
                        text-[#8b6250]
                        font-bold
                    ">
                        ¿En la tarde o en la mañana? Tú eliges.
                    </p>

                    <p className="
                        mt-2
                        text-sm md:text-base
                        tracking-widest
                        text-[#8b6250]
                        uppercase
                    ">
                        Elige una de las clases que mejor se adapte a ti
                        para reservar tu espacio.
                    </p>

                </section>


                {/* HORARIOS */}
                <section>
                    <ClassHor />
                </section>

            </main>

            <Footer />

        </div>
    );
}

export default Horario;