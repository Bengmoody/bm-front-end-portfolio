import { useEffect, useState } from 'react'
import { getCategories } from './api';
import {Link} from 'react-router-dom'

function Categories() {
    const [categoryList, setCategoryList] = useState([])
    useEffect(() => {
        getCategories()
            .then((categories) => {
                setCategoryList(categories)
            })


    }, [])
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
                        <Link key={Math.random() * 10000} style={{textDecoration:"none",color: "black"}} to={`/reviews?category=${category.slug}`}>
                            <li key={Math.random() * 10000} className="categories-list__list__element--container">
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

export default Categories;