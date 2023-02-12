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

    static async deletePost(post_id,token ){
        const url = 'http://localhost:5000/api/posts/delete'
        const response =await axios.post(url, {
            post_id:post_id
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response
    }

    static async createPost(title, body, username, date_made) {
        const url = 'http://localhost:5000/api/posts/create'
        const token = localStorage.getItem('auth')
        await axios.post(url, {
            title:title, 
            body:body, 
            username:username, 
            date_made:date_made
        },{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }

    static async getById(id) {
        const token = localStorage.getItem('auth')
        const response = await axios.get('http://localhost:5000/api/posts/' + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        return response;
    }

    static async getCommentsByPostId(post_id) {
        const token = localStorage.getItem('auth')
        const response = await axios.get(`http://localhost:5000/api/comments/` + post_id,  {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
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

    static async getProfile(username){
        const url = 'http://localhost:5000/api/users/byName'
        const token = localStorage.getItem('auth')
        const response = await axios.post(url, {
            username: username
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response
    }

    static async createComm(post_id, email, name, body) {
        const token = localStorage.getItem('auth')
        const response = await axios.post('http://localhost:5000/api/comments/create', {
        name: name, 
        post_id: post_id, 
        body: body, 
        email: email
    }, { 
        headers: {
            Authorization: "Bearer " + token 
        }
    })
    }

    static async load(url,username){
        
            
        }

}