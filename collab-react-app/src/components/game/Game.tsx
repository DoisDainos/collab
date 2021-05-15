import React, { useEffect } from "react";
import { ReactReduxContext, useSelector } from "react-redux";
import { IPlayerRole, IPlayerState, IPlayerPositionMap } from "../../interfaces/Interfaces";
import { getPlayerOrder, getRole } from "../../utils/serverUtils";
import Actions from "../../redux/actions/Actions";
import { useDispatch } from "react-redux";
import Canvas from "../canvas/Canvas";

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
	const players = useSelector<IPlayerState>(state => state.players) as IPlayerPositionMap;
	useSelector<IPlayerState>(state => state.role) as string;

  let activePosition = 0;

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
      getPlayerOrder(roomCode);
		}
  });

  const isActivePlayer = () => {
    return players[playerName] === activePosition;
  }

	return (
		<ReactReduxContext.Consumer>
			{({ store }) => {
				return (
					<>
						<p>
							Room: {store.getState().room}
						</p>
            {
              isActivePlayer() &&
              <p>
                Your turn!
              </p>
            }
						{
							!!store.getState().role ?
								<>
									<div>Role: {store.getState().role}</div>
									<Canvas
                    canDraw={isActivePlayer()}
                    showPalette={true}
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
