import Header from "../comps/Header";
import Footer from "../comps/Footer";
import CostCont from "../comps/Cost-cont";

function Costos() {
    return (
        <div className="min-h-screen bg-[#e2b6c9] flex flex-col">

            <Header />

            <main className="flex-1 pt-24">

                {/* TÍTULO */}
                <section className="px-4 py-8 md:px-8 lg:px-12">

                    <p className="text-4xl md:text-5xl lg:text-6xl font-lobster tracking-tight text-black">
                        COSTOS
                    </p>

                    <div className="mt-3 h-1 w-32 bg-[#7b1e4e] rounded-full"></div>

                </section>


                {/* INTRODUCCIÓN */}
                <section className="px-4 md:px-8 lg:px-12 pb-4">

                    <p className="lg:text-2xl md:text-xl text-md font-mina text-[#8b6250] font-bold">
                        Manejamos diferentes costos para las clases.
                        ¡Elige la que más se adapte a ti!
                    </p>

                    <p className="
                        mt-2
                        text-sm md:text-base
                        tracking-widest
                        text-[#8b6250]
                        uppercase
                    ">
                        - Los pagos se hacen solamente en el <span className="text-red-800 font-bold">local o con retiro sin tarjeta.</span>
                    </p>

                    <p className="
                        mt-2
                        text-sm md:text-base
                        tracking-widest
                        text-[#8b6250]
                        uppercase
                    ">
                       - Las cancelaciones se hacen con <span className="text-red-800 font-bold">12 horas de anticipaci&oacute;n.</span>
                    </p>

                    <p className="
                        mt-2
                        text-sm md:text-base
                        tracking-widest
                        text-[#8b6250]
                        uppercase
                        font-bold
                    ">
                       - Horarios del Estudio para pasar a pagar:
                    </p>

                    <p className="
                        mt-2
                        text-sm md:text-base
                        tracking-widest
                        text-[#8b6250]
                        uppercase
                        font-bold
                        pl-8
                    ">
                        Lunes a Viernes: 10 am a 3 pm y 5 pm a 8:30 pm
                    </p>

                    <p className="
                        mt-2
                        text-sm md:text-base
                        tracking-widest
                        text-[#8b6250]
                        uppercase
                        font-bold
                        pl-8
                    ">
                        S&aacute;bado: 8 am a 1 pm
                    </p>

                    <p className="
                        mt-2
                        text-sm md:text-base
                        tracking-widest
                        text-[#8b6250]
                        uppercase
                        font-bold
                        pl-8
                    ">
                        Domingo: 9 am a 1 pm
                    </p>

                </section>


                {/* PRECIOS */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-6 md:p-10 lg:p-12">

                    <CostCont
                        desc="Primera clase"
                        cost="50"
                        vig="Vigencia 1 día"
                        bg_color="bg-[#CE9ADB]"
                    />

                    <CostCont
                        desc="Clase suelta"
                        cost="80"
                        vig="Vigencia 2 días"
                        bg_color="bg-[#CE9ADB]"
                    />

                    <CostCont
                        desc="5 clases"
                        cost="375"
                        vig="Vigencia 10 días"
                        bg_color="bg-[#CE9ADB]"
                    />

                    <CostCont
                        desc="10 clases"
                        cost="700"
                        vig="Vigencia 30 días"
                        bg_color="bg-[#CE9ADB]"
                    />

                    <CostCont
                        desc="15 clases"
                        cost="975"
                        vig="Vigencia 30 días"
                        bg_color="bg-[#CE9ADB]"
                    />

                    <CostCont
                        desc="20 clases"
                        cost="1200"
                        vig="Vigencia 30 días"
                        bg_color="bg-[#CE9ADB]"
                    />

                </section>


                {/* NOTA */}
                <section className="text-center py-8 px-4">

                    <p className="
                        font-italianno
                        text-3xl
                        md:text-4xl
                        text-black
                        font-bold
                    ">
                        ¿Eres estudiante? ¡Presenta tu credencial!
                    </p>

                </section>

            </main>

            <Footer />

        </div>
    );
}

export default Costos;
