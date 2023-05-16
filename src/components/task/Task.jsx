import { memo } from 'react';
import { Col, Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faHistory, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatDate } from '../../utils/helpers';
import styles from "./task.module.css";



function Task(props) {
  const task = props.data;

  const taskDescription = task.description;
  const taskTitle = task.title;

  return (
    <Col sm={6} md={4} lg={3} >
      <Card
        className={`mt-3 mb-2 ${task.status === 'done' ? styles.statusDone : styles.statusActive} ${styles.task}`}
      >
        <Card.Body >

          <Card.Title className={styles.textElipsis} >
            <Form.Check
              className={styles.selectTask}
              onChange={() => props.onTaskSelect(task._id)}
              checked={props.checked}
            />
            {`${taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1)}`}
          </Card.Title>


          <Card.Text
            className={`${styles.textElipsis} ${styles.descripton} `}
          >
            {taskDescription.charAt(0).toUpperCase() + taskDescription.slice(1)}
          </Card.Text>

          <Card.Text
            className={styles.taskLinespacing}
          >
            <i>Status: {task.status}</i>
          </Card.Text>

          <Card.Text
            className={styles.taskLinespacing}
          >
            <i>Created At: {formatDate(task.created_at)}</i>
          </Card.Text>

          <Card.Text
            className={styles.taskLinespacing}
          >
            <i>Deadline: {formatDate(task.date)} </i>
          </Card.Text>

          <Link to={`/task/${task._id}`}>
            <Card.Text>
              <Button className = 'mb-2'variant="info">Show details</Button>
            </Card.Text>
          </Link>

          <div className={`${styles.actionButtons} `}>

            {task.status === 'active' ?
              <Button
                className={styles.actionButton}
                title="Mark as done"
                variant="light"
                onClick={() => props.onStatusChange({ status: 'done', _id: task._id })}
              >
                <FontAwesomeIcon icon={faCheck} size="xs" />
              </Button> :

              <Button
                className={styles.actionButton}
                title="Mark as active"
                variant="light"
                onClick={() => props.onStatusChange({ status: 'active', _id: task._id })}
              >
                <FontAwesomeIcon icon={faHistory} />
              </Button>
            }

            <Button
              className={styles.actionButton}
              variant="light"
              onClick={() => props.onTaskEdit(task)}
            >
              <FontAwesomeIcon icon={faPen} />
            </Button>

            <Button
              className={styles.actionButton}
              title="Delete"
              variant="light"
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