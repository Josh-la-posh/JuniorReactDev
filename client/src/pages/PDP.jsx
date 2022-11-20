import { PureComponent } from "react";
import PdpContent from "../components/PdpContent";

class PDP extends PureComponent {
    render() {
        return (
            <PdpContent product={this.props.product}/>
        );
    }
}

export default PDP;