import React from 'react';
import Comments from './Comments'

export default function Post(props){
    return (
        <article>
            <h1>{props.data.title}</h1>
            <h1>By: {props.data.author}</h1>
            <h1>{props.data.body}</h1>
            <button onClick={props.editBody}>edit body</button>
            <Comments tacos={props.data.comments}/>
        </article>

    );
}
