import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");
        setCargando(true);

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/token/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        username: usuario,
                        password: password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    "Usuario o contraseña incorrectos"
                );
            }

            console.log("Login correcto:", data);

            localStorage.setItem(
                "access",
                data.access
            );

            localStorage.setItem(
                "refresh",
                data.refresh
            );

            navigate("/admin");

        } catch (error) {

            setError(error.message);

        } finally {

            setCargando(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#e2b6c9] flex items-center justify-center px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-[#f0c4d5] border-2 border-[#913c6d] rounded-2xl p-6 md:p-8 shadow-lg"
            >

                <h1 className="text-3xl font-bold text-[#3d1230] text-center mb-2">
                    Barre LaV
                </h1>

                <p className="text-center text-[#913c6d] mb-8">
                    Administración de reservas
                </p>

                {/* Usuario */}

                <div className="flex flex-col gap-2 mb-5">

                    <label
                        htmlFor="usuario"
                        className="text-[#3d1230] font-bold"
                    >
                        Usuario
                    </label>

                    <input
                        id="usuario"
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                        className="w-full bg-white border-2 border-[#913c6d] rounded-lg px-4 py-3 outline-none text-[#3d1230] focus:border-[#c05b91] focus:ring-2 focus:ring-[#c05b91]/30"
                    />

                </div>

                {/* Contraseña */}

                <div className="flex flex-col gap-2 mb-6">

                    <label
                        htmlFor="password"
                        className="text-[#3d1230] font-bold"
                    >
                        Contraseña
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-white border-2 border-[#913c6d] rounded-lg px-4 py-3 outline-none text-[#3d1230] focus:border-[#c05b91] focus:ring-2 focus:ring-[#c05b91]/30"
                    />

                </div>

                {/* Error */}

                {error && (
                    <div className="mb-5 p-3 rounded-lg bg-red-100 border-2 border-red-500 text-red-700 text-center font-bold">
                        {error}
                    </div>
                )}

                {/* Botón */}

                <button
                    type="submit"
                    disabled={cargando}
                    className="w-full bg-[#913c6d] hover:bg-[#7b315b] disabled:opacity-60 text-white font-bold text-lg py-3 rounded-lg transition"
                >
                    {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>

            </form>

        </div>
    );
}

export default AdminLogin;