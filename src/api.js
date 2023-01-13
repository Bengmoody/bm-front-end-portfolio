import axios from 'axios'


const myApi = axios.create({
    baseURL: "https://bmoody-portfolio.onrender.com/api"
})

export const getReviews = (category,sort_by,order) => {
    let params = {
        category,
        sort_by,
        order
    }
    let url = `/reviews`
    return myApi.get(url,{params}).then((res) => {
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
        if (res.data.comments === undefined) {
            return Promise.reject();
        } else {
           return res.data.comments 
        }
    })
}

export const patchSingleReview = (review_id,increment) => {
    let patchBody={"inc_votes":increment}
    return myApi.patch(`/reviews/${review_id}`,patchBody)
    .then((res) => {
        if (res.status !== 202) {
            return Promise.reject();
        }
    })
}

export const getUsers = (username) => {
    return myApi.get(`/users/${username}`)
    .then((res) => {
        if (res.status !== 200) {
            return Promise.reject();
        } else {
            return res;
        }
    })
}

export const postComment = (username,review_id,comment) => {
    const postBody = {
        "body": comment,
        "username": username
    }
    return myApi.post(`reviews/${review_id}/comments`,postBody)
    .then((res) => {
        if (res.status !== 201) {
            return Promise.reject()
        } else {
            return res.data.comment
        }
    })
}

export const getCategories = () => {
    return myApi.get('/categories')
    .then((res) => {
        return res.data.categories;
    })
}

export const deleteCommentById = (comment_id) => {
    return myApi.delete(`/comments/${comment_id}`)
    .then((res) => {
        if (res.status === 204) {
            return true;
        } else {
            return Promise.reject()
        }
    })
}