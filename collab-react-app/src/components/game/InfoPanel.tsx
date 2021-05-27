import React from "react";
import "../../styles/styles.css"
import Button from "@material-ui/core/Button";
import GuessSpyPanel from "./GuessSpyPanel";
import { endGuess, startGuess } from "../../utils/serverUtils";
import { IPlayerColourMap } from "../../interfaces/Interfaces";

interface IProps {
	room: string;
	name: string;
	role: string;
	playerNames: string[];
	guessingPlayer: string;
	playerColourMap: IPlayerColourMap
	word?: string;
}

const ClassName = "container-infoPanel";

function InfoPanel(props: IProps) {
	const onGuessPressed = () => {
		startGuess(props.room, props.name);
	}

	const onClose = () => {
		endGuess(props.room);
	}

	return (
		<div className={ClassName}>
			<div>Room: {props.room}</div>
			<div>Role: {props.role}</div>
			{
				!!props.word &&
					<>
						<div>Word: {props.word}</div>
						<Button
							variant="contained"
							color="primary"
							onClick={() => onGuessPressed()}
						>
							Guess the spy
						</Button>
					</>
			}
			<GuessSpyPanel
				key={props.guessingPlayer}
				name={props.name}
				room={props.room}
				playerNames={props.playerNames}
				open={!!props.guessingPlayer}
				onClose={() => onClose()}
				guessingPlayer={props.guessingPlayer}
				playerColourMap={props.playerColourMap}
			/>
		</div>
	);
}

export default InfoPanel;
