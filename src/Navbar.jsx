import {Link} from 'react-router-dom'
import { motion } from 'framer-motion';

const navbarVariants = {
    hidden: {
        opacity: 0,
        scale: 1.2,
        border: "none"
    },
    visible: {
        opacity: 1,
        scale: 1,
        border: "1px solid black",
        transition: {
            duration: 2,
            staggerChildren: 1.0,
            border: {
                delay: 1.75,
            }
        },
        
    }
}

const linkVariants = {
    hidden: {
        opacity: 0,
        scale: 1.2,
        rotate: -45
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            opacity: {duration: 1,
            delay: 0.5},
            rotate: {duration: 1,
                delay: 0.5}
        },
        
    },
    hover: {
        backgroundColor: "grey",
        color: "rgb(255,255,255)",
        borderRadius: "20px",
        color: "white",
        border: "2px solid white",
        scale: 1.1,
        
    },
    click: {
        scale: 0.8,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 30     
        }
    }

}

function Navbar({setClickListener}) {
    const handleOnClick = (e) => {
        setClickListener((currValue) => {
            return !currValue;
        })
    }
    return (
        <motion.nav variants={navbarVariants} whileTap="click" whileHover="hover" initial="hidden" animate="visible" className="navbar">
            <motion.div variants={linkVariants} initial="hidden" animate="visible" whileTap="click" whileHover="hover" className="navbar__link--box"><Link style={{textDecoration: "none", color: "black"}} to="/reviews" onClick={handleOnClick}><span className="navbar__link--text">Reviews</span></Link></motion.div>
            {/* All the rest of these links are placeholders, for now */}
            <motion.div variants={linkVariants} initial="hidden" animate="visible" whileTap="click" whileHover="hover" className="navbar__link--box"><Link to="/categories" style={{textDecoration: "none", color: "black"}}><span className="navbar__link--text">Categories</span></Link></motion.div>
            <motion.div variants={linkVariants} initial="hidden" animate="visible" whileTap="click" whileHover="hover" className="navbar__link--box"><Link to="/reviews" style={{textDecoration: "none", color: "black"}}><span className="navbar__link--text">Users</span></Link></motion.div>
            <motion.div variants={linkVariants} initial="hidden" animate="visible" whileTap="click" whileHover="hover" className="navbar__link--box"><Link to="/reviews" style={{textDecoration: "none", color: "black"}}><span className="navbar__link--text">Add review</span></Link></motion.div>
            <motion.div variants={linkVariants} initial="hidden" animate="visible" whileTap="click" whileHover="hover" className="navbar__link--box"><Link to="/reviews" style={{textDecoration: "none", color: "black"}}><span className="navbar__link--text">About</span></Link></motion.div>
        </motion.nav>
    )


}

export default Navbar;