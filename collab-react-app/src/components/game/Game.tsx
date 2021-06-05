import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IPlayerColourMap, IPlayerRole, IPlayerState } from "../../interfaces/Interfaces";
import { endTurn, getFirstPlayer, getGameWord, getRole } from "../../utils/serverUtils";
import Actions from "../../redux/actions/Actions";
import { useDispatch } from "react-redux";
import Canvas from "../canvas/Canvas";
import InfoPanel from "./InfoPanel";
import Timer from "./Timer";
import GameEnd from "./GameEnd";

const DEFAULT_ROLE = "Friend";

const EXTRA_ROLES: IPlayerRole[] = [
  {
    roleName: "Spy",
    roleCount: 1
  }
]

interface IGameState {
  time: number,
  roomCode: string,
  word: string,
  playerName: string,
  possibleRoles: IPlayerRole[],
  players: string[],
  activePlayer: string,
  guessingPlayer: string,
  role: string,
  playerColourMap: IPlayerColourMap,
  gameEnded: boolean,
  guessedSpy: boolean,
  spy: string,
}

function Game() {
	const dispatch = useDispatch();

  const gameState = useSelector<IPlayerState>(state => (
    {
      time: state.time,
      roomCode: state.room,
      word: state.gameWord,
      playerName: state.name,
      possibleRoles: state.possibleRoles,
      players: state.players,
      activePlayer: state.activePlayer,
      guessingPlayer: state.guessingPlayer,
      role: state.role,
      gameEnded: state.gameEnded,
      guessedSpy: state.guessedSpy,
      spy: state.spy,
    }
  )) as IGameState;

	useEffect(() => {
		if (gameState.possibleRoles.length === 0) {
			const playerCount = Object.keys(gameState.players).length;
			let totalExtraRoles = 0;
			for (const role of EXTRA_ROLES) {
				totalExtraRoles += role.roleCount;
			}
			const defaultRole: IPlayerRole = {
				roleName: DEFAULT_ROLE,
				roleCount: playerCount - totalExtraRoles
			}
			const allRoles = EXTRA_ROLES.concat(defaultRole);
			dispatch(Actions.setPossibleRoles(allRoles));
			getRole(gameState.roomCode, gameState.playerName, allRoles);
			getGameWord(gameState.roomCode, gameState.playerName);
      getFirstPlayer(gameState.roomCode);
		}
  });

  const isActivePlayer = () => {
    return gameState.playerName === gameState.activePlayer;
  }

	const onEndStroke = () => {
		endTurn(gameState.roomCode);
	}

	return (
		<>
      <Timer
        startingSeconds={gameState.time}
        gameEnded={gameState.gameEnded}
      />
      {
        !gameState.gameEnded ?
          <>
            {
              isActivePlayer() ?
                <p>
                  Your turn!
                </p>
              :
                <p>
                  {gameState.activePlayer}'s turn'!
                </p>
            }
      			{
      				!!gameState.role ?
      					<>
      						<InfoPanel
      							room={gameState.roomCode}
                    name={gameState.playerName}
      							role={gameState.role}
      							word={gameState.word}
                    playerNames={gameState.players}
                    guessingPlayer={gameState.guessingPlayer}
                    playerColourMap={gameState.playerColourMap}
      						/>
      						<Canvas
                    canDraw={isActivePlayer()}
                    showPalette={false}
      							onEndStroke={() => onEndStroke()}
                  />
      					</>
      				:
      					<div>
      						Assigning roles...
      					</div>
      			}
          </>
        :
          <>
            <GameEnd
              guessedSpy={gameState.guessedSpy}
              spy={gameState.spy}
              playerName={gameState.playerName}
            />
          </>
      }
		</>
	);
}

export default Game;
