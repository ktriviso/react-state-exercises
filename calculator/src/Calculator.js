import React from 'react';

export default class Calculator extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            sum: 0
        }
    }

    add(e){
        // the || 0 makes it so that you never get NaN
        let sum = parseInt(this.refs.val1.value || 0) + parseInt(this.refs.val2.value || 0)
        this.setState({
            sum: sum
        })
    }

    render(){

        return (
            <div className="container">
              <h1>Add with React!</h1>

              <div className="add">
                <input type="text" ref="val1" onChange={(e) => this.add(e)}/>
                <span>+</span>
                <input type="text" ref="val2" onChange={(e) => this.add(e)}/>
                <span>=</span>
                <h3>{this.state.sum}</h3>
              </div>
            </div>
        )
    }
}
