import axios from "axios";

export default class PostService {
    static async getAll(limit = 10, page = 1, username, token) {
        let options = {
            "username":username
        }
        const response = await axios.post('http://localhost:5000/api/posts/getByUser', options)
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