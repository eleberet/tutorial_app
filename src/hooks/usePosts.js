import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
    // пример хука UseMemo - кеширование функции
    const sortedPosts = useMemo(() => {
        //коллбек функция
        if (sort) { // логика сортировки
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts
    },
        [sort, posts] //массив обьектов при изменении которых отрабатывает коллбек
    )
    return sortedPosts
}


export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    },
        [query, sortedPosts]
    )
    return sortedAndSearchedPosts
}