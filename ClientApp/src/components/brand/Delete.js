import React, { Component } from 'react';
import axios from 'axios';

export class BrandList extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    componentDidMount() {
        this.getBrandsList();
    }


    render() {
        return (
            <div>
                <h2> Brands List</h2>
                <ul>
                    {this.state.items}
                 </ul>


            </div>
            );
    }
    async editBrand() {
        const response = await axios.put("https://localhost:44318/api/Brands/Delete/1");
        if (response.status === 200) {

        }
        let items;
        items = response.data.map(item =>
            <li key={item.brandId}>{item.brandName}</li>
        );
        this.setState({ items: items });
    }

}
