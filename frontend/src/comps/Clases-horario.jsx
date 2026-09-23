import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerClases } from "../service/api";
import { useClases } from "../context/ClasesContext";

function ClasesHorario() {
    const navigate = useNavigate();
    //const [clases, setClases] = useState([]);
    //const [error, setError] = useState(null);
    //const [cargando, setCargando] = useState(true);
    const [diaSeleccionado, setDiaSeleccionado] = useState("Lunes");
    const {
            clases,
            cargando,
            error
    } = useClases();


    function formatearHora(hora) {

        if (!hora) return "";

        const [h, minutos] = hora.slice(0, 5).split(":");

        let horaNumero = parseInt(h);

        const periodo = horaNumero >= 12 ? "pm" : "am";

        if (horaNumero > 12) {
            horaNumero -= 12;
        }

        if (horaNumero === 0) {
            horaNumero = 12;
        }

        return `${horaNumero}:${minutos} ${periodo}`;
    }


    // Obtener el número del día usando fecha_completa
    function obtenerNumeroDia(dia) {

        const clase = clases.find(
            (c) => c.fecha === dia
        );

        if (!clase || !clase.fecha_completa) {
            return "";
        }

        const fecha = new Date(
            `${clase.fecha_completa}T00:00:00`
        );

        return fecha.getDate();
    }

    /*
    useEffect(() => {
        async function cargarClases() {
            try {
                const data = await obtenerClases();
                setClases(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        }
        cargarClases();
    }, []); */



    const horarios = [

        ...new Map(

            clases.map((clase) => [

                `${clase.hora}-${clase.hora_fin}`,

                {

                    hora: clase.hora.slice(0, 5),

                    hora_fin: clase.hora_fin.slice(0, 5),

                    texto: `${formatearHora(clase.hora)} - ${formatearHora(clase.hora_fin)}`

                }

            ])

        ).values()

    ].sort((a, b) => a.hora.localeCompare(b.hora));


    const dias = [

        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo",

    ];


   if (cargando) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-8">
                <div className="flex items-center gap-3 text-[#5c2947]">
                    <div className="w-5 h-5 border-4 border-[#c56d93] border-t-[#89167c] rounded-full animate-spin"></div>

                    <span className="font-bold text-sm">
                        Cargando clases...
                    </span>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                    Esto puede tardar un momento...
                </p>
            </div>
        );
    }


    if (error) {

        return (

            <div className="text-center p-4 text-red-600 font-bold text-sm">

                Error: {error}

            </div>

        );

    }


    return (

        <div className="w-full max-w-full overflow-hidden px-2 py-1 sm:p-6 mx-auto box-border">

            {/* ========================================================= */}
            {/* VISTA MÓVIL */}
            {/* ========================================================= */}

            <div className="block md:hidden w-full">
                <div className="flex overflow-x-auto gap-1.5 pb-1.5 mb-2 w-full no-scrollbar">
                    {dias.map((dia) => (
                        <button
                            key={dia}
                            onClick={() => setDiaSeleccionado(dia)}
                            className={`px-3 py-1 rounded-full font-bold text-[11px] shrink-0 transition-colors ${
                                diaSeleccionado === dia
                                    ? "bg-[#89167c] text-white shadow-sm"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                            }`}

                        >
                            {dia} {obtenerNumeroDia(dia)}
                        </button>
                    ))}
                </div>

                <h2 className="text-sm font-bold text-gray-800 mb-2 text-center truncate">
                    Clases del {diaSeleccionado} {obtenerNumeroDia(diaSeleccionado)}
                </h2>

                <div className="space-y-2 w-full">
                    {horarios.map((horario) => {
                        const clase = clases.find(
                            (c) =>
                                c.fecha === diaSeleccionado &&
                                c.hora.slice(0, 5) === horario.hora &&
                                c.hora_fin.slice(0, 5) === horario.hora_fin
                        );


                        if (!clase) return null;
                        return (
                            <div
                                key={clase.id}

                                onClick={() =>
                                    navigate(`/reservar/${clase.id}`)
                                }
                                className="bg-[#a103fc] active:scale-[0.98] transition-transform p-2.5 rounded-lg text-white shadow-sm flex items-center justify-between cursor-pointer w-full box-border"
                            >

                                <div className="space-y-0.5 pr-2 min-w-0">

                                    <div className="text-[10px] bg-[#c2443d] px-1.5 py-0.5 rounded font-bold inline-block whitespace-nowrap leading-none">

                                        {horario.texto}

                                    </div>


                                    <h3 className="text-sm font-bold leading-tight truncate">

                                        {clase.tipo}

                                    </h3>


                                    <p className="text-[11px] text-purple-200 truncate leading-tight">

                                        {clase.enfoque}

                                    </p>

                                </div>


                                <div className="text-right shrink-0 flex flex-col items-end justify-center">

                                    <span className="text-[10px] font-semibold bg-orange-500/30 text-orange-200 px-1.5 py-0.5 rounded-full border border-orange-300/30 whitespace-nowrap leading-none">

                                        {clase.lugares_disponibles} lugares

                                    </span>


                                    <span className="text-[10px] underline mt-1 font-medium">

                                        Reservar →

                                    </span>

                                </div>

                            </div>

                        );

                    })}


                    {!horarios.some((horario) =>

                        clases.some(

                            (c) =>
                                c.fecha === diaSeleccionado &&
                                c.hora.slice(0, 5) === horario.hora &&
                                c.hora_fin.slice(0, 5) === horario.hora_fin

                        )

                    ) && (

                        <div className="text-center py-4 text-xs text-gray-500 bg-white/50 rounded-lg border border-dashed border-gray-300">

                            No hay clases programadas.

                        </div>

                    )}

                </div>

            </div>


            {/* ========================================================= */}
            {/* VISTA ESCRITORIO / TABLET */}
            {/* ========================================================= */}

            <div className="hidden md:grid md:grid-cols-8 gap-2 items-stretch text-center text-black">

                <div className="p-3 rounded-lg font-bold bg-[#c2443d] text-white text-sm lg:text-base font-mina flex items-center justify-center">

                    Horario

                </div>


                {dias.map((dia) => (

                    <div

                        key={dia}

                        className="p-3 rounded-lg font-bold bg-[#89167c] text-white text-sm lg:text-base font-mina flex items-center justify-center"

                    >

                        {dia} {obtenerNumeroDia(dia)}

                    </div>

                ))}


                {horarios.map((horario) => (

                    <div key={horario.texto} className="contents">

                        <div className="p-3 rounded-lg font-bold bg-[#c2443d] text-white text-xs lg:text-sm font-mina flex items-center justify-center">

                            {horario.texto}

                        </div>


                        {dias.map((dia) => {

                            const clase = clases.find(

                                (c) =>
                                    c.fecha === dia &&
                                    c.hora.slice(0, 5) === horario.hora &&
                                    c.hora_fin.slice(0, 5) === horario.hora_fin

                            );


                            if (!clase) {

                                return (

                                    <div

                                        key={`${dia}-${horario.texto}`}

                                        className="bg-gray-50/50 rounded-lg border border-gray-100"

                                    />

                                );

                            }


                            return (

                                <div

                                    key={clase.id}

                                    onClick={() =>
                                        navigate(`/reservar/${clase.id}`)
                                    }

                                    className="p-3 rounded-lg text-white bg-[#a103fc] hover:brightness-90 transition cursor-pointer flex flex-col justify-between shadow-sm"

                                >

                                    <span className="text-sm font-bold leading-tight">

                                        {clase.tipo}

                                    </span>


                                    <span className="text-xs my-1 opacity-90">

                                        {clase.enfoque}

                                    </span>


                                    <span className="text-xs text-orange-200 font-medium">

                                        Lugares: {clase.lugares_disponibles}

                                    </span>

                                </div>

                            );

                        })}

                    </div>

                ))}

            </div>

        </div>

    );

}

export default ClasesHorario;