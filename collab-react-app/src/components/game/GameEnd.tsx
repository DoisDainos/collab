import React from "react";
import "../../styles/styles.css"

interface IProps {
  guessedSpy: boolean;
  spy: string;
  playerName: string;
}

const ClassName = "container-gameEnd";

function GameEnd(props: IProps) {
  const renderGameEnd = (): JSX.Element => {
    if (props.guessedSpy && props.spy === props.playerName) {
      return <div>Guess the word!</div>
    } else if (props.guessedSpy) {
      return <div>{props.spy}, guess the word!</div>
    } else if (props.spy === props.playerName) {
      return <div>{props.spy} wins!</div>
    }
    return <div>You win!</div>
  }

	return (
		<div className={ClassName}>
      { renderGameEnd() }
		</div>
	);
}

export default GameEnd;
