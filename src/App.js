import React, { useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'ajavascript 1', body: 'cDescription 1' },
    { id: 2, title: 'bjavascript 2', body: 'dDescription 2' },
    { id: 3, title: 'cjavascript 3', body: 'aDescription 3' },
  ])

  const [selectedSort, setSelectedSort] = useState('')
  //const bodyInputRef = useRef() //хук получить доступ к дом элементу и оттуда взять value

  const createNewPost = (newPost) => {
    setPosts([newPost, ...posts])
  }

  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const sortPosts = (sort) => {
    console.log('sortPosts', sort)
    setSelectedSort(sort);
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort]))) // рвскурить
  }

  return (
    <div className="App">
      <PostForm create={createNewPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue={"sort"}
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' }
          ]}
        />
      </div>


      {posts.length ?
        <PostList deletePost={deletePost} posts={posts} title={'Список постов'} />
        : <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>}
    </div>
  );
}

export default App;
