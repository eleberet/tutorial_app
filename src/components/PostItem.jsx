//import React, { useState } from "react";
import '../styles/App.css'

function PostItem(props) {

    //console.log(props.key)

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
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
