import axios from "axios";
import { Component, Fragment } from "react";
import "./Quota.css";

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
    }

    render() {
        return (
            <Fragment>
                <h1>Quotas</h1>
                {
                    this.state.quotas.map((p) => {
                        return (
                            <div className="quota" key={p.id}>
                                <p>{p.amount} | {p.rt}</p>
                                <hr />
                            </div>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default Quota;