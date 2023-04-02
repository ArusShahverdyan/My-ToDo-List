import { Component } from "react";

class Description extends Component {
   
    render() {
        return (
            <span>
                {this.props.message}
            </span>
        );
    }
}
export default Description;