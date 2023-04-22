import { Modal, Button } from "react-bootstrap";

function ConfirmDialog(props) {
  return (
    <Modal
      size="sm"
      show={true}
      onHide={() => { }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Are you sure to delete {props.taskCount} task(s)?
       
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className="d-flex justify-content-evenly">

          <Button
            variant='danger'
            onClick={props.onSubmit}
          >
            Delete
          </Button>

          <Button
            variant='success'
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmDialog;