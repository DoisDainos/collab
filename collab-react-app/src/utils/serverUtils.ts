const socket = new WebSocket("ws://localhost:8081");
import { ILine } from "../interfaces/Interfaces";

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

export async function generateRoomCode(): Promise<{ code: string }> {
	return new Promise<{ code: string }>((resolve, reject) => {
		socket.send(JSON.stringify({ type: "NewRoom" }));
		listenForMessage("NewRoom", resolve);
	}).catch(e => {
		console.error(e);
		return { code: "" };
	});
}

export async function submitRoomCode(code: string, player: string): Promise<{ players: string[], invalid?: boolean }> {
	return new Promise<{ players: string[], invalid?: boolean }>((resolve, reject) => {
		const content = { code: code, player: player };
		socket.send(JSON.stringify({ type: "ConnectRoom", content: JSON.stringify(content) }));
		listenForMessage("ConnectRoom", resolve);
	}).catch(e => {
		console.error(e);
		return { players: [], invalid: true };
	});
}

export async function submitLines(code: string, lines: ILine[]): Promise<void> {
	return new Promise<void>(resolve => {
		const content = { code: code, lines: lines };
		socket.send(JSON.stringify({ type: "Draw", content: JSON.stringify(content) }));
    resolve();
	}).catch(e => {
		console.error(e);
	});
}

export async function listenForRoomConnections(): Promise<string[]> {
	const message = await new Promise<{ players: string[] }>(resolve => {
		listenForMessage("ConnectRoom", resolve);
	});
	return message.players;
}

export async function listenForDrawing(): Promise<ILine[]> {
	const message = await new Promise<{ lines: ILine[] }>(resolve => {
		listenForMessage("Draw", resolve);
	});
	return message.lines;
}

function listenForMessage(type: string, resolve: (data: any) => void) {
	socket.addEventListener("message", event => {
		let data;
		if (event.data) {
			data = JSON.parse(event.data);
		}
		if (data && data.type === type && data.content) {
			resolve(data.content);
		}
	});
}
