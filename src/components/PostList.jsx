//import React, { useState } from "react";
import PostItem from "./PostItem";

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
      {posts.map((post, index) =>
        <PostItem deletePost={deletePost} number={index + 1} post={post} key={post.id} id={post.id} />
      )}
    </div>
  );
}

export default PostList;