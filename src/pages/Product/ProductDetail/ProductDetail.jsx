import axios from "axios";
import { Component, Fragment, useState } from "react";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import CustomLabel from '../../../component/CustomLabel';

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
            navigate('/product', { replace: true, state: {
                "success": true
            } })
        })
    }

    function handleOnChange(e) {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <Fragment>
            <img className={`mb-5 ${styles.product__image__detail}`} src={`/images/${state.image}`} alt="" />

            <CustomLabel name="Nama Produk" />
            <input name="name" type="text" className={`form-control mb-3 ${styles.product__title}`} defaultValue={state.name} onChange={handleOnChange}/>

            <CustomLabel name="Deskripsi Produk" />
            <textarea name="desc" className={`form-control mb-3 ${styles.product__desc}`} type="text" defaultValue={state.desc} onChange={handleOnChange} />

            <CustomLabel name="Harga" />
            <input name="price" type="number" className={`form-control mb-3 ${styles.product__price}`} defaultValue={state.price} onChange={handleOnChange}/>

            <CustomLabel name="Stock" />
            <input name="capacity" type="number" className={`form-control mb-3 ${styles.product__capacity}`} defaultValue={state.capacity} onChange={handleOnChange}/>

            <button className={`btn btn-secondary ${styles.buttonBack}`} onClick={() => navigate(-1)}>Back</button>
            <button className="btn btn-primary" onClick={handleOnUpdate} >Update</button>
        </Fragment>
    );
}

export default ProductDetail;