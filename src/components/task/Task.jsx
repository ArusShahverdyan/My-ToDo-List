import { memo } from 'react';
import { Col, Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faHistory, faPen } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { formatDate } from '../../utils/helpers';
import styles from "./task.module.css";



function Task(props) {
  const task = props.data;
  const taskDescription = task.description;
  const taskTitle = task.title;

  return (

    <Col xs={10} sm={6} md={4} lg={3} >
      <Card
        className={`mt-3 mb-2 ${task.status === 'done' ? styles.statusDone : styles.statusActive} `}
      >
        <Card.Body>
          <Form.Check
            className={styles.selectTask}
            onChange={() => props.onTaskSelect(task._id)}
            checked={props.checked}
            label={
              <Card.Title
                className={styles.textElipsis}
              >
                {taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1)}
              </Card.Title>
            }
          />

          <Card.Text
            className={`${styles.textElipsis} ${styles.descriptonHeight} `}
          >
            {taskDescription.charAt(0).toUpperCase() + taskDescription.slice(1)}
          </Card.Text>

          <Card.Text>
            <i>Status</i>: {task.status}
          </Card.Text>

          <Card.Text>
            <i>Created At</i>: {formatDate(task.created_at)}
          </Card.Text>

          <Card.Text>
            <i>Deadline</i>: {formatDate(task.date)}
          </Card.Text>

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