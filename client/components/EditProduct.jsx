import React, { Component } from "react";
import axios from "axios";

class EditProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      stock: "",
      price: 0.0,
    };
    this.onChange = this.onChange.bind(this);
    this.submitHanlder = this.submitHanlder.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.props.name,
      description: this.props.props.description,
      stock: this.props.props.stock,
      price: this.props.props.price,
    });
  }

  onChange(e) {
    if (e.target.name === "name") {
      this.setState({ name: e.target.value });
    } else if (e.target.name === "description") {
      this.setState({ description: e.target.value });
    } else if (e.target.name === "stock") {
      this.setState({ stock: e.target.value });
    } else if (e.target.name === "price") {
      this.setState({ price: e.target.value });
    }
  }

  async submitHanlder(e) {
    e.preventDefault();
    let updatedProduct = this.state;
    ///NEED TO CREATE BACKEND ROUTE
  }

  render() {
    const { name, description, stock, price } = this.state;
    const { onChange, submitHanlder } = this;
    return (
      <div>
        <form>
          <label>Name: </label>
          <input type="text" name="name" value={name} onChange={onChange} />
          <br />
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={onChange}
          />
          <br />
          <label>Stock: </label>
          <input type="text" name="stock" value={stock} onChange={onChange} />
          <br />
          <label>Price: </label>
          <input type="text" name="price" value={price} onChange={onChange} />
        </form>
      </div>
    );
  }
}

export default EditProduct;
