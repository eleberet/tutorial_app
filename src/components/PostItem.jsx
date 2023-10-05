//import React, { useState } from "react";
import '../styles/App.css'

function PostItem({ deletePost, ...props }) {

    //console.log(props.key)

    // const handler = () => {
    //     console.log(props.number)
    //     deletePost(props.number)
    // }

    return (
        <div className="App">
            <div className="post">
                <div className="post__content">
                    <strong>{props.number}.{props.post.title}</strong>
                    <div>
                        {props.post.body}
                    </div>
                </div>
                <div className="post__btns">
                    <button onClick={() => deletePost(props.post.id)}> Delete </button>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
