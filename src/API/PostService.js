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

    static async createPost(post_id, title, body, username, date_made) {
        const url = 'http://localhost:5000/api/posts/create'
        const token = localStorage.getItem('auth')
        await axios.post(url, {
            post_id:post_id,
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

    static async updatePost(title, body, post_id){
            const token = localStorage.getItem('auth')
            let response = await axios.patch('http://localhost:5000/api/posts/update', 
            {
                title: title, 
                body: body, 
                post_id:post_id
            }, 
            { 
                headers: 
                {
                    Authorization: "Bearer " + token 
                }
            }
        )   
            return response
    }
    static async updateUser(new_username , address, telephone, email) {
        const token = localStorage.getItem('auth')
        const response = await axios.patch('http://localhost:5000/api/users/update',{
        old_username:localStorage.getItem('username'),
        new_username: new_username, 
        address:address, 
        telephone:telephone, 
        email:email
    }, { 
        headers: 
        {
            Authorization: "Bearer " + token 
        }
    })
        return response
    }
    static async setLike(post_id, username){
        const token = localStorage.getItem('auth')
        const response = await axios.patch('http://localhost:5000/api/posts/setLike', {
        post_id:post_id, 
        username:username
    },{ 
        headers: 
        {
            Authorization: "Bearer " + token 
        }
    })
    }

    static async deleteLike(post_id, username){
        const token = localStorage.getItem('auth')
        const response = await axios.patch('http://localhost:5000/api/posts/deleteLike', {
        post_id:post_id, 
        username:username
    },{ 
        headers: 
        {
            Authorization: "Bearer " + token 
        }
    })
    }

    static async getLikesForPost(post_id){
        const token = localStorage.getItem('auth')
        const response = await axios.get('http://localhost:5000/api/posts/CountLikes/' + post_id, { 
        headers: 
        {
            Authorization: "Bearer " + token 
        }
    })
        console.log(response)
        return response.data
    }

}