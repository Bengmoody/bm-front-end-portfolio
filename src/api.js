import axios from 'axios'


const myApi = axios.create({
    baseURL: "https://bmoody-portfolio.onrender.com/api"
})

export const getReviews = () => {
    return myApi.get('/reviews').then((res) => {
        return res.data
    })
}
export const getSingleReview = (review_id) => {
    return myApi.get(`/reviews/${review_id}`).then((res) => {
        return res.data.review
    })
}

export const getSingleReviewComments = (review_id) => {
    return myApi.get(`/reviews/${review_id}/comments`).then((res) => {
        console.log(res)
        if (res.data.comments === undefined) {
            return Promise.reject();
        } else {
           return res.data.comments 
        }
    })
}