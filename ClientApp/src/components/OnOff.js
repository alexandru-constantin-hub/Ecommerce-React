
import React, { Component } from 'react';

export class OnOff extends Component {


    constructor(props) {
        super(props);
        this.state = { buttonState: true };
        this.changeButtonState = this.changeButtonState.bind(this);
    };

    changeButtonState() {
        this.setState({
            buttonState: !this.state.buttonState
        });
    };




    render() {
        let elem;
        if (this.state.buttonState)
            elem = <h1>On </h1>
        else
            elem = <h1>Off</h1>

        return (
            <div>
                <h1>On Offt</h1>
                <button className="button button-primary" onClick={this.changeButtonState}>Switch</button>
                <p>{elem}</p>
                
            </div>
        );
    }
}