
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

import Task from "../task/Task";
import ConfirmDialog from "../ConfirmDialog";
import DeleteSelected from "../deleteSelected/DeleteSelected";
import TaskApi from "../../api/taskApi";
import TaskModal from "../taskModal/TaskModal";



const taskApi = new TaskApi();

function Todo() {

  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);



  useEffect(() => {
    taskApi.getAll()
      .then((tasks) => {
        setTasks(tasks);
      });
  }, []);


  const onAddNewTask = (newTask) => {
 
    taskApi.add(newTask)
      .then((task) => {
        const tasksCopy = [...tasks];
        tasksCopy.push(task);
        setTasks(tasksCopy);
        setIsAddTaskModalOpen(false);
        toast.success('The task has been added successfully!');
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.message);
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
  };


  const deleteSelectedTasks = () => {
    const newTasks = [];
    tasks.forEach((task) => {
      if (!selectedTasks.has(task._id)) {
        newTasks.push(task);
      }
    });
       setTasks(newTasks);
        setSelectedTasks(new Set());
        toast.success('The task has been deleted successfully!');
  };


  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="12" sm="8" md="6">
          <Button
          className="m-5"
            variant="success"
            onClick={() => setIsAddTaskModalOpen(true)}>
            ADD
          </Button>
        </Col>
      </Row>
      <Row >
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
      {isAddTaskModalOpen && (
        <TaskModal
          onCancel={() => setIsAddTaskModalOpen(false)}
          onSave={onAddNewTask}
        />
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  )
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
