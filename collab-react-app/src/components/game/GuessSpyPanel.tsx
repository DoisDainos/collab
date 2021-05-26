import React from "react";
import "../../styles/styles.css"
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { submitGuess } from "../../utils/serverUtils";

interface IProps {
  name: string;
  room: string;
  playerNames: string[];
  open: boolean;
  onClose: () => void;
  guessingPlayer: string;
}

const ClassName = {
  container: "modal-body"
}

function GuessSpyPanel(props: IProps) {
  const onSubmit = (name: string) => {
    submitGuess(props.room, name);
    props.onClose();
  }

	return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {
        <div className={ClassName.container}>
          {
            props.guessingPlayer === props.name ?
              props.playerNames.map((name, index) => {
                if (name !== props.name) {
                  return <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onSubmit(name)}
                    key={index}
                  >
                    {name}
                  </Button>
                }
              })
            :
              <div>{props.guessingPlayer} is guessing!</div>
          }
        </div>
      }
    </Modal>
	);
}

export default GuessSpyPanel;
