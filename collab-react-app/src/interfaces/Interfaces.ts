/**
 * State for client to keep track of their view of the game.
 */
export interface IPlayerState {
	// Room code
	room: string,
	// Player name
	name: string,
	// All players with positions to dictate order of play
	players: IPlayerPositionMap,
	// State of lines on the canvas to draw
	canvasLines: ILineWithStyle[],
	// Is the game being played
	playing: boolean,
	// Player's game role
	role: string,
	// All possible roles with counts
	possibleRoles: IPlayerRole[],
}

/**
 * Mapping of player names to position, default position is -1.
 */
export interface IPlayerPositionMap {
	[name: string]: number;
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

export interface IPlayerPositionMapAction {
	type: string,
	payload: IPlayerPositionMap
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
	type: "NewRoom" | "ConnectRoom" | "StartGame" | "GetRole" | "GetPlayerOrder" | "Draw",
	content: any
}
