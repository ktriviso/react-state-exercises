import React from 'react';
import './App.css';
import ListItems from './ListItems';

export default class MyList extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            toDoListArray: props.theList,
            newItem: ''
        }
    }

    clearList(){
        this.setState({
            toDoListArray: []
        })
    }

    newItemChange(e){
        this.setState({
            newItem: e.target.value
        })
    }

    addItem(e){
        e.preventDefault()
        const toDos = this.state.toDoListArray
        toDos.push(this.state.newItem)
        this.setState({
            toDoListArray: toDos,
            newItem: ''
        })
    }

  render() {
      let toDoItems = this.state.toDoListArray.map((item, index) => (
          <ListItems doThis={item} key={index} />
      ))
    return (
      <div>
        <h1>Things I should stop procrastinating:</h1>
        <ul>
          {toDoItems}
        </ul>
        <form>
            <input type="text" placeholder="type new to do"
            onChange = {(e) => this.newItemChange(e)}
            value={this.state.newItem}
             />
             <button onClick={(e) => this.addItem(e)}>Add me</button>
        </form>
        <button onClick={() => this.clearList()}>Finish List</button>
      </div>
    )
  }
}
