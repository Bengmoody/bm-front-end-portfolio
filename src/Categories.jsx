import { useEffect, useState } from 'react'
import { getCategories } from './api';
import { Link } from 'react-router-dom'
import ErrorPage from './ErrorPage';
import { motion } from 'framer-motion';

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
const loaderVariants = {
    initial: {
        scale: 1,
    },
    animate: {
        scale: [1,1.2,1,1.2],
        backgroundColor: ["#0af", "rgba(50,230,50,1)", "rgba(230,230,255,1)", "#fa0"],
        borderRadius: ["50%","25%","0%"],
        transition: {
            repeatType: "reverse",
            repeat: Infinity,
            duration: 1,
            ease: "easeIn"
        }
    }
}


function Categories() {
    const [categoryList, setCategoryList] = useState([])
    const [isError, setIsError] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        getCategories()
            .then((categories) => {
                setIsLoading(false)
                setIsError(0)
                setCategoryList(categories)
            })
            .catch(() => {
                setIsLoading(false)
                setIsError(1)
            })
    }, [])


    if (isError) {
        return (
            <ErrorPage code={isError} />
        )
    } else if (isLoading) {
        return (<motion.section variants={pageVariants} initial="initial" animate="animate" exit="exit" className="loading-container">
            <p className="loading-message">Loading...</p>
            <motion.div variants={loaderVariants} className="loader-ball" />
        </motion.section>)
        
    } else {
        return (
            <motion.section
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit" 
             className="categories-list__container">
                <p className="categories-list__description">
                    Here is a list of the game categories for which we currently hold reviews in our database.
                    <br /><br />
                    Please click one of the categories to see a list of reviews of that game type.
                </p>
                <ul className="categories-list__list">
                    {categoryList.map((category) => {
                        return (
                            <Link style={{ textDecoration: "none", color: "black" }} to={`/reviews?category=${category.slug}`}>
                                <motion.li 
                                whileHover={{
                                    scale: 1.1,
                                    boxShadow: "0px 0px 5px 5px aquamarine inset, 0px 0px 5px 5px grey",
                                    transition: {
                                        duration: 0.3,
                                        repeatType: "reverse",
                                        repeat: Infinity
                                    }
                                }}
                                className="categories-list__list__element--container">
                                    <div className="categories-list__list__element--slug--container">
                                        <p className="categories-list__list__element--slug--body">
                                            {category.slug.split("-").join(" ").toUpperCase()}
                                        </p>
                                    </div>
                                    <div className="categories-list__list__element--description--container">
                                        <p className="categories-list__list__element--slug--body">
                                            {category.description}
                                        </p>
                                    </div>
                                </motion.li>
                            </Link>
                        )
                    })}
                </ul>
            </motion.section>
        )
    }

}

export default Categories;