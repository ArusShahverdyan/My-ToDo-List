import { Container, Row, Col } from "react-bootstrap";
import styles from './about.module.css';

export default function About(){
    return(
      
        <Container >
            <Row className = {styles.aboutBG}>

            </Row>
            <Row >
               <Col>
               <h3 className='text-center mt-3 text-primary'>
               We are the participants of AGBU "Women Coders" program React JS course.<br/>
               And this is my graduation work.
                    </h3 >
               </Col>  
            </Row>
       </Container>
      
    );
}