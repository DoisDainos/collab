import React from "react";
import "../../styles/styles.css"
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { submitGuess } from "../../utils/serverUtils";
import { IPlayerColourMap } from "../../interfaces/Interfaces";

interface IProps {
  name: string;
  room: string;
  playerNames: string[];
  open: boolean;
  onClose: () => void;
  guessingPlayer: string;
  playerColourMap: IPlayerColourMap;
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
                    onClick={() => onSubmit(name)}
                    key={index}
                    style={{
                      backgroundColor: props.playerColourMap[name],
                      color: "#fff"
                    }}
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
