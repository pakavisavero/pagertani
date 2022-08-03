import axios from "axios";
import { Link } from "react-router-dom";
import { CartValue } from "../../state/CartState";
const { Component, Fragment, useContext } = require("react");

function Cart(props) {
    const { cart, setCart } = useContext(CartValue);

    const getCart = () => {
        axios.get("http://127.0.0.1:8000/api/v1/carts").then((res) => {
            console.log(res.data["data"]);
            setCart([...res.data["data"]]);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const deleteCart = (id) => {
        axios.post("http://127.0.0.1:8000/api/v1/delete-cart", {
            id: id

        }).then((res) => {
            getCart();

        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((c) => {
                            return (
                                <tr>
                                    <td>{c.name}</td>
                                    <td>{c.amount}</td>
                                    <td>
                                        <button onClick={() => deleteCart(c.id)} className="btn btn-secondary btn-sm">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    <button className="btn btn-primary mt-4">Checkout</button>
                </tbody>
            </table>
        </Fragment>
    )
}


export default Cart;