import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";


function PostForm({ create }) {

    const [post, SetPost] = useState({ title: 'x', body: 'x' })

    const addNewPost = (e) => {
        e.preventDefault() // предотвращение обновления при клике
        create({ ...post, id: Date.now() })
        //setPosts([{ ...post, id: Date.now() }, ...posts])
        SetPost({ title: '', body: '' })
    }

    return (
        <form>
            {/*Управляемый компонент*/}
            <MyInput
                value={post.title}
                onChange={e => SetPost({ ...post, title: e.target.value })}
                type="text"
                placeholder="Название поста"
            />

            {/* <input ref={bodyInputRef} type="text"></input> */}

            <MyInput
                value={post.body}
                onChange={e => SetPost({ ...post, body: e.target.value })}
                type="text"
                placeholder="Текст поста"
            />

            {/* 
        {Неуправляемый (неконтроллируемый) компонент}
        <MyInput
          ref={bodyInputRef}
          //value={text}
          //onChange={e => setText(e.target.value)}
          type="text"
          placeholder="Текст поста"
        />
        */}

            <MyButton onClick={addNewPost} > Add post </MyButton>

        </form>

    );
}

export default PostForm;
