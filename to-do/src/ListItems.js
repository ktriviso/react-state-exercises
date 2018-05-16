import React from 'react';

export default class ListItems extends React.Component {
    render(){
        return (
            <div>
              <li>{this.props.doThis}</li>
            </div>
        )
    }
}
