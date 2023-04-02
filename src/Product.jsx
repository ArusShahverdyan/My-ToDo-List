import { Component } from 'react';
import Description from './Description';
import Price from './Price';
import Name from './Name';


class Product extends Component{
  
    render(){
          return(
            <div>
              <Name text={this.props.name}/> : <Price value={this.props.price}/> : <Description message={this.props.description}/>
            </div>
          );
    }
}

export default Product;