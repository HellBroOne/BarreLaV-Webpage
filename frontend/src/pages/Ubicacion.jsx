import Header from "../comps/Header";
import Footer from "../comps/Footer";

import { FaLocationDot } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import qr from "../assets/barre-qr.png";

function Ubicacion() {
    return (
        <div className="min-h-screen bg-[#e2b6c9] flex flex-col">

            <Header />

            <main className="flex-1 pt-24">

                {/* TÍTULO */}
                <section className="px-4 py-8 md:px-8 lg:px-12">
                    <p className="text-4xl md:text-5xl lg:text-6xl font-lobster tracking-tight text-black">
                        UBICACIÓN Y CONTACTO
                    </p>

                    <div className="mt-3 h-1 w-32 bg-[#7b1e4e] rounded-full"></div>
                </section>


                {/* UBICACIÓN */}
                <section className="bg-[#fe9aab] px-5 py-10 md:px-10 lg:px-16">

                    <div className="max-w-7xl mx-auto">
                        {/* ENCABEZADO */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#7b1e4e] text-white shadow-lg">
                                <FaLocationDot size={28} />
                            </div>
                            <div>
                                <p className="text-2xl md:text-3xl font-russo text-black">
                                    VISÍTANOS
                                </p>
                                <p className="text-sm md:text-base text-[#5c2947]">
                                    Encuéntranos en el centro de Valparaíso
                                </p>
                            </div>
                        </div>


                        {/* CONTENIDO */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                            {/* INFORMACIÓN */}
                            <div className="bg-[#ffd2dd] rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-center">
                                <p className="text-xl md:text-2xl font-russo text-black mb-4">
                                    Frente al Jardín Municipal
                                </p>
                                <p className="text-base md:text-lg text-black leading-relaxed">
                                    Colonia Centro, frente al jardín municipal.
                                    <br />
                                    A un costado de Farmacia Guadalajara.
                                </p>
                                <div className="mt-8">
                                    <div className="inline-flex items-center gap-2 bg-[#7b1e4e] text-white px-4 py-2 rounded-full text-sm md:text-base">
                                        <FaLocationDot />
                                        <span>Constitución #123</span>
                                    </div>
                                </div>
                            </div>


                            {/* MAPA */}
                            <div className="rounded-2xl overflow-hidden shadow-xl min-h-[300px] lg:min-h-[380px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325.16576030703453!2d-103.56706980750673!3d22.771666128174743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869d2aea83b10005%3A0x45d759a8fbc80eff!2sConstituci%C3%B3n%20123%2C%20Centro%2C%2099250%20Valpara%C3%ADso%2C%20Zac.!5e0!3m2!1ses!2smx!4v1789614999528!5m2!1ses!2smx"
                                    title="Ubicación de Barre LaV"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>


                {/* INSTAGRAM */}
                <section className="bg-[#fe67ad] px-5 py-12 md:px-10 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                            {/* INFORMACIÓN */}
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-black text-white shadow-lg">
                                        <FaInstagram size={30} />
                                    </div>
                                    <div>
                                        <p className="text-2xl md:text-3xl font-russo text-black">
                                            SÍGUENOS
                                        </p>
                                        <p className="text-sm md:text-base text-[#4a1230]">
                                            Conoce más de Barre LaV
                                        </p>
                                    </div>
                                </div>

                                <p className="text-base md:text-lg text-black leading-relaxed mb-6">
                                    Síguenos en Instagram para conocer nuestras
                                    clases, horarios, novedades y contenido.
                                </p>

                                <a
                                    href="https://www.instagram.com/barre_lav/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-[#4a1230] transition-all duration-300 hover:scale-105 shadow-lg"
                                >
                                    <FaInstagram size={22} />
                                    @barre_lav
                                    <FaArrowUpRightFromSquare size={15} />
                                </a>
                            </div>

                            {/* QR */}
                            <div className="flex flex-col items-center justify-center">
                                <div className="bg-white p-5 rounded-2xl shadow-xl">
                                    <img
                                        src={qr}
                                        alt="Código QR para la página de Instagram de Barre LaV"
                                        className="w-48 h-48 md:w-56 md:h-56 object-contain"
                                    />
                                </div>
                                <p className="mt-4 text-sm md:text-base font-bold text-black text-center">
                                    Escanea el código para visitarnos
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* FRASE FINAL */}
                <section className="bg-[#e2b6c9] px-5 py-12 text-center">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-lobster text-[#521434]">
                        Tu próximo entrenamiento comienza aquí.
                    </p>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Ubicacion;
