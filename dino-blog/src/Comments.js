import React from 'react';

export default function Comments(props){

    const comments = props.tacos.map((elem, i) => {
        return (<li key={i}>{elem}</li>)
    })
    return (
        <div>
            <h3>Comments</h3>
            <ol>
                {comments}
            </ol>
        </div>
    );
}
