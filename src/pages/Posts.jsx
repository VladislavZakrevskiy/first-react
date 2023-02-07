import React, { useEffect, useRef, useState } from 'react';
import PostService from "../API/PostService";
import { usePosts } from "../hooks/usePosts";
import useFetching from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/form";
import MyModal from "../components/UI/Modal/MyModal";
import PostFilter from "../components/postFilter";
import PostList from "../components/PostList";
import MyLoader from "../components/UI/loader/MyLoader";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';


const Posts = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort:'', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const observer = useRef()
    const [fetchPosts, isPostsLoading,postError] = useFetching(async()=>{
      let response = await PostService.getAll(limit, page)
      setPosts ([...posts,...response.data])
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
    })

    useEffect(()=>{
      fetchPosts(limit, page)
    }, [page, limit])

    useObserver(lastElement, page<totalPages, isPostsLoading, ()=>{
      setPage(page+1)
    })

    const createPost =(newPost)=>{
      setPosts([...posts, newPost])
      setModal(false)
    }
    
    const removePost =(post)=>{
      setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage =(page)=>{
      setPage(page)
    }

  return (
    <div className='App'> 
    <MyButton 
      style={{marginTop:'30px'}} 
      onClick ={()=>setModal(true)}>
         Создать пост
    </MyButton>
    <MyModal 
      visible={modal} 
      setVisible={setModal}>
        <PostForm 
        create = {createPost}/>
    </MyModal>
    
    <hr style={{margin: "15px 0"}}/>
    <PostFilter
      filter={filter}
      setFilter = {setFilter}
    />
    <MySelect
    value={limit}
    onChanges={value => setLimit(value)}
    defaultValue='Кол-во элементов на странице'
    options={[
      {value: 5, name: '5'},
      {value: 10, name: '10'},
      {value: 25, name: '25'},
      {value: -1, name: 'Все'},
    ]}
    />
    {
      postError &&
        <h1>Произошла ошибка ${postError}</h1>
    }
    <PostList 
      remove = {removePost} 
      posts={sortedAndSearchPosts}  
      title="Список постов 1"
      />
    <div ref={lastElement} style={{height:20}}>

    </div>
    {
      isPostsLoading &&
       <div style={{marginTop: '50px',display: 'flex',alignItems:"center", justifyContent:'center'}}><MyLoader/></div>
     
    }
    <Pagination 
      page={page} 
      changePage ={changePage} 
      totalPages={totalPages}
    />
    
    </div>
  )
}

export default Posts