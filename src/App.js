import React, { useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'javascript 1', body: 'Description 1' },
    { id: 2, title: 'javascript 2', body: 'Description 2' },
    { id: 3, title: 'javascript 3', body: 'Description 3' },
  ])

  //const bodyInputRef = useRef() //хук получить доступ к дом элементу и оттуда взять value

  const createNewPost = (newPost) => {
    setPosts([newPost, ...posts])
  }

  return (
    <div className="App">
      <PostForm create={createNewPost} />
      <PostList posts={posts} title={'Список постов'} />
    </div>
  );
}

export default App;
