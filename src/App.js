import React, { useEffect, useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";

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
  // кастомный хук usePosts который внутри реализует и кеширует
  // логику сортировки и фильтрации записей
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const createNewPost = (newPost) => {
    setPosts([newPost, ...posts])
    setModal(false)
  }
  //кастомный хук для отображения индикатора загрузки данных и обработки ошибок
  const [fetchPosts, isPostLoading, postError] = useFetching(
    async () => {
      const response = await PostService.getAll()
      setPosts(response)
    }
  )

  /* 
  хук useEffect содержит коллбек - вызываемую ф() и список зависимостей
  при которых она вызывается, если [] пусто то вызывается при первом запуске единожды
  те на стадии Mounting 
  lifecycle react component - Mounting, Updating, and Unmounting.
  если хук возвращает ф() то она выполняется на стадии Unmounting
  return () => {
    чтото что делает отчистку(например)
  }
  */
  useEffect(() => {
    fetchPosts()
  }, [])


  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }


  return (
    <div className="App">
      <MyButton style={{ marginTop: 20 }} onClick={() => setModal(true)}>
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
      {postError &&
        <h1>Произошла ошибка ${postError}</h1>}
      {isPostLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <Loader />
        </div>
        : <PostList
          deletePost={deletePost}
          posts={sortedAndSearchedPosts}
          title={'Список постов'}
        />
      }
    </div>
  );
}

export default App;
