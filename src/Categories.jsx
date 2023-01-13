import { useEffect, useState } from 'react'
import { getCategories } from './api';
import { Link } from 'react-router-dom'
import ErrorPage from './ErrorPage';

function Categories() {
    const [categoryList, setCategoryList] = useState([])
    const [isError, setIsError] = useState(0)
    useEffect(() => {
        getCategories()
            .then((categories) => {
                setIsError(0)
                setCategoryList(categories)
            })
            .catch(() => {
                setIsError(1)
            })
    }, [])


    if (isError) {
        return (
            <ErrorPage code={isError} />
        )
    } else {
        return (
            <section className="categories-list__container">
                <p className="categories-list__description">
                    Here is a list of the game categories for which we currently hold reviews in our database.
                    <br /><br />
                    Please click one of the categories to see a list of reviews of that game type.
                </p>
                <ul className="categories-list__list">
                    {categoryList.map((category) => {
                        return (
                            <Link style={{ textDecoration: "none", color: "black" }} to={`/reviews?category=${category.slug}`}>
                                <li className="categories-list__list__element--container">
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
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </section>
        )
    }

}

export default Categories;