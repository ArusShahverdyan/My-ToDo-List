import { useState } from "react";
import { Button } from "react-bootstrap";
import ConfirmDialog from "../ConfirmDialog";
import styles from "./deleteSelected.module.css";

function DeleteSelected(props) {
   
  
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const toggleConfirmDialog = () => {
    setIsConfirmDialogOpen(!isConfirmDialogOpen);
  };
     const handleClick = event => {
    event.target.disabled = true;
    console.log('button clicked');
  };

  return (
    <>
      <Button
      className={styles.deletSelected}
        variant="danger"
        onClick={toggleConfirmDialog}
       disabled={props.disabled}         
      >
             Delete selected
      </Button>
      {isConfirmDialogOpen && (
        <ConfirmDialog
          tasksCount={props.tasksCount}
          onCancel={toggleConfirmDialog}
          onSubmit={()=>{
            props.onSubmit();
            toggleConfirmDialog();
          }}
        />
      )}
    </>
  );
}

export default DeleteSelected;