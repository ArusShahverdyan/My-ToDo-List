import { Component } from "react";

class Price extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price:`${props.value} $`,
            exchangeRate:390,
        }
    }
    chahngeCurrency = () => {
        const {price, exchangeRate} = this.state;
        let modifiedPrice;
          if(price.endsWith('$')){
             modifiedPrice = parseFloat(price) * exchangeRate + '֏';
          }
          else{
             modifiedPrice = parseFloat(price)/exchangeRate + ' $';
              }
              this.setState({
                price: modifiedPrice,
            });
    };

    render() {
        return (
            <div>
                price: {this.state.price}
                <button onClick={this.chahngeCurrency}>change the currency</button>

            </div>
        );
    }
}


export default Price;