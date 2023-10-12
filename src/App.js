import React, { useMemo, useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";

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
  // стейт для отрисовки модального окна
  const [modal, setModal] = useState(false)

  // пример хука UseMemo - кеширование функции
  const sortedPosts = useMemo(
    () => { //коллбек функция
      //console.log('getSortedPosts')
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
    setModal(false)
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

      <MyButton style={{marginTop:20}} onClick={() => setModal(true)}>
        Add new post
      </MyButton>


      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createNewPost} />
      </MyModal>


      <hr style={{ margin: '15px 0' }} />

      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />

      <PostList
        deletePost={deletePost}
        posts={sortedAndSearchedPosts}
        title={'Список постов'}
      />

    </div>
  );
}

export default App;
