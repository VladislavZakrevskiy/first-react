import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useFetching from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/MyLoader";
import classes from './PostIdPages.module.css'

const PostIdPage = () => {
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
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div className={classes.main}>
            {isLoading
                ? <Loader/>
                :  <div className={classes.post}>
                    <div className={classes.post_title}>
                        {post.id}. {post.title}
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
                : <div className={classes.comments_list}>
                    {comments.map(comm =>
                        <div className={classes.comm_card} key={comm.id} style={{marginTop: 15}}>
                            <h5 className={classes.comm_email}>{comm.email}</h5>
                            <h5 className={classes.comm_email}>{comm.name}</h5>
                            <div className={classes.comm_body}>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;