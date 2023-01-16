
import { useEffect,useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useAnimationControls } from "framer-motion"
function Landing() {

    const [waitComplete, setWaitComplete] = useState(false)
    const [clickToEnter, setClickToEnter] = useState(false)
    const logoControl = useAnimationControls()

    const logoVariants={
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        transition: {
            duration: 5
        }}
    }
    useEffect(() => {
        logoControl.start("animate")
        .then(() => {
            setTimeout(() => {setWaitComplete(true)},3000)
        })
        

    }, [])
    return (
        <div>
            <AnimatePresence>
            { !clickToEnter && (
            <motion.div className="first-load-overlay" key="overlay-div" exit={{opacity: 0,transition: {duration: 1}}}>
                <motion.img layout variants={logoVariants} initial="initial" animate="animate" transition={{type:"spring",stiffness: 700, damping: 30}} className="landing-logo" src="untitled-2.svg"/>

                
                {waitComplete && (<motion.p onClick={() => {setClickToEnter(true)}} whileHover={{scale: 1.2,color: "rgb(150,150,150)",transition:{duration: 1,repeatType:"reverse",repeat:Infinity}}}initial={{y:"-500vh"}} animate={{y:0}} className="landing-text">Click to enter</motion.p>)}

            </motion.div>
            )}
            </AnimatePresence>
        
        </div>
    )
}

export default Landing