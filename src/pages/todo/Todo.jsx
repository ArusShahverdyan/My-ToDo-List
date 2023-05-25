
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { /*ToastContainer,*/ toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import Task from "../../components/task/Task";
import ConfirmDialog from "../../components/ConfirmDialog";
import DeleteSelected from "../../components/deleteSelected/DeleteSelected";
import TaskApi from "../../api/taskApi";
import TaskModal from "../../components/taskModal/TaskModal";
import Filters from "../../components/filters/Filters";
import styles from "./todo.module.css";
import { setTasksCount } from "../../redux/counter";
import { setLoader } from '../../redux/loading';
const taskApi = new TaskApi();

function Todo() {

  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editableTask, setEditableTask] = useState(null);

  const dispatch = useDispatch();

  const getTasks = (filters) => {
    dispatch(setLoader(true));
    taskApi.getAll(filters)
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => dispatch(setLoader(false)));
  };

  useEffect(() => {
    getTasks();
    //  eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(setTasksCount(tasks.length));
  }, [tasks.length, dispatch]);


  const onAddNewTask = (newTask) => {
    dispatch(setLoader(true));
    taskApi.add(newTask)
      .then((task) => {
        const tasksCopy = [...tasks];
        tasksCopy.push(task);

        setTasks(tasksCopy);
        setIsAddTaskModalOpen(false);
        toast.success('The task have been added successfully!');
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => dispatch(setLoader(false)));;
  };


  const onTaskDelete = (taskId) => {
    dispatch(setLoader(true));
    taskApi
      .delete(taskId)       //getAll(taskId)
      .then(() => {
        const newTasks = tasks.filter(task => task._id !== taskId);
        setTasks(newTasks);


        if (selectedTasks.has(taskId)) {
          const newSelectedTasks = new Set(selectedTasks);
          newSelectedTasks.delete(taskId);
          setSelectedTasks(newSelectedTasks)
        }
        toast.success("The task have been deleted successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => dispatch(setLoader(false)));
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
    dispatch(setLoader(true));
    taskApi
      .deleteMany([...selectedTasks])
      .then(() => {
        const newTasks = [];
        const deletedTasksCount = selectedTasks.size;
        tasks.forEach((task) => {
          if (!selectedTasks.has(task._id)) {
            newTasks.push(task);
          }
        });
        setTasks(newTasks);
        setSelectedTasks(new Set());
        toast.success(
          `${deletedTasksCount} tasks have been deleted successfully!`);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => dispatch(setLoader(false)));
  };


  const selectAllTasks = () => {
    const taskIds = tasks.map((task) => task._id);
    setSelectedTasks(new Set(taskIds));
  };

  const resetSelectedTasks = () => {
    setSelectedTasks(new Set());
  };

  const onEditTask = (editedTask) => {
    dispatch(setLoader(true));
    taskApi
      .update(editedTask)
      .then((task) => {
        const newTasks = [...tasks];
        const foundIndex = newTasks.findIndex((t) => t._id === task._id);
        newTasks[foundIndex] = task;
        toast.success(`Tasks have been updated successfully!`);
        setTasks(newTasks);
        setEditableTask(null);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => dispatch(setLoader(false)));
  };

  const onFilter = (filters) => {
    getTasks(filters);
  };


  return (
    <Container>

      <Row>
        <Col className={styles.addButton}>
          <Button
            variant="success"
            onClick={() => setIsAddTaskModalOpen(true)}>
            Add task
          </Button>
        </Col>
      </Row>

      <Row className="mt-3">
        <Filters onFilter={onFilter} />
      </Row>

      <Row >
        <Col xs="8" sm="4" md="3" className={styles.selectButton}>
          <Button
            variant="secondary"
            onClick={resetSelectedTasks}

          >
            Reset selected
          </Button>
        </Col>

        <Col xs="8" sm="4" md="3" className={styles.selectButton}>
          <Button
            variant="warning"
            onClick={selectAllTasks}
          >
            Select all
          </Button>
        </Col>
        <Col xs="8" sm="4" md="3" className={styles.selectButton}>
          <DeleteSelected
            disabled={!selectedTasks.size}
            taskCount={selectedTasks.size}
            onSubmit={deleteSelectedTasks}
          />
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
              checked={selectedTasks.has(task._id)}
              onTaskEdit={setEditableTask}
              onStatusChange={onEditTask}
            />
          );
        })}
      </Row>

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

      {editableTask && (
        <TaskModal
          onCancel={() => setEditableTask(null)}
          onSave={onEditTask}
          data={editableTask}
        />
      )}
      {/*       <ToastContainer
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
      /> */}
    </Container>
  )
}

export default Todo;


