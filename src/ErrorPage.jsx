import { motion } from "framer-motion"

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

function ErrorPage({ code }) {
    if (code >=500 ) {
        return (
            <motion.section 
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit" 
            className="error-handler__server">
                <p className="error-handler__server--message">
                    There is a problem with our server. <br />
                    The data needed for this page is currently unavailable. <br />
                    Please utilise the links in the navigation section above to try <br />
                    the other parts of our page.
                </p>
            </motion.section>
        )
    } else {

        return (
            <motion.section
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit" 
            className="error-handler__user">
                <p className="error-handler__user--message">
                    The page you have tried to access does not exist. <br />
                    Please utilise the links in the navigation section above to return to <br />
                    functional parts of the page.
                </p>
            </motion.section>
        )

    }

}


export default ErrorPage