import axios from "axios";

export default class PostService {
    static async getAll(limit = 3, page = 1, username, token) {
        const url = 'http://localhost:5000/api/posts/getByUser'
        const response =  axios.post(url, {
            username:username, 
            limit:limit,
            page:page
        },{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response;
    }

    static async getById(id) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
        return response;
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return response;
    }
    static async registration(newUser) {
        const response = await axios.post('http://localhost:5000/api/users/reg',newUser)
        return response
    }

    static async login(user){
        const response = await axios.post('http://localhost:5000/api/users/login', user)
        return response
    }
}