import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyList from './MyList';
import registerServiceWorker from './registerServiceWorker';

const toDos = ["sleep", "eat", "shower"]

ReactDOM.render(<MyList theList={toDos}/>, document.getElementById('root'));
registerServiceWorker();
