import React, { Component } from "react";

// React Router Imports
import { Link } from "react-router-dom";

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    formatDate(date, format) {
        const map = {
            mm: date.getMonth() + 1,
            dd: date.getDate(),
            yyyy: date.getFullYear().toString(),
        };

        return format.replace(/mm|dd|yyyy/gi, (matched) => map[matched]);
    }

    render() {
        const { id, createdAt, products, updatedAt } = this.props;
        const date = new Date(Date.parse(createdAt.substring(0, 10)));
        console.log(date, typeof date);
        const formattedDate = this.formatDate(date, "mm/dd/yyyy");

        return (
            <div className="order-block">
                <div className="order-unit">
                    <div id="order-date" className="order-detail">
                        <p>ORDER PLACED</p>
                        <p>{formattedDate}</p>
                    </div>
                    <div id="order-total" className="order-detail">
                        <p>TOTAL</p>
                        <p>{"$placeholder"}</p>
                    </div>
                </div>
                <div className="order-unit">
                    {products.map((product) => (
                        <div key={product.id}>
                            <Link to={`/product/${id}`}>{product.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default OrderItem;
