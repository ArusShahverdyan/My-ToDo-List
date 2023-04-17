import { Component } from "react";
import { Container, Row, Col, InputGroup, Form, Button, Card } from 'react-bootstrap';
import { idGenerator } from "../utills/helpers";
class Todo extends Component {
    state = {
        tasks: [],
        newTaskTitle: "",
    }

    handleInputChange = (event) => {
        const newTaskTitle = event.target.value;
        this.setState({
            newTaskTitle
        });
    };

    addNewTask = () => {
        const newTask = {
            id: inGenerator(),
            title: this.state.newTaskTitle
        };
        const tasks = [... this.state.tasks]
        tasks.push(newTask);
        this.setState({ tasks })
    };
    render() {
        return (
            <div>
                <Container>
                    <Row className='justify-content-center'>
                        <Col xs='12' sm='8' md='6'  >
                            <InputGroup className="mb-3 mt-3">
                                <Form.Control
                                    placeholder="Task title "
                                    onChange={this.handleInputChange}
                                />
                                <Button
                                    variant="success"
                                    onClick={this.addNewTask}>
                                    Add
                                </Button>
                            </InputGroup>
                        </Col>

                    </Row>

                    <Row>
                        <Col xs="12" md="6" lg="3" >
                            <Card style={{ width: "18rem" }} className="mb-3">
                                <Card.Body>
                                    <Card.Title>Task title</Card.Title>
                                    <Card.Text>
                                        description
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs="12" md="6" lg="3">
                            <Card style={{ width: "18rem" }} className="mb-3 ">
                                <Card.Body>
                                    <Card.Title>Task title</Card.Title>
                                    <Card.Text>
                                        description
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs="12" md="6" lg="4">
                            <Card style={{ width: "18rem" }} className="mb-3" >
                                <Card.Body>
                                    <Card.Title>Task title</Card.Title>
                                    <Card.Text>
                                        description
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default Todo;