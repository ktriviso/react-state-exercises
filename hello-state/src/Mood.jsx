import React from 'react';

export default function mood(props) {
    return(
        <div>
            <p>You are {props.moodPoints}% happy.</p>
            <button onClick={props.happier}>Cheer up!</button>
            <button onClick={props.depressed}>Get Upset.</button>
        </div>
    );
}

//they useed to be
// <p>You are {this.moodPoints}% happy.</p>
