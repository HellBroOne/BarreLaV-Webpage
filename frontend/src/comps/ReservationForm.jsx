import { useState } from "react";
import { crearReserva } from "../service/api";

function ReservationForm({ claseId }) {
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [tieneLesion, setTieneLesion] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setMensaje("");
        setError("");

        try {
            const reserva = await crearReserva({
                clase: claseId,
                nombre: nombre,
                edad: Number(edad),
                tiene_lesion: tieneLesion,
            });

            console.log(reserva);

            setMensaje("¡Reserva realizada correctamente!");
            setNombre("");
            setEdad("");
            setTieneLesion(false);

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto bg-[#f0c4d5] border-2 border-[#913c6d] rounded-2xl p-6 md:p-8 shadow-lg"
        >

            {/* Nombre */}
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
                    className="w-full bg-white border-2 border-[#913c6d] rounded-lg px-4 py-3 outline-none text-[#3d1230] placeholder:text-gray-400 focus:border-[#c05b91] focus:ring-2 focus:ring-[#c05b91]/30 transition"
                />
            </div>


            {/* Edad */}
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
                    className="w-full bg-white border-2 border-[#913c6d] rounded-lg px-4 py-3 outline-none text-[#3d1230] placeholder:text-gray-400 focus:border-[#c05b91] focus:ring-2 focus:ring-[#c05b91]/30 transition"
                />
            </div>


            {/* Lesión */}
            <div className="mb-7">
                <p className="text-[#3d1230] font-bold text-lg mb-3">
                    ¿Tienes alguna lesión?
                </p>

                <div className="flex gap-4">

                    {/* Sí */}
                    <label
                        className={`flex-1 cursor-pointer border-2 rounded-lg p-3 text-center font-bold transition
                            ${
                                tieneLesion
                                    ? "bg-[#913c6d] text-white border-[#913c6d]"
                                    : "bg-white text-[#913c6d] border-[#913c6d] hover:bg-[#e8b1c8]"
                            }`}
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


                    {/* No */}
                    <label
                        className={`flex-1 cursor-pointer border-2 rounded-lg p-3 text-center font-bold transition
                            ${
                                !tieneLesion
                                    ? "bg-[#913c6d] text-white border-[#913c6d]"
                                    : "bg-white text-[#913c6d] border-[#913c6d] hover:bg-[#e8b1c8]"
                            }`}
                    >
                        <input
                            type="radio"
                            name="lesion"
                            checked={tieneLesion === false}
                            onChange={() => setTieneLesion(false)}
                            className="hidden"
                        />

                        No
                    </label>

                </div>
            </div>


            {/* Botón */}
            <button
                type="submit"
                className="w-full bg-[#913c6d] hover:bg-[#7b315b] text-white font-bold text-lg py-3 rounded-lg transition duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-md"
            >
                Reservar
            </button>


            {/* Mensaje */}
            {mensaje && (
                <div className="mt-5 p-3 rounded-lg bg-green-100 border-2 border-green-500 text-green-700 text-center font-bold">
                    {mensaje}
                </div>
            )}


            {/* Error */}
            {error && (
                <div className="mt-5 p-3 rounded-lg bg-red-100 border-2 border-red-500 text-red-700 text-center font-bold">
                    {error}
                </div>
            )}

        </form>
    );
}

export default ReservationForm;