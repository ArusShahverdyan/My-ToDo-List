import { Component } from "react";

class Description extends Component {
   
    render() {
        return (
            <div>
                description: {this.props.message}
            </div>
        );
    }
}
export default Description;