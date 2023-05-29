import { Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import styles from "./notFound.module.css";

export default function NotFound() {

    return (
        <Container >
            <Row className={`${styles.errorbg}`}>
                <Col >
                    <h1 className="text-center">404</h1>
                </Col>
            </Row>
            <Row>
                <Col >
                    <h2 className='text-center'>
                        Look like you're lost
                    </h2 >
                    <p className='text-center'>
                        The page you are looking for not available!
                        <br /> <Link to="/" className={styles.link_404} >
                            Go to Home
                        </Link>
                    </p>
                </Col>
            </Row>
        </Container>
  
    )
}