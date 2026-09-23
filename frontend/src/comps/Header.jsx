import { useState } from "react";
import { FiMenu, FiX, FiLogOut, FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Comprobar si hay una sesión de recepción
    const access = localStorage.getItem("access");
    const estaAutenticado = !!access;

    const links = [
        { name: "INICIO", to: "/" },
        { name: "CLASES", to: "/clases" },
        { name: "COSTOS", to: "/costos" },
        { name: "UBICACION", to: "/ubicacion" },
    ];

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    function cerrarSesion() {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setIsOpen(false);
        navigate("/");
    }

    return (
        <header className="fixed top-0 left-0 z-50 w-full border-b border-white bg-[#8C406B] backdrop-blur-md">

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={handleLinkClick}
                    className="text-5xl font-bold font-italianno tracking-tight text-white"
                >
                    Barre <span className="text-[#521434]">LaV</span>
                </Link>

                {/* Menú desktop */}
                <div className="hidden items-center gap-6 md:flex">

                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className="text-sm font-medium text-white transition-colors hover:text-[#fe9ac9]"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Panel de administración */}
                    {estaAutenticado && (
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#fe9ac9]"
                        >
                            <FiSettings />
                            PANEL ADMIN
                        </Link>
                    )}

                    {/* Reserva */}
                    <Link
                        to="/horarios"
                        className="rounded-lg bg-[#c56d93] px-4 py-2 text-md font-semibold text-white transition hover:bg-[#6d2c48]"
                    >
                        Reserva ahora!
                    </Link>

                    {/* Cerrar sesión */}
                    {estaAutenticado && (
                        <button
                            type="button"
                            onClick={cerrarSesion}
                            className="flex items-center gap-2 rounded-lg border border-white/40 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            <FiLogOut />
                            Salir
                        </button>
                    )}

                </div>

                {/* Botón móvil */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-lg p-2 text-white transition hover:bg-zinc-100/20 md:hidden"
                    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? (
                        <FiX className="h-6 w-6" />
                    ) : (
                        <FiMenu className="h-6 w-6" />
                    )}
                </button>

            </nav>

            {/* Menú móvil */}
            <div
                className={`overflow-hidden border-t border-zinc-200 bg-[#8C406B] transition-all duration-300 md:hidden ${
                    isOpen
                        ? "max-h-[600px] opacity-100"
                        : "max-h-0 border-transparent opacity-0"
                }`}
            >

                <div className="mx-auto flex max-w-7xl flex-col px-5 py-3">

                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            onClick={handleLinkClick}
                            className="border-b border-zinc-100 py-4 text-md font-medium text-white transition-colors hover:text-[#fe9ac9]"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Panel de administración móvil */}
                    {estaAutenticado && (
                        <Link
                            to="/admin"
                            onClick={handleLinkClick}
                            className="flex items-center justify-center gap-2 border-b border-zinc-100 py-4 text-md font-semibold text-white transition-colors hover:text-[#fe9ac9]"
                        >
                            <FiSettings />
                            PANEL ADMIN
                        </Link>
                    )}

                    {/* Reserva */}
                    <Link
                        to="/horarios"
                        onClick={handleLinkClick}
                        className="my-3 rounded-lg bg-[#c56d93] px-4 py-3 text-center text-md font-semibold text-white transition hover:bg-[#6d2c48]"
                    >
                        Reserva ahora!
                    </Link>

                    {/* Cerrar sesión móvil */}
                    {estaAutenticado && (
                        <button
                            type="button"
                            onClick={cerrarSesion}
                            className="mb-2 flex items-center justify-center gap-2 rounded-lg border border-white/40 px-4 py-3 text-md font-semibold text-white transition hover:bg-white/10"
                        >
                            <FiLogOut />
                            Cerrar sesión
                        </button>
                    )}

                </div>

            </div>

        </header>
    );
}

export default Header;

