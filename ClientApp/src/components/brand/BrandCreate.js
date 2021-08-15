import React, { Component } from 'react';
import axios from 'axios';
import {BrandList} from './BrandList'

export class BrandCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { brandName: [], success:false };
    }

    addBrandName(event) {
        this.setState({brandName: event.target.value});
    }

    formSubmit(event) {
        event.preventDefault();
        this.sendBrand();
        event.target.reset();
    }
 

    render() {
        return (
            <div>
                <h2> Create new brand</h2>

                <form onSubmit={ this.formSubmit.bind(this)}>
                    <input type="text" onChange={this.addBrandName.bind(this)} />
                    <input type="submit" value="submit" />
                </form>
            </div>
        );
    }
    async sendBrand() {
        const response = await axios.post("https://localhost:44318/api/Brands/Create", { brandName: this.state.brandName });
        if (response.status === 200) {
            { this.state.brandName = true }
        }
        
    }

}
