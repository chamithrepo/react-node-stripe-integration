
import React, { Component, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import StripeCheckout from "react-stripe-checkout";
import Axios from './axios-instance';
import MacImage from './macbook.jpg'


const Checkout = () => {

    const [product, setProduct] = useState({
        name: "MacBook Air 11",
        price: 1159
    })

    const onPay = (token) => {

        Axios({
            method: `post`,
            url: `http://localhost:8181/payment`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            data: {
                token: token,
                product: product
            }
        }).then(response => {
            console.log(response)
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className="container">
            <h2 align="center">{product.name}</h2>
            <div><img src={MacImage} /></div>

            <Form.Group controlId="formBasicEmail">

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Color</Form.Label>
                    <Form.Control as="select">
                        <option>Silver</option>
                        <option>Grey</option>
                    </Form.Control>
                    <br />
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control text="email" />
                </Form.Group>
            </Form.Group>
            <StripeCheckout
                image={MacImage}
                name={product.name}
                description={product.name}
                token={onPay}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <Button variant="primary" size="lg">Pay ${product.price}</Button></StripeCheckout>
        </div>
    );
}


export default Checkout;