export interface IPlayerState {
	room: string,
	name: string,
	players: string[],
	canvasLines: ILineWithStyle[],
	playing: boolean
}

export interface IStringAction {
  type: string,
  payload: string
}

export interface IStringArrayAction {
  type: string,
  payload: string[]
}

export interface IBooleanAction {
	type: string,
	payload: boolean
}

export interface ILinesAction {
	type: string,
	payload: ILine[]
}

export interface ILine {
	startX: number,
	startY: number,
	endX: number,
	endY: number
}

export interface ILineWithStyle extends ILine {
	strokeStyle: string,
	lineWidth: number
}

export interface IServerMessage {
	type: "NewRoom" | "ConnectRoom" | "StartGame" | "Draw",
	content: any
}
