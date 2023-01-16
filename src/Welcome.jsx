import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import { useEffect, useState } from "react"

const pageVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 2
        }
    },
    exit: {
        opacity: 0,
        transition: { duration: 1 }
    }
}

function Welcome() {
    
        return (
            <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="welcome">
                <p>Welcome to the portfolio website of Benjamin Moody.</p>
                <p>This is a hosted version of my Github repository, with a comprehensive read-me,<br /> found by clicking the link below: <br /></p>
                <p style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "400px" }}><span>Front-end repo: </span><a href="https://github.com/Bengmoody/bm-front-end-portfolio" target="_blank" alt="link to Github repository"><motion.img className="welcome__image" src="25231.png" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} /></a></p>
                <p>This website is a front-end for a hosted API, also created by Benjamin Moody. <br /> </p>
                <p> The back-end Github repository, is available by clicking the link below:</p>
                <p style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "400px" }}><span>Back-end repo: </span><a href="https://github.com/Bengmoody/bm-back-portfolio" target="_blank" alt="link to Github repository"><motion.img className="welcome__image" src="25231.png" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} /></a></p>
                <p style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "400px" }}><span>Hosted back-end: </span><a href="https://bmoody-portfolio.onrender.com/api" target="_blank" alt="link to Github repository"><motion.img style={{ width: "175px", height: "175px" }} className="welcome__image" src="oNKK_fVe_400x400.jpg" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} /></a></p>
                <p className="welcome__nb" >N.B. I recommend downloading a JSON viewer plugin for your preferred browser if accessing the hosted API from your browser.</p>
            </motion.div>
        )
    }


export default Welcome