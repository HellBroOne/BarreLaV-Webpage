import { FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-[#8C406B] min-h-[235px] px-12 py-10 flex flex-col justify-between text-white">

            {/* Parte superior */}
            <div>
                <h2 className="text-3xl md:text-5xl font-bold  font-italianno tracking-tight">
                    Barre <span className="text-[#521434]">LaV</span>
                </h2>

                <p className="text-base md:text-lg font-medium mt-1">
                    2026 Todos los derechos reservados.
                </p>

                {/* Instagram */}
                <a
                    href="https://www.instagram.com/barre_lav/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 hover:opacity-60 transition-opacity"
                >
                    <FaInstagram className="text-2xl" />
                </a>
            </div>


        </footer>
    );
}

export default Footer;