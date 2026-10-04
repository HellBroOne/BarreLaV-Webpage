import { useState } from "react";
import { crearClase } from "../service/api";

function CrearClase() {

    const [tipo, setTipo] = useState("BARRE");
    const [repetir, setRepetir] = useState(false);

    const [dia, setDia] = useState("Lunes");
    const [dias, setDias] = useState([]);

    const [hora, setHora] = useState("");
    const [horaFin, setHoraFin] = useState("");

    const [capacidad, setCapacidad] = useState(10);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const diasSemana = [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo"
    ];

    const manejarDia = (diaSeleccionado) => {

        setDias((actuales) => {

            if (actuales.includes(diaSeleccionado)) {
                return actuales.filter(
                    (dia) => dia !== diaSeleccionado
                );
            }

            return [...actuales, diaSeleccionado];
        });
    };

    const manejarSubmit = async (e) => {

        e.preventDefault();

        setMensaje("");
        setError("");

        if (!hora || !horaFin) {
            setError("Debes seleccionar la hora de inicio y de fin.");
            return;
        }

        const diasSeleccionados = repetir
            ? dias
            : [dia];

        if (diasSeleccionados.length === 0) {
            setError("Debes seleccionar al menos un día.");
            return;
        }

        const datos = {
            tipo,
            hora,
            hora_fin: horaFin,
            capacidad: Number(capacidad),
            dias: diasSeleccionados
        };

        try {

            setCargando(true);

            const token = localStorage.getItem("access");

            if (!token) {
                setError("No hay una sesión iniciada.");
                return;
            }

            console.log("Datos enviados:", datos);

            const resultado = await crearClase(
                datos,
                token
            );

            setMensaje(
                resultado.mensaje ||
                "Clase creada correctamente."
            );

            // Limpiar formulario
            setHora("");
            setHoraFin("");
            setCapacidad(10);
            setDia("Lunes");
            setDias([]);

        } catch (error) {

            setError(
                error.message ||
                "No se pudo crear la clase."
            );

        } finally {

            setCargando(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto ">

            <form
                onSubmit={manejarSubmit}
                className="bg-white rounded-2xl shadow-md p-6 space-y-6"
            >

                <h2 className="text-2xl font-bold text-[#521434]">
                    Crear clase
                </h2>


                {/* TIPO */}

                <div>
                    <label className="block font-semibold mb-2">
                        Tipo de clase
                    </label>

                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-full border rounded-lg p-3"
                    >
                        <option value="BARRE">
                            BARRE
                        </option>

                        <option value="SCULPT">
                            SCULPT
                        </option>
                    </select>
                </div>


                {/* REPETIR */}

                <div>

                    <label className="flex items-center gap-3 cursor-pointer">

                        <input
                            type="checkbox"
                            checked={repetir}
                            onChange={(e) => {
                                setRepetir(e.target.checked);
                                setDias([]);
                            }}
                            className="w-5 h-5"
                        />

                        <span className="font-semibold">
                            La clase se repite?
                        </span>

                    </label>

                </div>


                {/* DÍAS */}

                {!repetir ? (

                    <div>

                        <label className="block font-semibold mb-2">
                            Día
                        </label>

                        <select
                            value={dia}
                            onChange={(e) => setDia(e.target.value)}
                            className="w-full border rounded-lg p-3"
                        >
                            {diasSemana.map((dia) => (
                                <option
                                    key={dia}
                                    value={dia}
                                >
                                    {dia}
                                </option>
                            ))}
                        </select>

                    </div>

                ) : (

                    <div>

                        <label className="block font-semibold mb-3">
                            Días de la semana
                        </label>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                            {diasSemana.map((dia) => (

                                <label
                                    key={dia}
                                    className="flex items-center gap-2 cursor-pointer"
                                >

                                    <input
                                        type="checkbox"
                                        checked={dias.includes(dia)}
                                        onChange={() =>
                                            manejarDia(dia)
                                        }
                                        className="w-4 h-4"
                                    />

                                    <span>
                                        {dia}
                                    </span>

                                </label>

                            ))}

                        </div>

                    </div>
                )}


                {/* HORARIOS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>

                        <label className="block font-semibold mb-2">
                            Hora de inicio
                        </label>

                        <input
                            type="time"
                            value={hora}
                            onChange={(e) =>
                                setHora(e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                        />

                    </div>


                    <div>

                        <label className="block font-semibold mb-2">
                            Hora de fin
                        </label>

                        <input
                            type="time"
                            value={horaFin}
                            onChange={(e) =>
                                setHoraFin(e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                </div>


                {/* CAPACIDAD */}

                <div>

                    <label className="block font-semibold mb-2">
                        Capacidad
                    </label>

                    <input
                        type="number"
                        min="1"
                        value={capacidad}
                        onChange={(e) =>
                            setCapacidad(e.target.value)
                        }
                        className="w-full border rounded-lg p-3"
                    />

                </div>


                {/* MENSAJES */}

                {mensaje && (

                    <div className="bg-green-100 text-green-700 rounded-lg p-3">
                        {mensaje}
                    </div>

                )}

                {error && (

                    <div className="bg-red-100 text-red-700 rounded-lg p-3">
                        {error}
                    </div>

                )}


                {/* BOTÓN */}

                <button
                    type="submit"
                    disabled={cargando}
                    className="w-full bg-[#521434] text-white rounded-lg py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                >
                    {cargando
                        ? "Creando..."
                        : "Crear clase"
                    }
                </button>

            </form>

        </div>
    );
}

export default CrearClase;