import { Component } from "react";
import PdpContent from "../components/PdpContent";

class PDP extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <PdpContent data={this.props.data}/>
        );
    }
}

export default PDP;