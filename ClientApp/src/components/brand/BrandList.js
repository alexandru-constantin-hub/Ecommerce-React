import React, { Component } from 'react';
import axios from 'axios';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export class BrandList extends Component {
    constructor(props) {
        super(props);
        this.state = { brandNamesServer: [], brandName: [], isOpen: null, brandId: [], editBrand: [] };
    }

    componentDidMount() {
        this.getBrandsList();
    }

    addBrandName(event) {
        this.setState({ brandName: event.target.value });
    }

    formSubmit(event) {
        event.preventDefault();
        this.sendBrand();
        this.getBrandsList();
        event.target.reset();
    }

    toggle() {
        this.setState({isOpen: true})
    }

    deleteBrandName(id) {
        console.log(id);
        this.setState({ brandId: id });
        this.deleteBrand(id);
    }

    editBrandName(event) {
        this.setState({ editBrandName: event.target.value });
    }

    formEdit(event, id) {
        event.preventDefault();
        this.sendEditBrandName(event, id);
        this.getBrandsList();
    }



    render() {
        return (
            <div> 
                <div>
                    <h2> Create new brand</h2>

                    <form onSubmit={ this.formSubmit.bind(this)}>
                        <input type="text" onChange={this.addBrandName.bind(this)} />
                        <input type="submit" value="submit"/>
                    </form>
                </div>
                <div>
                    <h2> Brands List</h2>
                    <ul>
                        {this.state.brandNamesServer}
                    </ul>
                   
                </div>
            </div>
            );
    }
    async getBrandsList() {
        const response = await axios.get("https://localhost:44318/api/Brands/GetAllBrands");
        let items;
        items = response.data.map(item =>
           
            <li key={item.brandId}>{item.brandName}
                    <button value={item.brandId} onClick={()=> this.deleteBrandName(item.brandId)}>Delete</button>
                <form onSubmit={this.formEdit.bind(this, item.brandId)}>
                    <input type="text" onChange={this.editBrandName.bind(this, item.brandId)} />
                        <input type="submit" value="edit" />
                    </form>
            </li>
           
              
           

        );
        this.setState({ brandNamesServer: items });
    };


    async sendBrand() {
        const response = await axios.post("https://localhost:44318/api/Brands/Create", { brandName: this.state.brandName});
        if (response.status === 200) {
            { this.state.brandName = true }
        }
    }

    async deleteBrand(id) {
        const response = await axios.delete(`https://localhost:44318/api/Brands/Delete/${id}`)
        if (response.status === 200) {
            { this.state.brandId = id }
        }
    }

    async sendEditBrandName(brandNameChanged, id) {
        const response = await axios.put(`https://localhost:44318/api/Brands/Update/${id}`, {brandNameChanged })
        if (response.status === 200) {
            { this.state.brandId = id }
        }
    }

}
