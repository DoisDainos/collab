export interface IPlayerState {
	room: string,
	otherPlayers: string[]
}

export interface IStringAction {
  type: string,
  payload: string
}

export interface IStringArrayAction {
  type: string,
  payload: string[]
}