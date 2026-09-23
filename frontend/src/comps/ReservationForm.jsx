import { useState } from "react";
import { crearReserva } from "../service/api";

function ReservationForm({ clase }) {

    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [tieneLesion, setTieneLesion] = useState(false);
    const [lesion, setLesion] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


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


    async function handleSubmit(e) {

        e.preventDefault();

        setMensaje("");
        setError("");

        try {

            const reserva = await crearReserva({

                clase: clase.id,

                nombre: nombre,

                edad: Number(edad),

                tiene_lesion: tieneLesion,

                lesion: tieneLesion
                    ? lesion
                    : "",

            });

            console.log(reserva);

            setMensaje(
                "¡Reserva realizada correctamente!"
            );

            setNombre("");
            setEdad("");
            setTieneLesion(false);
            setLesion("");

        } catch (error) {

            setError(error.message);

        }
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="
                w-full
                max-w-xl
                mx-auto
                bg-[#f0c4d5]
                border-2
                border-[#913c6d]
                rounded-2xl
                p-6
                md:p-8
                shadow-lg
            "
        >

            {/* CLASE SELECCIONADA */}
            <div className="
                mb-2
                bg-[#ffdce8]
                border-2
                border-[#913c6d]
                rounded-xl
                p-2
                text-center
                shadow-sm
            ">

                <p className="
                    text-xs
                    md:text-sm
                    uppercase
                    tracking-[0.2em]
                    text-[#8b6250]
                    font-bold
                ">
                    Estás reservando
                </p>

                <p className="
                    text-3xl
                    md:text-4xl
                    font-lobster
                    text-[#521434]
                ">
                    {clase.tipo}
                </p>

                <p className="
                    text-lg
                    md:text-md
                    text-[#521434]
                    mt-1
                ">
                    {clase.enfoque}
                </p>

                <div className="
                    flex
                    justify-center
                    flex-wrap
                    gap-2
                    mt-2
                ">

                    <span className="
                        bg-[#7b1e4e]
                        text-white
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-bold
                    ">
                        {clase.fecha}
                    </span>

                    <span className="
                        bg-[#7b1e4e]
                        text-white
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-bold
                    ">
                        {formatearHora(clase.hora)}
                    </span>

                </div>

            </div>


            {/* NOMBRE */}
            <div className="flex flex-col gap-2 mb-5">

                <label
                    htmlFor="nombre"
                    className="text-[#3d1230] font-bold text-lg"
                >
                    Nombre
                </label>

                <input
                    id="nombre"
                    type="text"
                    placeholder="Escribe tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="
                        w-full
                        bg-white
                        border-2
                        border-[#913c6d]
                        rounded-lg
                        px-4
                        py-3
                        outline-none
                        text-[#3d1230]
                        placeholder:text-gray-400
                        focus:border-[#c05b91]
                        focus:ring-2
                        focus:ring-[#c05b91]/30
                        transition
                    "
                />

            </div>


            {/* EDAD */}
            <div className="flex flex-col gap-2 mb-6">

                <label
                    htmlFor="edad"
                    className="text-[#3d1230] font-bold text-lg"
                >
                    Edad
                </label>

                <input
                    id="edad"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="Escribe tu edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    required
                    className="
                        w-full
                        bg-white
                        border-2
                        border-[#913c6d]
                        rounded-lg
                        px-4
                        py-3
                        outline-none
                        text-[#3d1230]
                        placeholder:text-gray-400
                        focus:border-[#c05b91]
                        focus:ring-2
                        focus:ring-[#c05b91]/30
                        transition
                    "
                />

            </div>


            {/* LESIÓN */}
            <div className="mb-7">

                <p className="
                    text-[#3d1230]
                    font-bold
                    text-lg
                    mb-3
                ">
                    ¿Tienes alguna lesión?
                </p>


                <div className="flex gap-4">

                    {/* SÍ */}
                    <label
                        className={`
                            flex-1
                            cursor-pointer
                            border-2
                            rounded-lg
                            p-3
                            text-center
                            font-bold
                            transition

                            ${
                                tieneLesion
                                    ? "bg-[#913c6d] text-white border-[#913c6d]"
                                    : "bg-white text-[#913c6d] border-[#913c6d] hover:bg-[#e8b1c8]"
                            }
                        `}
                    >

                        <input
                            type="radio"
                            name="lesion"
                            checked={tieneLesion === true}
                            onChange={() => setTieneLesion(true)}
                            className="hidden"
                        />

                        Sí

                    </label>


                    {/* NO */}
                    <label
                        className={`
                            flex-1
                            cursor-pointer
                            border-2
                            rounded-lg
                            p-3
                            text-center
                            font-bold
                            transition

                            ${
                                !tieneLesion
                                    ? "bg-[#913c6d] text-white border-[#913c6d]"
                                    : "bg-white text-[#913c6d] border-[#913c6d] hover:bg-[#e8b1c8]"
                            }
                        `}
                    >

                        <input
                            type="radio"
                            name="lesion"
                            checked={tieneLesion === false}
                            onChange={() => {
                                setTieneLesion(false);
                                setLesion("");
                            }}
                            className="hidden"
                        />

                        No

                    </label>

                </div>


                {/* CAMPO DINÁMICO */}
                {tieneLesion && (

                    <div className="mt-4">

                        <label
                            htmlFor="lesion"
                            className="
                                block
                                text-[#3d1230]
                                font-bold
                                mb-2
                            "
                        >
                            ¿Qué lesión tienes?
                        </label>

                        <input
                            id="lesion"
                            type="text"
                            placeholder="Ej. Rodilla, espalda, hombro..."
                            value={lesion}
                            onChange={(e) => setLesion(e.target.value)}
                            required
                            maxLength={25}
                            className="
                                w-full
                                bg-white
                                border-2
                                border-[#913c6d]
                                rounded-lg
                                px-4
                                py-3
                                outline-none
                                text-[#3d1230]
                                placeholder:text-gray-400
                                focus:border-[#c05b91]
                                focus:ring-2
                                focus:ring-[#c05b91]/30
                                transition
                            "
                        />

                        <p className="
                            text-xs
                            text-gray-600
                            mt-1
                        ">
                            Máximo 25 caracteres.
                        </p>

                    </div>

                )}

            </div>


            {/* BOTÓN */}
            <button
                type="submit"
                className="
                    w-full
                    bg-[#913c6d]
                    hover:bg-[#7b315b]
                    text-white
                    font-bold
                    text-lg
                    py-3
                    rounded-lg
                    transition
                    duration-200
                    hover:scale-[1.01]
                    active:scale-[0.99]
                    shadow-md
                "
            >
                Reservar
            </button>


            {/* MENSAJE */}
            {mensaje && (

                <div className="
                    mt-5
                    p-3
                    rounded-lg
                    bg-green-100
                    border-2
                    border-green-500
                    text-green-700
                    text-center
                    font-bold
                ">
                    {mensaje}
                </div>

            )}


            {/* ERROR */}
            {error && (

                <div className="
                    mt-5
                    p-3
                    rounded-lg
                    bg-red-100
                    border-2
                    border-red-500
                    text-red-700
                    text-center
                    font-bold
                ">
                    {error}
                </div>

            )}

        </form>
    );
}

export default ReservationForm;
