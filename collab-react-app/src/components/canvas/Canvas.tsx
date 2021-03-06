import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IPlayerColourMap, IPlayerState, ILine, ILineFromPlayer, ILineWithStyle } from "../../interfaces/Interfaces";
import { submitLines } from "../../utils/serverUtils";
import Palette from "./Palette";

interface IProps {
  canDraw: boolean;
  showPalette: boolean;
  onEndStroke: () => void;
}

function Canvas(props: IProps) {
	const lines = useSelector<IPlayerState>(state => state.canvasLines) as ILineFromPlayer[];
	const roomCode = useSelector<IPlayerState>(state => state.room) as string;
	const playerName = useSelector<IPlayerState>(state => state.name) as string;
  const playerColourMap = useSelector<IPlayerState>(state => state.playerColourMap) as IPlayerColourMap;
	useSelector<IPlayerState>(state => state.role) as string;

	let strokeStyle = playerColourMap[playerName];
	let lineWidth = 2;
	const line: ILine = {
		startX: 0,
		startY: 0,
		endX: 0,
		endY: 0
	}
	let linesToSend: ILine[] = [];
	let alreadySent = false; // If mouseUp, send straight away so this prevents the timer sending
	let dotFlag = false;
  let pressedFlag = false;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	useEffect(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
		if (canvas && props.canDraw) {
      setCanvas();
			canvas.addEventListener("mousemove", handleMouseMove);
			canvas.addEventListener("mousedown", handleMouseDown);
			canvas.addEventListener("mouseup", handleMouseUp);
			canvas.addEventListener("mouseout", handleMouseOut);
      canvas.addEventListener("touchmove", handleMouseMove);
			canvas.addEventListener("touchstart", handleMouseDown);
			canvas.addEventListener("touchend", handleMouseUp);
			canvas.addEventListener("touchcancel", handleMouseOut);
		}
    addLinesFromServer();
    return function cleanup() {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseout", handleMouseOut);
      canvas.removeEventListener("touchmove", handleMouseMove);
			canvas.removeEventListener("touchstart", handleMouseDown);
			canvas.removeEventListener("touchend", handleMouseUp);
			canvas.removeEventListener("touchcancel", handleMouseOut);
    }
  }, [props.canDraw]);

  const handleMouseDown = (e: Event) => {
    pressedFlag = true;
    alreadySent = false;
    setTimeout(() => {
      if (!alreadySent) {
        const adjustedLines = resizeLinesForServer(linesToSend);
        submitLines(roomCode, playerName, adjustedLines, strokeStyle, lineWidth);
        linesToSend = [];
      }
    }, 1000);
    line.startX = line.endX;
    line.startY = line.endY;
    if ((e as MouseEvent).clientX) {
      line.endX = (e as MouseEvent).clientX - canvas.offsetLeft;
      line.endY = (e as MouseEvent).clientY - canvas.offsetTop;
    } else if ((e as TouchEvent).touches) {
      line.endX = (e as TouchEvent).touches[0].clientX - canvas.offsetLeft;
      line.endY = (e as TouchEvent).touches[0].clientY - canvas.offsetTop;
    }

    dotFlag = true;
    // TODO: send this drawing to server
    if (dotFlag) {
      ctx.beginPath();
      ctx.fillStyle = strokeStyle;
      ctx.fillRect(line.endX, line.endY, 2, 2);
      ctx.closePath();
      dotFlag = false;
    }
  }

  const handleMouseMove = (e: Event) => {
    e.preventDefault();
    if (pressedFlag) {
      line.startX = line.endX;
      line.startY = line.endY;
      if ((e as MouseEvent).clientX) {
        line.endX = (e as MouseEvent).clientX - canvas.offsetLeft;
        line.endY = (e as MouseEvent).clientY - canvas.offsetTop;
      } else if ((e as TouchEvent).touches) {
        line.endX = (e as TouchEvent).touches[0].clientX - canvas.offsetLeft;
        line.endY = (e as TouchEvent).touches[0].clientY - canvas.offsetTop;
      }
      linesToSend.push(Object.assign({}, line));
      draw(line);
    }
  }

  const handleMouseUp = () => {
    if (pressedFlag && !alreadySent) {
      const adjustedLines = resizeLinesForServer(linesToSend);
      submitLines(roomCode, playerName, adjustedLines, strokeStyle, lineWidth);
      linesToSend = [];
      props.onEndStroke();
    }
    pressedFlag = false;
  }

  const handleMouseOut = () => {
    handleMouseUp();
  }

	const draw = (line: ILine | ILineFromPlayer | ILineWithStyle) => {
		setCanvas();
		ctx.beginPath();
		ctx.moveTo(line.startX, line.startY);
		ctx.lineTo(line.endX, line.endY);
    if ("playerName" in line) {
			ctx.strokeStyle = playerColourMap[line.playerName];
    } else if (playerColourMap[playerName]) {
			ctx.strokeStyle = playerColourMap[playerName];
		} else if ("strokeStyle" in line) {
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

	const addLinesFromServer = () => {
    const adjustedLines = resizeLinesForCanvas(lines);
		for (const line of adjustedLines) {
			draw(line);
		}
	}

	const setCanvas = () => {
		if (!ctx) {
			if (!canvas) {
				canvas = document.getElementById("canvas") as HTMLCanvasElement;
			}
			ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		}
	}

  const setStrokeStyle = (id: string) => {
    strokeStyle = id;
  }

  const setLineWidth = (width: number) => {
    lineWidth = width;
  }

  let canvasWidth = 0.8 * window.innerWidth;
  let canvasHeight = canvasWidth;
  if (canvasHeight > window.innerHeight) {
    canvasWidth = 0.6 * window.innerHeight;
    canvasHeight = canvasWidth;
  }

  const resizeLinesForCanvas = (lines: ILineFromPlayer[]): ILineFromPlayer[] => {
    const adjustedLines: ILineFromPlayer[] = [];
    for (const line of lines) {
      adjustedLines.push({
        startX: line.startX * canvasWidth,
        endX: line.endX * canvasWidth,
        startY: line.startY * canvasHeight,
        endY: line.endY * canvasHeight,
        playerName: line.playerName,
      });
    }
    return adjustedLines;
  }

  const resizeLinesForServer = (lines: ILine[]): ILine[] => {
    const adjustedLines = [];
    for (const line of lines) {
      adjustedLines.push({
        startX: line.startX / canvasWidth,
        endX: line.endX / canvasWidth,
        startY: line.startY / canvasHeight,
        endY: line.endY / canvasHeight,
      });
    }
    return adjustedLines;
  }

  window.onresize = () => {
    // TODO: re-render to adjust canvas size
  }

	return (
  	<>
  			<canvas
          id="canvas"
          width={canvasWidth}
          height={canvasHeight}
          style={{
            border: "2px solid"
          }}
        />
        {
          props.showPalette &&
    			<Palette
            setStrokeStyle={id => setStrokeStyle(id)}
            setLineWidth={width => setLineWidth(width)}
          />
        }
  			<img id="canvasimg" style={{ position: "absolute", top: "10%", left: "52%" }} />
  	</>
	);
}

export default Canvas;
