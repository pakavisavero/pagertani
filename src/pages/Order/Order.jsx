import axios from "axios";
import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styles from "./Order.module.css";

const Order = () => {
    const [orders, setOrder] = useState([]);

    const getOders = () => {
        axios.get("http://127.0.0.1:8000/api/v1/orders").then((res) => {
            setOrder([...res.data["data"]]);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const convertDate = (posting_date) => {
        const dateObject = new Date(posting_date * 1000)
        const day = dateObject.toLocaleString("en-US", {day: "numeric"}) // 9
        const month = dateObject.toLocaleString("en-US", {month: "long"}) // December
        const year = dateObject.toLocaleString("en-US", { year: "numeric" }) // 2019

        return `${day} ${month} ${year}`;
    }

    useEffect(() => {
        getOders();
    }, [orders]);

    return (
        <Fragment>
            {
                orders.length > 0 ? (
                    orders.map((order) => {
                        return (
                            <div className={`${styles.dropShadow} card mb-4`} key={order.id}>
                                <h5 className="card-header">{order.code}</h5>
                                <div className="card-body">
                                    <h5 className="card-title mb-4">{convertDate(order.created_at)}</h5>
                                    <Link to={`/order/${order.id}`} state={ order }>
                                        <button className="btn btn-primary">Detail</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <h1>No data in Orders</h1>
                )
            }
        </Fragment>
    )
}

export default Order;