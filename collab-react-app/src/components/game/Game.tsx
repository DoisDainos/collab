import React, { useState, useEffect } from "react";
import { ReactReduxContext, useSelector } from "react-redux";
import { IPlayerState, ILine, ILineWithStyle } from "../../interfaces/Interfaces";
import { submitLines } from "../../utils/serverUtils";

function Game() {
	const lines = useSelector<IPlayerState>(state => state.canvasLines) as ILineWithStyle[];
	const roomCode = useSelector<IPlayerState>(state => state.room) as string;
	const playerName = useSelector<IPlayerState>(state => state.name) as string;

	let strokeStyle = "black";
	let lineWidth = 2;
	const line: ILine = {
		startX: 0,
		startY: 0,
		endX: 0,
		endY: 0
	}
	let linesToSend: ILine[] = [];
	let alreadySent = false; // If mouseUp, send straight away so this prevents the timer sending
	let flag = false;
	let dotFlag = false;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	useEffect(() => {
		canvas = document.getElementById("can") as HTMLCanvasElement;
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
		strokeStyle = obj.id;
		if (obj.id === "white") {
			lineWidth = 14;
		}
		else {
			lineWidth = 2;
		}
	}

	const draw = (line: ILine | ILineWithStyle) => {
		setCanvas();
		ctx.beginPath();
		ctx.moveTo(line.startX, line.startY);
		ctx.lineTo(line.endX, line.endY);
		if ("strokeStyle" in line) {
			ctx.strokeStyle = line.strokeStyle;
		} else {
			ctx.strokeStyle = strokeStyle;
		}
		if ("lineWidth" in line) {
			ctx.lineWidth = line.lineWidth;
		} else {
			ctx.lineWidth = lineWidth;
		}
		ctx.stroke();
		ctx.closePath();
	}

	// const erase = () => {
	//
	// }
	//
	// const save = () => {
	//
	// }

	const findxy = (res: string, e: MouseEvent) => {
		setCanvas();
		if (res === "down") {
			alreadySent = false;
			setTimeout(() => {
				if (!alreadySent) {
					console.log(linesToSend);
					submitLines(roomCode, playerName, linesToSend, strokeStyle, lineWidth);
					linesToSend = [];
				}
			}, 1000);
			line.startX = line.endX;
			line.startY = line.endY;
			line.endX = e.clientX - canvas.offsetLeft;
			line.endY = e.clientY - canvas.offsetTop;

			flag = true
			dotFlag = true;
			// TODO: wut
			if (dotFlag) {
					ctx.beginPath();
					ctx.fillStyle = strokeStyle;
					ctx.fillRect(line.endX, line.endY, 2, 2);
					ctx.closePath();
					dotFlag = false;
			}
		}
		if (res === "up" || res === "out") {
			flag = false;
			if (!alreadySent) {
				submitLines(roomCode, playerName, linesToSend, strokeStyle, lineWidth);
				linesToSend = [];
			}
			alreadySent = true;
		}
		if (res === "move") {
			if (flag) {
				line.startX = line.endX;
				line.startY = line.endY;
				line.endX = e.clientX - canvas.offsetLeft;
				line.endY = e.clientY - canvas.offsetTop;
				linesToSend.push(Object.assign({}, line));
				draw(line);
			}
		}
	}

	const addLinesFromServer = () => {
		for (const line of lines) {
			draw(line);
		}
	}

	const setCanvas = () => {
		if (!ctx) {
			if (!canvas) {
				canvas = document.getElementById("can") as HTMLCanvasElement;
			}
			ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		}
	}

	return (
		<ReactReduxContext.Consumer>
			{({ store }) => {
				addLinesFromServer();
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
