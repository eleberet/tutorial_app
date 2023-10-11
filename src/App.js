import React, { useMemo, useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'ajavascript 1', body: 'cDescription 1' },
    { id: 2, title: 'bjavascript 2', body: 'dDescription 2' },
    { id: 3, title: 'cjavascript 3', body: 'aDescription 3' },
  ])

  //const [selectedSort, setSelectedSort] = useState('') // old
  //const bodyInputRef = useRef() //хук получить доступ к дом элементу и оттуда взять value
  //const [searchQuery, setSearchQuery] = useState('') // old

  // новый стейт для хранения значения фильтра и отсортированной выборки для отрисовки
  const [filter, setFilter] = useState({ sort: '', query: '' })

  // пример хука UseMemo - кеширование функции
  const sortedPosts = useMemo(
    () => { //коллбек функция
      console.log('getSortedPosts')
      if (filter.sort) { // логика сортировки
        return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
      }
      return posts
    },
    [filter.sort, posts] //массив обьектов при изменении которых отрабатывает коллбек
  )

  const sortedAndSearchedPosts = useMemo(
    () => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    },
    [filter.query, sortedPosts]
  )

  const createNewPost = (newPost) => {
    setPosts([newPost, ...posts])
  }

  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  // сортировка переехала в отдельный компонент PostFilter
  // const sortPosts = (sort) => { 
  //   setSelectedSort(sort);
  // }

  return (
    <div className="App">
      <PostForm create={createNewPost} />
      <hr style={{ margin: '15px 0' }} />
      
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />

      {sortedAndSearchedPosts.length ?
        <PostList deletePost={deletePost} posts={sortedAndSearchedPosts} title={'Список постов'} />
        : <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>}
    </div>
  );
}

export default App;
