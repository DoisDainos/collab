import React from "react";
import "../../styles/styles.css"

interface IProps {
	room: string;
	role: string;
	word?: string;
}

const ClassName = "container-infoPanel";

function InfoPanel(props: IProps) {
	return (
		<div className={ClassName}>
			<div>Room: {props.room}</div>
			<div>Role: {props.role}</div>
			{ !!props.word &&
				<div>Word: {props.word}</div>
			}
		</div>
	);
}

export default InfoPanel;
