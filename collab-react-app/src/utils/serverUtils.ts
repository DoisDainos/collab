import { ILine, IServerMessage } from "../interfaces/Interfaces";

const socket = new WebSocket("ws://localhost:8081");

export async function parseTextResponse(response: Response): Promise<string> {
	if (response.body) {
		const reader = response.body.getReader();
		const result = await reader.read();
		return new TextDecoder("utf-8").decode(result.value)
	}
	return "";
}

export async function pingServer(): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		socket.addEventListener("open", (event: Event) => {
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

export function startRoomGame(code: string) {
	const content = { code: code };
	socket.send(JSON.stringify({ type: "StartGame", content: JSON.stringify(content) }));
}

export function submitLines(code: string, player: string, lines: ILine[], strokeStyle: string, lineWidth: number) {
	const content = { code: code, player: player, lines: lines, strokeStyle: strokeStyle, lineWidth: lineWidth };
	socket.send(JSON.stringify({ type: "Draw", content: JSON.stringify(content) }));
}

export function listenForMessage(callback: (data: IServerMessage) => void) {
	socket.addEventListener("message", event => {
		if (event.data) {
			callback(JSON.parse(event.data));
		}
	});
}
