import React, { useState, useEffect } from "react";
import { ReactReduxContext } from "react-redux";

function Game() {
	const [strokeStyle, setStrokeStyle] = useState<string>("black");
	const [lineWidth, setLineWidth] = useState<number>(2);
	let prevX = 0;
	let prevY = 0;
	let currX = 0;
	let currY = 0;
	let flag = false;
	let dotFlag = false;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	useEffect(() => {
    canvas = document.getElementById("can") as HTMLCanvasElement;
		ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

		canvas.addEventListener("mousemove", function (e) {
				findxy("move", e)
		}, false);
		canvas.addEventListener("mousedown", function (e) {
				findxy("down", e)
		}, false);
		canvas.addEventListener("mouseup", function (e) {
				findxy("up", e)
		}, false);
		canvas.addEventListener("mouseout", function (e) {
				findxy("out", e)
		}, false);
  });

	const color = (obj: HTMLDivElement) => {
		setStrokeStyle(obj.id);
		if (obj.id === "white") {
			setLineWidth(14);
		}
		else {
			setLineWidth(2);
		}
	}

	const draw = () => {
		ctx.beginPath();
		ctx.moveTo(prevX, prevY);
		ctx.lineTo(currX, currY);
		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = lineWidth;
		ctx.stroke();
		ctx.closePath();
	}

	const erase = () => {

	}

	const save = () => {

	}

	const findxy = (res: string, e: MouseEvent) => {
		if (res === "down") {
			prevX = currX;
			prevY = currY;
			currX = e.clientX - canvas.offsetLeft;
			currY = e.clientY - canvas.offsetTop;

			flag = true
			dotFlag = true;
			// TODO: wut
			if (dotFlag) {
					ctx.beginPath();
					ctx.fillStyle = strokeStyle;
					ctx.fillRect(currX, currY, 2, 2);
					ctx.closePath();
					dotFlag = false;
			}
		}
		if (res === "up" || res === "out") {
			flag = false;
		}
		if (res === "move") {
			if (flag) {
				prevX = currX;
				prevY = currY;
				currX = e.clientX - canvas.offsetLeft;
				currY = e.clientY - canvas.offsetTop;
				draw();
			}
		}
	}

	return (
		<ReactReduxContext.Consumer>
			{({ store }) => {
				return (
					<>
						<p>
							Room: {store.getState().room}
						</p>
						<canvas id="can" width="400" height="400" style={{ position: "absolute", top: "10%", left: "10%", border: "2px solid" }}></canvas>
						<div onClick={ e => color(e.target as HTMLDivElement) } style={{ position: "absolute", top: "12%", left: "43%" }}>Choose Color</div>
						<div onClick={ e => color(e.target as HTMLDivElement) } style={{ position: "absolute", top: "15%", left: "45%", width: "10px", height: "10px", background: "green" }} id="green"></div>
						<div onClick={ e => color(e.target as HTMLDivElement) } style={{ position: "absolute", top: "15%", left: "46%", width: "10px", height: "10px", background: "blue" }} id="blue"></div>
						<div onClick={ e => color(e.target as HTMLDivElement) } style={{ position: "absolute", top: "15%", left: "47%", width: "10px", height: "10px", background: "red" }} id="red"></div>
						<div onClick={ e => color(e.target as HTMLDivElement) } style={{ position: "absolute", top: "17%", left: "45%", width: "10px", height: "10px", background: "yellow" }} id="yellow"></div>
						<div onClick={ e => color(e.target as HTMLDivElement) } style={{ position: "absolute", top: "17%", left: "46%", width: "10px", height: "10px", background: "orange" }} id="orange"></div>
						<div onClick={ e => color(e.target as HTMLDivElement) } style={{ position: "absolute", top: "17%", left: "47%", width: "10px", height: "10px", background: "black" }} id="black"></div>
						<div onClick={ e => color(e.target as HTMLDivElement) } style={{ position: "absolute", top: "22%", left: "45%", width: "15px", height: "15px", background: "white", border: "2px solid" }} id="white"></div>
						<div style={{ position: "absolute", top: "20%", left: "43%" }}>Eraser</div>
						<img id="canvasimg" style={{ position: "absolute", top: "10%", left: "52%" }} />
						<input type="button" value="save" id="btn" size={30} style={{ position: "absolute", top: "55%", left: "10%" }} />
						<input type="button" value="clear" id="clr" size={23} style={{ position: "absolute", top: "55%", left: "15%" }} />
					</>
				);
			}}
		</ReactReduxContext.Consumer>
	);
}

export default Game;
