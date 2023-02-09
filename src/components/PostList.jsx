import React from 'react'
import PostItem from './postItem'
import {TransitionGroup, CSSTransition} from 'react-transition-group'


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
                        <PostItem key={post.post_id} remove={remove} number={index + 1} post={post} />
                    </CSSTransition>
                )}
            </TransitionGroup>
    </div>
    

  )
}


export default PostList