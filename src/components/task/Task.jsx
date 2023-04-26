import { memo } from 'react';
import { Col, Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faCheck, faHistory } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { formatDate } from '../../utils/helpers';
import styles from "./task.module.css";



function Task(props) {
  const task = props.data;
 

  return (
    <Col xs={8} sm={6} md={4} lg={3} >
      <Card 
      className={`mt-3 mb-2 ${task.status === 'done' ? styles.statusDone : styles.statusActive}`}
       >
        <Card.Body 
        >
          <Form.Check
            className={styles.selectTask}
            onChange={() => props.onTaskSelect(task._id)}
            checked={props.checked}
            label = {
              <Card.Title className={styles.textElipsis} >
            {task.title}
          </Card.Title>
            }
          />
          
          <Card.Text className={styles.textElipsis}>
            {task.description}
          </Card.Text>

          <Card.Text>Status: {task.status}</Card.Text>
          <h6>Created At</h6>
          <Card.Text> {formatDate(task.created_at)}</Card.Text>
          <h6>Deadline</h6>
          <Card.Text>{formatDate(task.date)}</Card.Text>
          <div className={`${styles.actionButtons} ` }>

            {task.status === 'active' ?
              <Button
                title="Mark as done"
                variant="success"
                onClick={() => props.onStatusChange({ status: 'done', _id: task._id })}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button> :

              <Button
                title="Mark as active"
                variant="info"
                onClick={() => props.onStatusChange({ status: 'active', _id: task._id })}>
                <FontAwesomeIcon icon={faHistory} />
              </Button>
            }
            
            <Button
              className='m-1'
              variant="warning"
              onClick={() => props.onTaskEdit(task)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              title="Delete"
              variant="danger"
              className={styles.actionButton}
              onClick={() => props.onTaskDelete(task._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

Task.propTypes = {
  data: PropTypes.object.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskSelect: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,

};
export default memo(Task);