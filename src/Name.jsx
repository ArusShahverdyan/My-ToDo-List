import { Component } from "react";

class Name extends Component {
   
    render() {
        return (
            <div>
              name: {this.props.text}
            </div>
        );
    }
}
export default Name;