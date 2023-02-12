import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useFetching from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/MyLoader";
import classes from './PostIdPages.module.css'
import MyInput from '../components/UI/input/MyInput'
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context'

const PostIdPage = () => {
    const {username} = useContext(AuthContext)
    const [commForm, setCommForm ] = useState({email:'', body:""})
    const [sub, setSub] = useState(false)
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data);
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data);
    })

    useEffect(() => {
        fetchComments(params.id)
    }, [sub])

    useEffect(()=>{
        fetchPostById(params.id)
    }, [])

    const sendComm = async () => {
        await PostService.createComm(params.id, commForm.email, username, commForm.body)

    }

    const submit = async e => {
        e.preventDefault() 
        await sendComm()
        setSub(Math.random())
    }

    return (
        <div className={classes.main}>
            {isLoading
                ? <Loader/>
                :  <div className={classes.post}>
                    <div className={classes.post_title}>
                         {post.title}
                    </div>
                    <div className={classes.post_body}>
                        {post.body}
                    </div>
                </div>
            }
            <h1 className={classes.comments}>
                Комментарии
            </h1>
            {isComLoading
                ? <Loader/>
                : <div>
                        {
                                    comments ?
                                    <div className={classes.comments_list}>
                                        {
                                            comments.map(comm =>
                                                <div className={classes.comm_card} key={comm.comments_id} style={{marginTop: 15}}>
                                                    <h5 className={classes.comm_email}>{comm.email}</h5>
                                                    <h5 className={classes.comm_email}>{comm.name}</h5>
                                                    <div className={classes.comm_body}>{comm.body}</div>
                                                </div>
                                            )
                                        }
                            </div>
                            : false
                        }
                    <form onSubmit={submit}
>
                        <MyInput placeholder = 'Ваша почта' value={commForm.email} onChange = {e=>  setCommForm({...commForm, email: e.target.value })}/>
                        <MyInput placeholder = 'Текст Комментария' value={commForm.body} onChange = {e => setCommForm({...commForm, body: e.target.value })}/>
                        <MyButton>
                            Отправить
                        </MyButton>

                    </form>
                </div>
                
            }
        </div>
    );
};

export default PostIdPage;