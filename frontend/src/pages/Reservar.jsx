import Header from "../comps/Header";
import Footer from "../comps/Footer";
import ReservationForm from "../comps/ReservationForm";

import { useNavigate, useParams } from "react-router-dom";
import { useClases } from "../context/ClasesContext";

function Reservar() {
    const navigate = useNavigate();
    const { claseId } = useParams();

    const {
        clases,
        cargando,
        error
    } = useClases();


    // Buscar la clase seleccionada
    const clase = clases.find(
        (c) => String(c.id) === String(claseId)
    );

    // Cargando clases
    if (cargando) {
        return (
            <div className="min-h-screen bg-[#e2b6c9] flex flex-col">

                <Header />

                <main className="flex-1 pt-24 flex items-center justify-center">

                    <div className="flex flex-col items-center">

                        <div className="
                            w-8 h-8
                            border-4
                            border-[#c56d93]
                            border-t-[#89167c]
                            rounded-full
                            animate-spin
                        "></div>

                        <p className="mt-3 text-sm font-bold text-[#5c2947]">
                            Cargando clase...
                        </p>

                    </div>

                </main>

                <Footer />

            </div>
        );
    }


    // Error al cargar las clases
    if (error) {
        return (
            <div className="min-h-screen bg-[#e2b6c9] flex flex-col">
                <Header />
                <main className="flex-1 pt-24 flex items-center justify-center px-5">
                    <div className="
                        bg-red-100
                        border-2
                        border-red-500
                        text-red-700
                        rounded-xl
                        p-5
                        text-center
                        font-bold
                    ">
                        No se pudieron cargar las clases.
                    </div>

                </main>

                <Footer />

            </div>
        );
    }


    // La clase no existe
    if (!clase) {
        return (
            <div className="min-h-screen bg-[#e2b6c9] flex flex-col">

                <Header />

                <main className="flex-1 pt-24 flex items-center justify-center px-5">

                    <div className="
                        bg-white
                        border-2
                        border-[#913c6d]
                        text-[#521434]
                        rounded-xl
                        p-6
                        text-center
                        shadow-lg
                    ">
                        <p className="text-xl font-bold">
                            Clase no encontrada
                        </p>
                        <p className="text-sm mt-2 text-gray-600">
                            Es posible que esta clase ya no esté disponible.
                        </p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#e2b6c9] flex flex-col">
            <Header />
            <main className="flex-1 pt-24">
                {/* TÍTULO */}
                <section className="px-4 py-8 md:px-8 lg:px-12">
                    <p className="
                        text-4xl
                        md:text-5xl
                        lg:text-6xl
                        font-lobster
                        tracking-tight
                        text-black
                    ">
                        RESERVA TU CLASE
                    </p>
                    <div className="
                        mt-3
                        h-1
                        w-32
                        bg-[#7b1e4e]
                        rounded-full
                    "></div>
                </section>

                {/* VOLVER */}
                <section className="px-5">
                    <button
                        onClick={() => navigate("/horarios")}
                        className="
                            inline-flex
                            p-5
                            items-center
                            text-[#521434]
                            font-bold
                            hover:text-[#7b1e4e]
                            transition
                            hover:cursor-pointer
                        "
                    >
                        ← Volver a horarios
                    </button>

                </section>

                {/* FORMULARIO */}
                <section className="px-5 pb-12">

                    <ReservationForm clase={clase} />

                </section>

            </main>

            <Footer />

        </div>
    );
}
export default Reservar;