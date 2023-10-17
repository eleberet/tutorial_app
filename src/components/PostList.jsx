import React from "react";
import PostItem from "./PostItem";
import {TransitionGroup,CSSTransition} from "react-transition-group"

const PostList = ({ posts, title, deletePost }) => {

  if (!posts.length) {
    return (
      <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
    )
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        {title}
      </h1>
{/* https://youtu.be/GNrdg3PzpJQ?si=GoO90Jc-qJkslVgS&t=5516  */}
      <TransitionGroup>
        {posts.map((post, index) =>
        <CSSTransition
          key={post.id}
          timeout={500}
          classNames="post"
         >
          <PostItem deletePost={deletePost} number={index + 1} post={post}  id={post.id} />
          </CSSTransition> 
        )}
      </TransitionGroup>
    </div>
  );
}

export default PostList;