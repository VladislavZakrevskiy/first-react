import React from 'react'
import PostItem from './postItem'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import ImgAvatar from './UI/avatar/imgAvatar'
import classes from './css/PostList.module.css'


const PostList=({posts, title, remove, likeCount, ...props})=> {
if(!posts.length){
  return (
      <h1 className={classes.title}>
        Посты не найдены
      </h1>
    )
}

  return (
    <div>
        <h1 className={classes.title}>
            {title}
        </h1>
        
                {posts.map((post, index) =>               
                        <PostItem keyPost_id = {post.post_id} key={post.post_id} remove={remove} number={index + 1} post={post} />                   
                )}
            
            
    </div>
    

  )
}


export default PostList