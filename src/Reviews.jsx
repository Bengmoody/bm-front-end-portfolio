import { useEffect, useState } from 'react'
import { getReviews } from './api'
import { Link } from 'react-router-dom'
import { formatDate } from './utils'
import ErrorPage from './ErrorPage'

import { useSearchParams } from 'react-router-dom'

function Reviews({ clickListener }) {
    const [reviewList, setReviewList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const [displayParams, setDisplayParams] = useState({})
    const category = searchParams.get('category')
    const sort_by = searchParams.get('sort_by')
    const order = searchParams.get('order')

    const handleSortOnClick = (e) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set("sort_by", e.target.value)
        setSearchParams(newParams);
    }
    const handleOrderOnClick = (e) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set("order", e.target.value)
        setSearchParams(newParams);
    }
    useEffect(() => {
        setIsLoading(true)
        setDisplayParams(() => {
            const params = {}
            if (category) {
                params["category"] = category.split("-").join(" ").toUpperCase()
            } else {
                params["category"] = ""
            }
            if (sort_by) {
                params["sort_by"] = sort_by.split("_").join(" ").toUpperCase()
            } else {
                params["sort_by"] = ""
            }
            if (order) {
                params["order"] = order.toUpperCase()
            } else {
                params["order"] = ""
            }
            return params
        })
        getReviews(category, sort_by, order).then(({ reviews }) => {
            setReviewList(reviews)
            setIsError(0)
            setIsLoading(false)
        })
        .catch((code) => {
            setIsError(code)
            setIsLoading(false)
        })

    }, [clickListener, searchParams])

    if (isError !== 0) {
        return (
            <ErrorPage code={isError} />
        )
    }
    return isLoading ?
        (<section className="loading-container">
            <p className="loading-message">Loading...</p>
            <p className="rocket loading-rocket">
                <br />
                ⌛
            </p>
        </section>)
        :
        (
            <section className="reviews">
                <div className="reviews__header"><h2>Reviews</h2>
                    <p className={displayParams.category !== "" ? "category-present" : "hide-category-present"}>These reviews are for category: {displayParams.category}</p>
                    <p>Please click a review_id to view more details for that review:</p>
                    <div className="reviews__header__query">
                        <h3 className="reviews__header__query-form--title">Queries</h3>
                        <form className={"reviews__header__query-form sort"}>
                            <p className="reviews__header__query-form--command">Click to sort by:</p>
                            <section className="reviews__header__query-form__sort__list--container">
                                <div className="reviews__header__query-form__sort__element--container">
                                    <label htmlFor="sort-by-date">Created at (date)</label>
                                    <input id="sort-by-date" onClick={handleSortOnClick} name="sort-by" className="reviews__header__query-form__sort__element--input" value="created_at" type="radio" />
                                </div>
                                <div className="reviews__header__query-form__sort__element--container">
                                    <label htmlFor="sort-by-comment_count">Comment count</label>
                                    <input id="sort-by-comment_count" onClick={handleSortOnClick} name="sort-by" className="reviews__header__query-form__sort__element--input" value="comment_count" type="radio" />
                                </div>
                                <div className="reviews__header__query-form__sort__element--container">
                                    <label htmlFor="sort-by-votes">Votes</label>
                                    <input id="sort-by-votes" onClick={handleSortOnClick} name="sort-by" className="reviews__header__query-form__sort__element--input" value="votes" type="radio" />
                                </div>
                            </section>
                        </form>
                        <form className={"reviews__header__query-form order"}>
                            <p className="reviews__header__query-form--command">Click to order:</p>
                            <section className="reviews__header__query-form__sort__list--container">
                                <div className="reviews__header__query-form__sort__element--container">
                                    <label htmlFor="order-asc">Ascending</label>
                                    <input id="order-asc" onClick={handleOrderOnClick} name="order" className="reviews__header__query-form__sort__element--input" value="asc" type="radio" />
                                </div>
                                <div className="reviews__header__query-form__sort__element--container">
                                    <label htmlFor="order-desc">Descending</label>
                                    <input id="order-desc" onClick={handleOrderOnClick} name="order" className="reviews__header__query-form__sort__element--input" value="desc" type="radio" />
                                </div>
                            </section>
                        </form>
                        <p className={displayParams.sort_by !== "" ? "reviews__header__query-form__list--message" : "hide"}>Currently sorting by <span className="reviews__header__query-form__list--message--content">{displayParams.sort_by}</span>
                        <span className={displayParams.order !== "" ? "reviews__header__query-form__list--message" : "hide"}> in order <span className="reviews__header__query-form__list--message--content">{displayParams.order}</span></span></p>
                    </div>
                </div>
                <ul className="reviews__list">
                    {reviewList.map((review) => {
                        return (<li className="reviews__list__element--container" key={Math.random() * 10000}>
                            <Link style={{ textDecoration: "none" }} to={`/reviews/${review.review_id}`}><div className="reviews__list__element--review-id--box"><p className="reviews__list__element--review-id">{review.review_id}</p></div></Link>
                            <p className="review__list__element--title">Review title: <br /><br />{review.title}</p>
                            <p className="review__list__element--created-at">{formatDate(review.created_at)}</p>


                        </li>
                        )

                    })}
                </ul>

            </section>
        )

}

export default Reviews