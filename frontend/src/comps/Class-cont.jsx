
function ClassCont({number, title, description, keyword}){
    return (
        <>
            <div 
            className="flex flex-col items-center lg:w-140  h-auto justify-center lg:p-5 p-1 border-2 border-[#170023] bg-[#d99afe] text-black hover:text-white hover:bg-[#400165] transition">
                <div className="flex items-center lg:gap-12 gap-4">
                    <p className="font-bold lg:text-5xl text-3xl font-russo">{number}</p>
                    <p className="font-bold lg:text-3xl text-xl font-russo">{title}</p>
                </div>
                <div className="flex-1 items-center justify-center lg:p-5 p-2">
                    <hr></hr>
                    <p className="flex flex-col text-center lg:text-lg text-sm">{description}</p>
                    <hr></hr>
                    <p className="flex flex-col text-center font-russo lg:text-xl text-md">{keyword}</p>
                </div>
            </div>
        </>
    )
}

export default ClassCont;