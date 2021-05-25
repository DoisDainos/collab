/**
 * State for client to keep track of their view of the game.
 */
export interface IPlayerState {
	// Room code
	room: string,
	// Player name
	name: string,
	// All players with positions to dictate order of play
	players: string[],
	// Player whose turn it is
	activePlayer: string,
	// State of lines on the canvas to draw
	canvasLines: ILineWithStyle[],
	// Is the game being played
	playing: boolean,
	// Player's game role
	role: string,
	// All possible roles with counts
	possibleRoles: IPlayerRole[],
	// Current game word
	gameWord: string;
}

/**
 * Player roles and the number of players for that role.
 */
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

export interface INumberAction {
	type: string,
	payload: number
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
	type: "NewRoom" | "ConnectRoom" | "StartGame" | "GetRole" | "GetWord" | "GetFirstPlayer" | "Draw" | "EndTurn",
	content: any
}
