import { Component } from "react";

class Name extends Component {
   
    render() {
        return (
            <span>
                {this.props.text}
            </span>
        );
    }
}
export default Name;