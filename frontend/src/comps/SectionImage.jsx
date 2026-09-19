//lg:-translate-y-75 -translate-y-130 
function sectionImage({title, body, image, className}){
    return (
        <section id="project-card" className="items-center gap-6">
            <div className={` flex flex-row lg:flex-row items-center gap-6 p-10 ${className}`}>
                <div className="flex-1 lg:p-8  rounded-sm ">
                    <p className="lg:text-2xl text-md font-bold text-white justify-left ">{title}</p>
                    <p className="lg:text-lg text-xs text-white justify-justify ">{body}</p>
                </div>
                <div>
                    <img src={image} className="flex-1 rounded-md lg:w-100 w-50  h-auto lg:-translate-x-15 "/>
                </div>
            </div>
        </section>
    )
}

export default sectionImage;