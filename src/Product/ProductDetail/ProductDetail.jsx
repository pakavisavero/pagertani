import { render } from "@testing-library/react";
import { Component, Fragment } from "react";
import { useLocation, useParams, useNavigate } from 'react-router-dom';

function ProductDetail(props) {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <Fragment>
            <h2 className="product__title">{state.name}</h2>
            <img className="product__image" src={state.image} alt="" />
            <p className="product__desc">{state.desc}</p>
            <p className="product__price">Rp. {state.price},00-</p>
            <p className="product__cap">{state.capacity}{state.type}</p>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </Fragment>
    );
}

export default ProductDetail;