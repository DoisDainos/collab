import React from "react";
import "../../styles/styles.css"
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

interface IProps {
  room: string;
  open: boolean;
  onClose: () => void;
}

const ClassName = {
  container: "modal-body",
  content: "modal-invalid-content",
  button: "modal-invalid-button"
}

function InvalidRoomModal(props: IProps) {
	return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {
        <div className={ClassName.container}>
          <div className={ClassName.content}>
            Room {props.room} doesn't exist
          </div>
          <Button
            variant="contained"
            onClick={() => props.onClose()}
            className={ClassName.button}
          >
            Close
          </Button>
        </div>
      }
    </Modal>
	);
}

export default InvalidRoomModal;
