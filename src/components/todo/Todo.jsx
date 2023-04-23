
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, InputGroup, Form, Button, CardGroup, Card } from "react-bootstrap";
import Task from "../task/Task";
import ConfirmDialog from "../ConfirmDialog";
import DeleteSelected from "../deleteSelected/DeleteSelected";
//import styles from './todo.module.css';


function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleInputChange = (event) => {
    setNewTaskTitle(event.target.value);

  };

  const handleInputKeyDown = (event) => {
    if (event.code === "Enter") {
      addNewTask();
    }
  };

  const addNewTask = () => {
    const trimmedTitle = newTaskTitle.trim();
    if (!trimmedTitle) {
      return;
    }

    const apiUrl = "http://localhost:3001/task";

    const newTask = {
      title: trimmedTitle,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask),
    })
      .then((result) => result.json())
      .then((task) => {
        const tasksCopy = [...tasks];
        tasksCopy.push(task);
        setTasks(tasksCopy);
        setNewTaskTitle("");

      });



  };

  const onTaskDelete = (taskId) => {
    const newTasks = tasks.filter(task => task._id !== taskId);
    setTasks(newTasks);

    if (selectedTasks.has(taskId)) {
      const newSelectedTasks = new Set(selectedTasks);
      newSelectedTasks.delete(taskId);
      setSelectedTasks(newSelectedTasks)
    }
  };

  const onTaskSelect = (taskId) => {
    const selectedTasksCopy = new Set(selectedTasks);
    if (selectedTasksCopy.has(taskId)) {
      selectedTasksCopy.delete(taskId);
    }
    else {
      selectedTasksCopy.add(taskId);
    }
    setSelectedTasks(selectedTasksCopy);
  }

  const deleteSelectedTasks = () => {
    const newTasks = [];
    tasks.forEach((task) => {
      if (!selectedTasks.has(task._id)) {
        newTasks.push(task);
      }
    });
    setTasks(newTasks);
    setSelectedTasks(new Set());
    setIsConfirmDialogOpen(false);

  };

  const toggleConfirmDialog = () => {
    setIsConfirmDialogOpen(!isConfirmDialogOpen);
  }


  const isAddNewTaskButtonDisabled = !newTaskTitle.trim();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="12" sm="8" md="6">
          <InputGroup className="mb-3 mt-4">
            <Form.Control
              placeholder="Task title"
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              value={newTaskTitle}
            />
            <Button
              variant="success"
              onClick={addNewTask}
              disabled={isAddNewTaskButtonDisabled}
            >
              Add
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {tasks.map((task) => {
          return (
            <Task
              data={task}
              key={task._id}
              onTaskDelete={setTaskToDelete}
              onTaskSelect={onTaskSelect}
            />
          );
        })}
      </Row>
      <DeleteSelected
        disabled={!selectedTasks.size}
        taskCount={selectedTasks.size}
        onSubmit={deleteSelectedTasks}
      />

      {taskToDelete && (
        <ConfirmDialog
          taskCount={1}
          onCancel={() => setTaskToDelete(null)}
          onSubmit={() => {
            onTaskDelete(taskToDelete);
            setTaskToDelete(null);
          }}
        />
      )}
    </Container>
  );
}


export default Todo;

//  <Card>
//         <Card.Footer>
//         <Button
//             // className={styles.deletSelected}
//             variant="danger"
//             onClick={this.openConfirmDialog}
//             disabled={!selectedTasks.size}
//           >
//             Delete selected
//           </Button>
//         </Card.Footer>
//       </Card>
