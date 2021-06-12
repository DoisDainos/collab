/**
 * State for client to keep track of their view of the game.
 */
export interface IPlayerState {
	// Room code
	room: string;
	// Player name
	name: string;
	// All player names
	players: string[];
	// Player names mapped to colour ID
	playerColourMap: IPlayerColourMap;
	// Player whose turn it is
	activePlayer: string;
	// State of lines on the canvas to draw
	canvasLines: ILineFromPlayer[];
	// Is the game being played
	playing: boolean;
	// Player's game role
	role: string;
	// All possible roles with counts
	possibleRoles: IPlayerRole[];
	// Current game word
	gameWord: string;
	// Name of player currently making a spy guess
	guessingPlayer: string;
	// Game time in seconds, server keeps actual count
	time: number;
	// Spy has been found out
	guessedSpy: boolean;
	// Game has ended by time
	gameEnded: boolean;
	// The spy of the game, once revealed
	spy: string;
	// True if provided room code doesn't exist or is otherwise invalid
	invalidRoom: boolean;
}

export interface IPlayerColourMap {
	[playerName: string]: string;
}

/**
 * Player roles and the number of players for that role.
 */
export interface IPlayerRole {
	roleName: string;
	roleCount: number;
}

export interface IStringAction {
  type: string;
  payload: string;
}

export interface IStringArrayAction {
  type: string;
  payload: string[];
}

export interface IBooleanAction {
	type: string;
	payload: boolean;
}

export interface ILinesAction {
	type: string;
	payload: ILine[];
}

export interface IRolesAction {
	type: string;
	payload: IPlayerRole[]
}

export interface INumberAction {
	type: string;
	payload: number;
}

export interface IPlayerColourAction {
	playerName: string;
	colour: string
}

export interface ISetGuessingAction {
	playerName: string;
	guessing: boolean;
}

export interface ILine {
	startX: number;
	startY: number;
	endX: number;
	endY: number;
}

export interface ILineFromPlayer extends ILine {
	playerName: string;
}

export interface ILineWithStyle extends ILine {
	strokeStyle: string;
	lineWidth: number;
}

export interface IServerMessage {
	type: string;
	content: any;
}
