import React from "react";

interface IProps {
  setStrokeStyle: (id: string) => void;
  setLineWidth: (width: number) => void;
}

function Palette(props: IProps) {

	const setColor = (obj: HTMLDivElement) => {
		props.setStrokeStyle(obj.id);
		if (obj.id === "white") {
			props.setLineWidth(14);
		}
		else {
			props.setLineWidth(2);
		}
	}

	return (
  	<>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) }>Choose Color</div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ width: "10px", height: "10px", background: "green" }} id="green"></div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ width: "10px", height: "10px", background: "blue" }} id="blue"></div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ width: "10px", height: "10px", background: "red" }} id="red"></div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ width: "10px", height: "10px", background: "yellow" }} id="yellow"></div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ width: "10px", height: "10px", background: "orange" }} id="orange"></div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ width: "10px", height: "10px", background: "black" }} id="black"></div>
  	</>
	);
}

export default Palette;
