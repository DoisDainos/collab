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
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ position: "absolute", top: "12%", left: "43%" }}>Choose Color</div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ position: "absolute", top: "15%", left: "45%", width: "10px", height: "10px", background: "green" }} id="green"></div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ position: "absolute", top: "15%", left: "46%", width: "10px", height: "10px", background: "blue" }} id="blue"></div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ position: "absolute", top: "15%", left: "47%", width: "10px", height: "10px", background: "red" }} id="red"></div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ position: "absolute", top: "17%", left: "45%", width: "10px", height: "10px", background: "yellow" }} id="yellow"></div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ position: "absolute", top: "17%", left: "46%", width: "10px", height: "10px", background: "orange" }} id="orange"></div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ position: "absolute", top: "17%", left: "47%", width: "10px", height: "10px", background: "black" }} id="black"></div>
  			<div onClick={ e => setColor(e.target as HTMLDivElement) } style={{ position: "absolute", top: "22%", left: "45%", width: "15px", height: "15px", background: "white", border: "2px solid" }} id="white"></div>
  			<div style={{ position: "absolute", top: "20%", left: "43%" }}>Eraser</div>
  	</>
	);
}

export default Palette;
