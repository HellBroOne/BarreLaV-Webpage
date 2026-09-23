import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../comps/Header";
import Footer from "../comps/Footer";

function Admin() {
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(true);
    const [cargandoReservas, setCargandoReservas] = useState(true);
    const [usuario, setUsuario] = useState("");
    const [reservas, setReservas] = useState([]);
    const [error, setError] = useState("");
    const [editando, setEditando] = useState(null);
    const [formulario, setFormulario] = useState({
        nombre: "",
        edad: "",
        tiene_lesion: false,
    });


    // --------------------------------
    // Cargar panel
    // --------------------------------

    useEffect(() => {

        async function cargarPanel() {
            const access = localStorage.getItem("access");
            if (!access) {
                navigate("/admin/login");
                return;
            }

            try {
                // --------------------------------
                // 1. Verificar sesión
                // --------------------------------

                const usuarioResponse = await fetch(
                    `${import.meta.env.VITE_API_URL}/usuario/`,
                    {
                        headers: {
                            Authorization: `Bearer ${access}`,
                        },
                    }
                );


                if (!usuarioResponse.ok) {
                    throw new Error("Sesión inválida");
                }

                const usuarioData = await usuarioResponse.json();
                setUsuario(usuarioData.usuario);

                // --------------------------------
                // 2. Obtener reservas
                // --------------------------------
                const reservasResponse = await fetch(
                    `${import.meta.env.VITE_API_URL}/admin/reservas/`,
                    {
                        headers: {
                            Authorization: `Bearer ${access}`,
                        },
                    }
                );

                if (!reservasResponse.ok) {

                    throw new Error(
                        "No se pudieron obtener las reservas"
                    );

                }

                const reservasData = await reservasResponse.json();
                setReservas(reservasData);
            } catch (error) {
                console.error(error);
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                navigate("/admin/login");
                return;
            } finally {
                setCargando(false);
                setCargandoReservas(false);
            }
        }

        cargarPanel();

    }, [navigate]);


    // --------------------------------
    // Eliminar reserva
    // --------------------------------

    async function eliminarReserva(id) {

        const confirmar = window.confirm(
            "¿Seguro que quieres eliminar esta reserva?"
        );


        if (!confirmar) {

            return;

        }


        const access = localStorage.getItem("access");


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/reservas/${id}/`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                }
            );


            if (!response.ok) {

                if (response.status === 401) {

                    localStorage.removeItem("access");

                    localStorage.removeItem("refresh");

                    navigate("/admin/login");

                    return;

                }


                throw new Error(
                    "No se pudo eliminar la reserva"
                );

            }


            setReservas((reservasActuales) =>
                reservasActuales.filter(
                    (reserva) => reserva.id !== id
                )
            );


        } catch (error) {

            console.error(error);

            alert(
                "Ocurrió un error al eliminar la reserva."
            );

        }

    }


    // --------------------------------
    // Comenzar edición
    // --------------------------------

    function comenzarEdicion(reserva) {

        setEditando(reserva.id);

        setFormulario({

            nombre: reserva.nombre,

            edad: reserva.edad,

            tiene_lesion: reserva.tiene_lesion,

        });

    }


    // --------------------------------
    // Cancelar edición
    // --------------------------------

    function cancelarEdicion() {

        setEditando(null);

        setFormulario({

            nombre: "",

            edad: "",

            tiene_lesion: false,

        });

    }


    // --------------------------------
    // Modificar reserva
    // --------------------------------

    async function modificarReserva(id) {

        const access = localStorage.getItem("access");


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/reservas/${id}/`,
                {
                    method: "PATCH",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${access}`,

                    },

                    body: JSON.stringify({

                        nombre: formulario.nombre,

                        edad: Number(formulario.edad),

                        tiene_lesion: formulario.tiene_lesion,

                    }),
                }
            );


            if (!response.ok) {

                if (response.status === 401) {

                    localStorage.removeItem("access");

                    localStorage.removeItem("refresh");

                    navigate("/admin/login");

                    return;

                }


                const data = await response.json();


                throw new Error(
                    data.error ||
                    "No se pudo modificar la reserva"
                );

            }


            const reservaActualizada =
                await response.json();


            setReservas((reservasActuales) =>

                reservasActuales.map((reserva) =>

                    reserva.id === id
                        ? reservaActualizada
                        : reserva

                )

            );


            setEditando(null);


        } catch (error) {

            console.error(error);

            alert(
                error.message ||
                "Ocurrió un error al modificar la reserva."
            );

        }

    }


    // --------------------------------
    // Cargando
    // --------------------------------

    if (cargando) {

        return (

            <div className="min-h-screen bg-[#e2b6c9] flex items-center justify-center">

                <p className="text-[#3d1230] font-bold text-xl">

                    Verificando sesión...

                </p>

            </div>

        );

    }


    return (

        <div className="bg-[#e2b6c9] flex flex-col w-full min-h-screen">

            <Header />


            <main className="flex-1 pt-24 px-4 md:px-8 pb-16">

                <div className="max-w-6xl mx-auto">


                    {/* Encabezado */}

                    <div className="mb-8">

                        <h1 className="text-3xl md:text-4xl font-bold text-[#3d1230]">

                            Panel de administración

                        </h1>


                        <p className="mt-2 text-[#913c6d] text-lg">

                            Bienvenida, {usuario}

                        </p>

                    </div>



                    {/* Reservas */}

                    <section>

                        <div className="bg-[#f0c4d5] border-2 border-[#913c6d] rounded-2xl p-6 shadow-lg">


                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

                                <h2 className="text-2xl font-bold text-[#3d1230]">

                                    Reservas

                                </h2>


                                <span className="text-[#913c6d] font-bold">

                                    {reservas.length} reserva

                                    {reservas.length !== 1
                                        ? "s"
                                        : ""}

                                </span>

                            </div>



                            {cargandoReservas && (

                                <p className="text-[#5c2947]">

                                    Cargando reservas...

                                </p>

                            )}



                            {!cargandoReservas &&
                                reservas.length === 0 && (

                                    <div className="bg-white rounded-xl p-6 text-center">

                                        <p className="text-[#5c2947] font-semibold">

                                            No hay reservas registradas.

                                        </p>

                                    </div>

                                )}



                            {!cargandoReservas &&
                                reservas.length > 0 && (

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">


                                        {reservas.map((reserva) => (


                                            <div
                                                key={reserva.id}
                                                className="bg-white border-2 border-[#913c6d] rounded-xl p-5 shadow-sm"
                                            >


                                                {editando === reserva.id ? (


                                                    // --------------------------------
                                                    // FORMULARIO DE EDICIÓN
                                                    // --------------------------------

                                                    <div>


                                                        <div className="flex items-center justify-between mb-5">

                                                            <h3 className="text-xl font-bold text-[#3d1230]">

                                                                Modificar reserva

                                                            </h3>


                                                            <span className="text-sm font-bold text-[#913c6d]">

                                                                #{reserva.id}

                                                            </span>

                                                        </div>



                                                        {/* Nombre */}

                                                        <div className="mb-4">

                                                            <label className="block text-[#3d1230] font-bold mb-1">

                                                                Nombre

                                                            </label>


                                                            <input
                                                                type="text"
                                                                value={formulario.nombre}
                                                                onChange={(e) =>
                                                                    setFormulario({
                                                                        ...formulario,
                                                                        nombre: e.target.value,
                                                                    })
                                                                }
                                                                className="w-full border-2 border-[#913c6d] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#c05b91]/30"
                                                            />

                                                        </div>

                                                        {/* Edad */}
                                                        <div className="mb-4">
                                                            <label className="block text-[#3d1230] font-bold mb-1">
                                                                Edad
                                                            </label>

                                                            <input
                                                                type="number"
                                                                min="1"
                                                                value={formulario.edad}
                                                                onChange={(e) =>
                                                                    setFormulario({
                                                                        ...formulario,
                                                                        edad: e.target.value,
                                                                    })
                                                                }
                                                                className="w-full border-2 border-[#913c6d] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#c05b91]/30"
                                                            />
                                                        </div>

                                                        {/* Lesión */}
                                                        <div className="mb-5">
                                                            <p className="text-[#3d1230] font-bold mb-2">
                                                                ¿Tiene lesión?
                                                            </p>


                                                            <div className="flex gap-5">


                                                                <label className="flex items-center gap-2 text-[#5c2947]">

                                                                    <input
                                                                        type="radio"
                                                                        name={`lesion-${reserva.id}`}
                                                                        checked={
                                                                            formulario.tiene_lesion === true
                                                                        }
                                                                        onChange={() =>
                                                                            setFormulario({
                                                                                ...formulario,
                                                                                tiene_lesion: true,
                                                                            })
                                                                        }
                                                                    />

                                                                    Sí

                                                                </label>



                                                                <label className="flex items-center gap-2 text-[#5c2947]">

                                                                    <input
                                                                        type="radio"
                                                                        name={`lesion-${reserva.id}`}
                                                                        checked={
                                                                            formulario.tiene_lesion === false
                                                                        }
                                                                        onChange={() =>
                                                                            setFormulario({
                                                                                ...formulario,
                                                                                tiene_lesion: false,
                                                                            })
                                                                        }
                                                                    />

                                                                    No

                                                                </label>


                                                            </div>

                                                        </div>



                                                        {/* Botones */}

                                                        <div className="flex gap-3">


                                                            <button
                                                                onClick={() =>
                                                                    modificarReserva(
                                                                        reserva.id
                                                                    )
                                                                }
                                                                className="flex-1 bg-[#913c6d] hover:bg-[#7b315b] text-white font-bold py-2 px-4 rounded-lg transition hover:cursor-pointer"
                                                            >

                                                                Guardar

                                                            </button>

                                                            <button
                                                                onClick={cancelarEdicion}
                                                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-[#3d1230] font-bold py-2 px-4 rounded-lg transition hover:cursor-pointer"
                                                            >
                                                                Cancelar
                                                            </button>


                                                        </div>


                                                    </div>


                                                ) : (
                                                    // --------------------------------
                                                    // VISTA NORMAL
                                                    // --------------------------------
                                                    <>
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h3 className="text-xl font-bold text-[#3d1230]">
                                                                {reserva.nombre}
                                                            </h3>

                                                            <span className="text-sm font-bold text-[#913c6d]">

                                                                #{reserva.id}

                                                            </span>

                                                        </div>



                                                        <div className="space-y-2 text-[#5c2947]">

                                                            <p>

                                                                <strong>Edad:</strong>{" "}

                                                                {reserva.edad}

                                                            </p>


                                                            <p>

                                                                <strong>Lesión:</strong>{" "}

                                                                {reserva.tiene_lesion
                                                                    ? "Sí"
                                                                    : "No"}
                                                            </p>
                                                            
                                        <div className="mt-4 pt-4 border-t border-[#e2b6c9]">
                                            <h4 className="font-bold text-[#3d1230] mb-1">
                                                Información de la clase
                                            </h4>

                                            <div className="space-y-1 text-[#5c2947]">

                                                <p>
                                                    <strong>Tipo:</strong>{" "}
                                                    {reserva.clase_info.tipo}
                                                </p>

                                                <p>
                                                    <strong>Enfoque:</strong>{" "}
                                                    {reserva.clase_info.enfoque}
                                                </p>

                                                <p>
                                                    <strong>Fecha:</strong>{" "}
                                                    {new Date(
                                                        `${reserva.clase_info.fecha_completa}T00:00:00`
                                                    ).toLocaleDateString("es-MX", {
                                                        weekday: "long",
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </p>

                                                <p>
                                                    <strong>Horario:</strong>{" "}
                                                    {reserva.clase_info.hora} -{" "}
                                                    {reserva.clase_info.hora_fin}
                                                </p>

                                            </div>
                                        </div>


                                                            <p className="text-sm text-gray-500">

                                                                Reserva realizada:
                                                                {" "}

                                                                {new Date(
                                                                    reserva.fecha_reserva
                                                                ).toLocaleString(
                                                                    "es-MX"
                                                                )}

                                                            </p>

                                                        </div>



                                                        {/* Botones */}

                                                        <div className="flex gap-3 mt-5">


                                                            <button
                                                                onClick={() =>
                                                                    comenzarEdicion(
                                                                        reserva
                                                                    )
                                                                }
                                                                className="flex-1 bg-[#913c6d] hover:bg-[#7b315b] text-white font-bold py-2 px-4 rounded-lg transition hover:cursor-pointer"
                                                            >

                                                                Modificar

                                                            </button>



                                                            <button
                                                                onClick={() =>
                                                                    eliminarReserva(
                                                                        reserva.id
                                                                    )
                                                                }
                                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition hover:cursor-pointer"
                                                            >

                                                                Eliminar

                                                            </button>


                                                        </div>


                                                    </>

                                                )}

                                            </div>

                                        ))}

                                    </div>

                                )}

                        </div>

                    </section>

                </div>

            </main>


            <Footer />

        </div>

    );

}

export default Admin;
