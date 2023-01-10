import axios from 'axios'


const myApi = axios.create({
    baseURL: "https://bmoody-portfolio.onrender.com/api"
})

export const getReviews = () => {
    return myApi.get('/reviews').then((res) => {
        return res.data
    })
}

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
