import axios from "axios";
import { Component } from "react";
import "./Quota.css";
import QuotaCard from "./QuotaCard/QuotaCard";

class Quota extends Component {
    state = {
        quotas: []
    }

    getQuotaAPI = () => {
        axios.get("http://127.0.0.1:8000/api/v1/quotas").then((res) => {
            this.setState({
                quotas: res.data["data"]
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    componentDidMount() {   
        this.getQuotaAPI();
        console.log("test");
    }
    
    
    render() {
        return (
            <QuotaCard data={this.state.quotas}/>
        )
    }
}

export default Quota;