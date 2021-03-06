import { ILine, IPlayerRole, IServerMessage } from "../interfaces/Interfaces";

const url = window.location.protocol === "https:" ?
	"wss://spydraw-server-5bao3jqrpa-ts.a.run.app" :
	"ws://localhost:8081"
const socket = new WebSocket(url);

export async function parseTextResponse(response: Response): Promise<string> {
	if (response.body) {
		const reader = response.body.getReader();
		const result = await reader.read();
		return new TextDecoder("utf-8").decode(result.value)
	}
	return "";
}

export async function pingServer(): Promise<boolean> {
	return new Promise<boolean>(resolve => {
		socket.addEventListener("open", () => {
			resolve(true);
		});
	}).catch(e => {
		console.error(e);
		return false;
	});
}

export function generateRoomCode(name: string) {
	const content = { player: name };
	socket.send(JSON.stringify({ type: "NewRoom", content: JSON.stringify(content) }));
}

export function submitRoomCode(code: string, player: string) {
	const content = { code: code, player: player };
	socket.send(JSON.stringify({ type: "ConnectRoom", content: JSON.stringify(content) }));
}

export function setPlayerColour(code: string, playerName: string, colour: string) {
	const content = { code: code, name: playerName, colour: colour };
	socket.send(JSON.stringify({ type: "SetPlayerColour", content: JSON.stringify(content) }));
}

export function startRoomGame(code: string) {
	const content = { code: code };
	socket.send(JSON.stringify({ type: "StartGame", content: JSON.stringify(content) }));
}

export function submitLines(code: string, player: string, lines: ILine[], strokeStyle: string, lineWidth: number) {
	const content = { code: code, player: player, lines: lines, strokeStyle: strokeStyle, lineWidth: lineWidth };
	socket.send(JSON.stringify({ type: "Draw", content: JSON.stringify(content) }));
}

export function getRole(code: string, player: string, possibleRoles: IPlayerRole[]) {
	const content = { code: code, name: player, possibleRoles: possibleRoles };
	socket.send(JSON.stringify({ type: "GetRole", content: JSON.stringify(content) }));
}

export function getGameWord(code: string, playerName: string) {
	const content = { code: code, name: playerName };
	socket.send(JSON.stringify({ type: "GetWord", content: JSON.stringify(content) }));
}

export function getFirstPlayer(code: string) {
	const content = { code: code };
	socket.send(JSON.stringify({ type: "GetFirstPlayer", content: JSON.stringify(content) }));
}

export function endTurn(code: string) {
	const content = { code: code };
	socket.send(JSON.stringify({ type: "EndTurn", content: JSON.stringify(content) }));
}

export function startGuess(code: string, playerName: string) {
	const content = { code: code, name: playerName };
	socket.send(JSON.stringify({ type: "StartGuess", content: JSON.stringify(content) }));
}

export function endGuess(code: string) {
	const content = { code: code };
	socket.send(JSON.stringify({ type: "EndGuess", content: JSON.stringify(content) }));
}

export function submitGuess(code: string, guessedName: string) {
	const content = { code: code, guessedName: guessedName };
	socket.send(JSON.stringify({ type: "SubmitGuess", content: JSON.stringify(content) }));
}

export function getState(code: string, playerName: string) {
	const content = { code: code, name: playerName };
	socket.send(JSON.stringify({ type: "GetState", content: JSON.stringify(content) }));
}

export function listenForMessage(callback: (data: IServerMessage) => void) {
	socket.addEventListener("message", event => {
		if (event.data) {
			callback(JSON.parse(event.data));
		}
	});
}
