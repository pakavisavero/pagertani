import { render } from "@testing-library/react";
import axios from "axios";
import { Component, Fragment, useState } from "react";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();
    const [product, setProduct] = useState({
        id: state.id,
        name: state.name,
        desc: state.desc,
        price: state.price,
        capacity: state.capacity
    });

    function handleOnUpdate() {
        axios.post('http://127.0.0.1:8000/api/v1/product', {
            id: product.id,
            name: product.name,
            desc: product.desc,
            price: product.price,
            capacity: product.capacity,

        }).then((res) => {
            navigate(-1)

        })
    }

    function handleOnChange(e) {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);

        setProduct(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <Fragment>
            <img className="product__image__detail mb-5" src={state.image} alt="" />

            <Label name="Nama Produk" />
            <input name="name" type="text" className="product__title form-control mb-3" defaultValue={state.name} onChange={handleOnChange}/>

            <Label name="Deskripsi Produk" />
            <textarea name="desc" className="product__desc form-control mb-3" type="text" defaultValue={state.desc} onChange={handleOnChange} />

            <Label name="Harga" />
            <input name="price" type="number" className="product__price form-control mb-3" defaultValue={state.price} onChange={handleOnChange}/>

            <Label name="Stock" />
            <input name="capacity" type="number" className="product__cap form-control mb-3" defaultValue={state.capacity} onChange={handleOnChange}/>

            <button className="btn btn-secondary button-back" onClick={() => navigate(-1)}>Back</button>
            <button className="btn btn-primary" onClick={handleOnUpdate} >Update</button>
        </Fragment>
    );
}

const Label = (props) => {
    return (
        <label className="custom-file-label mb-2">{props.name}</label>
    )
}

export default ProductDetail;