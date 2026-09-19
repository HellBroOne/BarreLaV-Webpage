function CostCont({ desc, cost, vig, bg_color }) {
    /*
                {/* Flechita 
            <div className="
                absolute
                right-5 bottom-5
                w-8 h-8
                rounded-full
                border border-[#4b2e20]/50
                flex items-center justify-center
                opacity-0
                translate-x-2
                transition-all duration-300
                group-hover:opacity-100
                group-hover:translate-x-0
            ">
                <span className="text-[#4b2e20]">→</span>
            </div>
    */

    return (
        <div
            className={`
                group relative overflow-hidden ${bg_color} rounded-2xl p-6 md:p-8 min-h-35 w-75 flex flex-col justify-between border border-black/10
                shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl
            `}
        >

            {/* Decoración */}
            <div className="
                absolute -right-10 -top-10
                w-32 h-32
                rounded-full
                bg-white/20
                transition-transform duration-500
                group-hover:scale-150
            " />

            <div className="
                absolute -left-8 -bottom-10
                w-24 h-24
                rounded-full
                bg-black/5
            " />

            {/* Contenido */}
            <div className="relative z-10 flex flex-col h-full">

                {/* Nombre */}
                <p className="
                    font-russo
                    text-lg md:text-xl
                    tracking-wide
                    text-[#4b2e20]
                    uppercase
                ">
                    {desc}
                </p>

                {/* Precio */}
                <div className="mt-auto">

                    <p className="
                        font-russo
                        text-4xl md:text-5xl
                        text-[#4b2e20]
                        tracking-tight
                    ">
                        ${cost}
                    </p>

                    {/* Vigencia */}
                    <p className="
                        mt-2
                        font-italianno
                        text-xl md:text-2xl
                        text-[#795548]
                        text-bold
                    ">
                        {vig}
                    </p>

                </div>
            </div>



        </div>
    )
}

export default CostCont;