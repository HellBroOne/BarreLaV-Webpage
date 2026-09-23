import { motion } from 'framer-motion';
import barrmain from "../assets/barr1.png";

function MainImg() {

    return (

        <div className="
            flex
            flex-col
            items-center
            justify-center
            h-[70vh]
            md:h-screen
        ">

            <img
                src={barrmain}
                alt="Barre LaV"
                className="
                    w-[150%]
                    md:w-[100%]
                    lg:w-[2500px]
                    h-auto
                    lg:translate-y-10
                "
            />

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    delay: 0.3
                }}
                className="
                    text-7xl
                    md:text-7xl
                    lg:text-9xl
                    font-bold
                    font-italianno
                    text-white
                    lg:-translate-y-75
                    -translate-y-35
                "
            >
                Barre <span className="text-[#521434]">LaV</span>
            </motion.h1>

            <motion.h3
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    delay: 0.6
                }}
                className="
                    lg:text-3xl
                    md:text-xl
                    text-xl
                    font-bold
                    tracking-tight
                    text-black
                    lg:-translate-y-85
                    -translate-y-40
                "
            >
                Movimiento con intención.
            </motion.h3>

        </div>
    )
}

export default MainImg;
