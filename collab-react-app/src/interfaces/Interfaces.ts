export interface IPlayerState {
	room: string,
	name: string,
	players: string[],
	canvasLines: ILineWithStyle[],
	playing: boolean,
	role: string,
	possibleRoles: IPlayerRole[]
}

export interface IPlayerRole {
	roleName: string,
	roleCount: number
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

export interface IRolesAction {
	type: string,
	payload: IPlayerRole[]
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
	type: "NewRoom" | "ConnectRoom" | "StartGame" | "GetRole" | "Draw",
	content: any
}
