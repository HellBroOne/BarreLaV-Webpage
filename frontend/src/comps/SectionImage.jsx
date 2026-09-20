function SectionImage({ title, body, image, className }) {
    return (
        <section id="project-card" className="w-full">
            <div className={`flex flex-col-reverse lg:flex-row items-center justify-between gap-8 p-6 md:p-10 lg:p-12 ${className}`}>
                {/* Texto */}
                <div className="flex-1 text-center lg:text-left space-y-3">
                    <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white uppercase tracking-wide">
                        {title}
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg text-white/90 leading-relaxed text-justify lg:text-left">
                        {body}
                    </p>
                </div>
                
                {/* Imagen */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img 
                        src={image} 
                        alt={title}
                        className="w-48 sm:w-56 lg:w-72 max-w-[200px] sm:max-w-xs h-auto rounded-md object-cover shadow-sm"
                    />
                </div>
            </div>
        </section>
    );
}

export default SectionImage;