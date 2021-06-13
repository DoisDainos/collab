export interface IPlayerSessionInfo {
  name: string;
  room: string;
}

export const SessionStorageKey = "spydraw_";

export function setPlayerInfo(info: IPlayerSessionInfo): void {
	sessionStorage.setItem(SessionStorageKey + "player", JSON.stringify(info));
}

export function getPlayerInfo(): IPlayerSessionInfo | undefined {
  const item = sessionStorage.getItem(SessionStorageKey + "player");
  if (item) {
    return JSON.parse(item as string) as IPlayerSessionInfo;
  }
  return undefined;
}
