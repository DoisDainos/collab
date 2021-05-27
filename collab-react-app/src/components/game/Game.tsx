import React, { useEffect } from "react";
import { ReactReduxContext, useSelector } from "react-redux";
import { IPlayerRole, IPlayerState } from "../../interfaces/Interfaces";
import { endTurn, getFirstPlayer, getGameWord, getRole } from "../../utils/serverUtils";
import Actions from "../../redux/actions/Actions";
import { useDispatch } from "react-redux";
import Canvas from "../canvas/Canvas";
import InfoPanel from "./InfoPanel";

// const ROUNDS = 6;

const DEFAULT_ROLE = "Friend";

const EXTRA_ROLES: IPlayerRole[] = [
  {
    roleName: "Spy",
    roleCount: 1
  }
]

function Game() {
	const dispatch = useDispatch();

	const roomCode = useSelector<IPlayerState>(state => state.room) as string;
	const playerName = useSelector<IPlayerState>(state => state.name) as string;
	const possibleRoles = useSelector<IPlayerState>(state => state.possibleRoles) as IPlayerRole[];
	const players = useSelector<IPlayerState>(state => state.players) as string[];
	const activePlayer = useSelector<IPlayerState>(state => state.activePlayer) as string;
	const guessingPlayer = useSelector<IPlayerState>(state => state.guessingPlayer) as string;
	useSelector<IPlayerState>(state => state.role) as string;

	useEffect(() => {
		if (possibleRoles.length === 0) {
			const playerCount = Object.keys(players).length;
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
			getRole(roomCode, playerName, allRoles);
			getGameWord(roomCode, playerName);
      getFirstPlayer(roomCode);
		}
  });

  const isActivePlayer = () => {
    return playerName === activePlayer;
  }

	const onEndStroke = () => {
		endTurn(roomCode);
	}

	return (
		<ReactReduxContext.Consumer>
			{({ store }) => {
				const state = store.getState() as IPlayerState;
				return (
					<>
            {
              isActivePlayer() ?
                <p>
                  Your turn!
                </p>
              :
                <p>
                  {activePlayer}'s turn'!
                </p>
            }
						{
							!!state.role ?
								<>
									<InfoPanel
										room={state.room}
                    name={state.name}
										role={state.role}
										word={state.gameWord}
                    playerNames={state.players}
                    guessingPlayer={guessingPlayer}
                    playerColourMap={state.playerColourMap}
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
				);
			}}
		</ReactReduxContext.Consumer>
	);
}

export default Game;
