import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useFetching from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/MyLoader";
import classes from './css/PostIdPage.module.css'
import styles from '../components/css/postItem.module.css'
import MyInput from '../components/UI/input/MyInput'
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context'

const PostIdPage = () => {
    const username = localStorage.getItem('username')
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

    function getMonth(number){
        switch (number) {
          case '01':
            return 'Янв'
            break;
          case '02':
            return 'Февр'
            break;
          case '03':
            return 'Март'
            break;
          case '04':
            return 'Апр'
            break;
          case '05':
            return 'Май'
            break;
          case '06':
            return 'Июнь'
            break;
          case '07':
            return 'Июль'
            break;
          case '08':
            return 'Авг'
            break;
          case '09':
            return 'Сент'
            break;
          case '10':
            return 'Окт'
            break;
          case '11':
            return 'Нояб'
            break;
          case '12':
            return 'Дек'
            break;
        }
      }

    return (
        <div className={classes.main}>
            {isLoading
                ? <Loader/>
                :  <div className={classes.singlePost}>
                    <div  className={styles.post}>
                        <div className={styles.date_cont}>
                        <p className={styles.date_num}>{ post.date_made.split('T20:00:00.000Z')[0].split('-')[2]}</p>
                        <p className={styles.date_month}>{getMonth(post.date_made.split('T20:00:00.000Z')[0].split('-')[1])}</p>
                        <p className={styles.date_year}>{ post.date_made.split('T20:00:00.000Z')[0].split('-')[0]}</p>
                        </div>
            
                        <div className={styles.titleBody}>
                        <p className={styles.title}>{post.title}</p>
                        <p className={styles.body}>{post.body}</p>
                        </div>
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
                                                <div className={classes.comm_card} key={comm.comments_id} >
                                                    <h5 className={classes.comm_name}>{comm.name}</h5>
                                                    <h5 className={classes.comm_email}>{comm.email}</h5>
                                                    <div className={classes.comm_body}>{comm.body}</div>
                                                </div>
                                            )
                                        }
                            </div>
                            : false
                        }
                    <form className={classes.form} onSubmit={submit}
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