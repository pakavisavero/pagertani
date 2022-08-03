import axios from "axios";
import { Link } from "react-router-dom";
import Toast from "../../component/toast/Toast";
import { CartValue } from "../../state/CartState";
import styles from './Cart.module.css';
import ShowToast from "../../component/toast/ShowToast";
const { Component, Fragment, useContext, useState } = require("react");

function Cart(props) {
    const { cart, setCart } = useContext(CartValue);
    const [toast, setToast] = useState([]);

    const getCart = () => {
        axios.get("http://127.0.0.1:8000/api/v1/carts").then((res) => {
            setCart([...res.data["data"]]);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const deleteCart = (id) => {
        axios.post("http://127.0.0.1:8000/api/v1/delete-cart", {
            id: id

        }).then((res) => {
            console.log("Masuk sini");
            setToast([ShowToast('success', "Delete data succeed!")]);
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
                        <th>Image</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((c) => {
                            return (
                                <tr key={c.id}>
                                    <td>
                                        <img style={{"width": "60px", "height": "60px"}} src={`/images/${c.image}`} alt="" />
                                    </td>
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
                    <Toast toastlist={toast} position="buttom-right"/>
                </tbody>
            </table>
        </Fragment>
    )
}


export default Cart;