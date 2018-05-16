import React from 'react';
import './App.css';
import Post from './Post.js'

const data = {
    abc: {
        title: 'Books are cool',
        author: 'Krista',
        body: 'this is the body',
        comments: ['comment here', 'comment again', 'comment last']
    },
    abcd: {
        title: 'Books',
        author: 'Dave',
        body: 'this is the body',
        comments: ['comment isnt here', 'dont comment again', 'this is the comment last']
    },
    abcde: {
        title: 'Books suck',
        author: 'no one',
        body: 'this is the body',
        comments: ['comment zero', 'comment one', 'comment two']
    },
};

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            posts: data
        };
        this.editBody = this.editBody.bind(this);
    }

    editBody(e, id){
        this.setState((prevState) => {
            prevState.posts[id].body = prompt('new body')
            return prevState
        })
    }


  render() {
      const posts = [
          <Post data={this.state.posts.abc} editBody={(e) => this.editBody(e, 'abc')}/>,
          <Post data={this.state.posts.abcd} editBody={(e) => this.editBody(e, 'abcd')}/>,
          <Post data={this.state.posts.abcde} editBody={(e) => this.editBody(e, 'abcde')}/>
      ];

    return (
      <div className="App">
        <h3>Dino Blog</h3>
        <h3>here are some posts</h3>
        {posts}
      </div>
    );
  }
}

export default App;
