import React, { Component, useState } from 'react';
import axios from 'axios';
import { UncontrolledCollapse, Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Form, FormGroup, Label, Input, FormText, Container, Row, Col   } from 'reactstrap';

export class Brand extends Component {
    constructor(props) {
        super(props);
        this.state = { brandNamesServer: [], brandName: [], isOpen: false, brandId: [], editBrand: [], setModal: false, modal: false };

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
        event.target.reset();
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen })
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
    }

    render() {
        return (
            <Container>

                <Row>
                    <Col xs="6">
                        <h2> Create new brand</h2>
                   

                        <Form onSubmit={this.formSubmit.bind(this)}>
                            <FormGroup>
                                <Label for="addbrand">Add Brand</Label>
                                <Input type="text" onChange={this.addBrandName.bind(this)} id="addbrand" />
                            </FormGroup>
                            <Button type="submit" value="submit" >Submit</Button>
                        </Form>
                    </Col>
                </Row>
              

                <Row style={{marginTop: '2em'}}>
                    <Col xs="6">
                        <h2> Brands List</h2>
                        <ListGroup>
                            {this.state.brandNamesServer}
                        </ListGroup>
                    </Col>

                </Row>
            </Container>
        );
    }
    async getBrandsList() {
        const response = await axios.get("https://localhost:44318/api/Brands/GetAllBrands");
        let items;
        items = response.data.map(item =>
            <ListGroupItem key={item.brandId}>
                {item.brandName}
                <Button className="btn btn-danger float-right" value={item.brandId} onClick={() => this.deleteBrandName(item.brandId)}>Delete</Button>
                <Button color="danger" onClick={this.toggle.bind(this)}>Boutton Hugo</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} >
                    <ModalHeader toggle={this.toggle.bind(this)} >Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.deleteBrandName(item.brandId)}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Button className="btn btn-secondary float-right" id={"toggler" + item.brandId} style={{ marginRight: '1rem' }}>
                    Edit
                </Button>
                <UncontrolledCollapse toggler={"#toggler" + item.brandId}>
                    <Card>
                        <CardBody>
                            <Form onSubmit={this.formSubmit.bind(this)}>
                                <FormGroup>
                                    <Label for={"addbrand" + item.brandId}>Edit Brand</Label>
                                    <Input type="text" onChange={this.addBrandName.bind(this)} id={"addbrand" + item.brandId} placeholder={item.brandName}/>
                                </FormGroup>
                                <Button type="submit" value="submit" >Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </UncontrolledCollapse>
            </ListGroupItem>
        );
        this.setState({ brandNamesServer: items });
    };


    async sendBrand() {
        const response = await axios.post("/api/Brands/Create", { brandName: this.state.brandName });
        if (response.status === 200) {
            const response = await axios.get("/api/Brands/GetAllBrands");
            let items;
            items = response.data.map(item =>
                <ListGroupItem key={item.brandId}>
                    {item.brandName}
                    <button className="btn btn-danger float-right" value={item.brandId} onClick={() => this.deleteBrandName(item.brandId)}>Delete</button>
                    <Button className="btn btn-secondary float-right" id={"toggler" + item.brandId} style={{ marginRight: '1rem' }}>
                        Edit
                    </Button>
                    <UncontrolledCollapse toggler={"#toggler" + item.brandId}>
                        <Card>
                            <CardBody>
                                <Form onSubmit={this.formSubmit.bind(this)}>
                                    <FormGroup>
                                        <Label for={"addbrand" + item.brandId}>Edit Brand</Label>
                                        <Input type="text" onChange={this.addBrandName.bind(this)} id={"addbrand" + item.brandId} placeholder={item.brandName} />
                                    </FormGroup>
                                    <Button type="submit" value="submit" >Submit</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </UncontrolledCollapse>
                </ListGroupItem>
            );
            this.setState({ brandNamesServer: items });
            this.state.brandName = true;
        }
        else {
            /*Erreur*/

        }
    }

    async deleteBrand(id) {
        const response = await axios.delete(`https://localhost:44318/api/Brands/Delete/${id}`)
        if (response.status === 200) {
            const response = await axios.get("/api/Brands/GetAllBrands");
            let items;
            items = response.data.map(item =>
                <ListGroupItem key={item.brandId}>
                    {item.brandName}
                    <button className="btn btn-danger float-right" value={item.brandId} onClick={() => this.deleteBrandName(item.brandId)}>Delete</button>
                    <Button className="btn btn-secondary float-right" id={"toggler" + item.brandId} style={{ marginRight: '1rem' }}>
                        Edit
                    </Button>
                    <UncontrolledCollapse toggler={"#toggler" + item.brandId}>
                        <Card>
                            <CardBody>
                                <Form onSubmit={this.formSubmit.bind(this)}>
                                    <FormGroup>
                                        <Label for={"addbrand" + item.brandId}>Edit Brand</Label>
                                        <Input type="text" onChange={this.addBrandName.bind(this)} id={"addbrand" + item.brandId} placeholder={item.brandName} />
                                    </FormGroup>
                                    <Button type="submit" value="submit" >Submit</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </UncontrolledCollapse>
                </ListGroupItem>
            );
            this.setState({ brandNamesServer: items });
            this.state.brandName = true;
            { this.state.brandId = id }
        }
    }

    async sendEditBrandName(brandNameChanged, id) {
        const response = await axios.put(`https://localhost:44318/api/Brands/Update/${id}`, { brandNameChanged })
        if (response.status === 200) {
            const response = await axios.get("/api/Brands/GetAllBrands");
            let items;
            items = response.data.map(item =>
                <ListGroupItem key={item.brandId}>
                    {item.brandName}
                    <button className="btn btn-danger float-right" value={item.brandId} onClick={() => this.deleteBrandName(item.brandId)}>Delete</button>
                    <Button className="btn btn-secondary float-right" id={"toggler" + item.brandId} style={{ marginRight: '1rem' }}>
                        Edit
                    </Button>
                    <UncontrolledCollapse toggler={"#toggler" + item.brandId}>
                        <Card>
                            <CardBody>
                                <Form onSubmit={this.formSubmit.bind(this)}>
                                    <FormGroup>
                                        <Label for={"addbrand" + item.brandId}>Edit Brand</Label>
                                        <Input type="text" onChange={this.addBrandName.bind(this)} id={"addbrand" + item.brandId} placeholder={item.brandName} />
                                    </FormGroup>
                                    <Button type="submit" value="submit" >Submit</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </UncontrolledCollapse>
                </ListGroupItem>
            );
        }
    }

}
