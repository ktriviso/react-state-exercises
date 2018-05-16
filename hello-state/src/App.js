import React from 'react';
import Mood from './Mood';

export default class App extends React.Component {
    // this is the model
    constructor(props){
        super(props);
        this.state = {
            name: 'krista',
            moodPoints: 0
        };
        this.happier = this.happier.bind(this)
        this.depressed = this.depressed.bind(this)
    }

    //this is the controller
    happier(e) {
        // bad: cannot update state directly
        // const newState = {
        //     moodPoints: this.state.moodPoints + 1
        // };

        // this method comes from React.Component
        // waits until run time to find the value of this. its never bound to anything, its evalutated at call time.

        // will make sure we have the most recent state
        this.setState((prevState) => {
            let newMood = prevState.moodPoints+1
            if(newMood > 20) {
                newMood = 20
            }
            // if(prevState.moodPoints <= 0) {
            //     return {moodPoints: 10}
            // }
                return {
                    moodPoints: newMood
                }


        });
    }

    depressed(e) {
        this.setState((prevState) => {
            let newMood = prevState.moodPoints-1
            if(newMood < 1) {
                newMood = 1
            }
            // if(prevState.moodPoints <= 0) {
            //     return {moodPoints: 10}
            // }
                return {
                    moodPoints: newMood
                }


        });
    }

    // this is the view
    // moodPoints and depress/happier are different because moodPoints is a state and the other two are methods
    render() {
        return (
            <div>
                <p>Hi, {this.state.name}.</p>
                <Mood
                    moodPoints={this.state.moodPoints}
                    depressed={this.depressed}
                    happier={this.happier}
                />
            </div>
        );
    }
}
