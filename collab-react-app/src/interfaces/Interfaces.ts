export interface IPlayerState {
	room: string,
	// name: string,
	otherPlayers: string[],
	canvasLines: ILine[]
}

export interface IStringAction {
  type: string,
  payload: string
}

export interface IStringArrayAction {
  type: string,
  payload: string[]
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
