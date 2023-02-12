import React from 'react'
import PostItem from './postItem'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import ImgAvatar from './UI/avatar/imgAvatar'
import classes from './form.module.css'



const PostList=({posts, title, remove, ...props})=> {

if(!posts.length){
  return (
      <h1 style={{textAlign:'center'}}>
        Посты не найдены
      </h1>
    )
}

  return (
    <div>
        <h1 style={{textAlign:"center"}}>
            {title}
        </h1>
        <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.post_id}
                        timeout={500}
                        classNames="post"
                    >                       
                        <div className={classes.post}>
                        <PostItem keyPost_id = {post.post_id} key={post.post_id} remove={remove} number={index + 1} post={post} />
                        <ImgAvatar post_id={post.post_id} className={classes.img}/>
                        </div>
                    </CSSTransition>
                )}
            </TransitionGroup>
            
    </div>
    

  )
}


export default PostList