import axios from "axios";
import React, { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import CustomLabel from "../../../component/CustomLabel";
import styles from './QuotaDetail.module.css';

function QuotaDetail(props) {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [quota, setQuota] = useState({
        id: state.id,
        rt: state.rt,
        amount: state.amount,
    });


     function handleOnUpdate() {
        axios.post('http://127.0.0.1:8000/api/v1/quota', {
            id: quota.id,
            amount: quota.amount,

        }).then((res) => {
            navigate('/quota', { replace: true, state: {
                "success": true
            } })
        })
    }

    function handleOnChange(e) {
        const { name, value } = e.target;
        setQuota(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <Fragment>
            <CustomLabel name="Nama RT" />
            <input name="rt" type="text"  className={`form-control mb-3`} defaultValue={state.rt} disabled/>

            <CustomLabel name="Kapasitas Maksimum" />
            <input name="amount" type="number"  className={`form-control mb-3`} defaultValue={state.amount} onChange={handleOnChange}/>

            <button className={`btn btn-secondary  ${styles.buttonBack}`} onClick={() => navigate(-1)}>Back</button>
            <button className={`btn btn-primary`} onClick={handleOnUpdate}>Update</button>
        </Fragment>
    );
}

export default QuotaDetail;