export interface IPlayerSessionInfo {
  name: string;
  room: string;
}

export const SessionStorageKey = "spydraw_";

export function setPlayerInfo(info: IPlayerSessionInfo): void {
	sessionStorage.setItem(SessionStorageKey + "player", JSON.stringify(info));
}

export function getPlayerInfo(): IPlayerSessionInfo {
  return JSON.parse((sessionStorage.getItem(SessionStorageKey + "player") as string)) as IPlayerSessionInfo;
}
