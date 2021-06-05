import React, { useEffect, useState } from "react";
import "../../styles/styles.css"

interface IProps {
	startingSeconds: number,
  gameEnded: boolean,
}

const ClassName = "container-infoPanel";

function Timer(props: IProps) {
  const [ timerSeconds, setTimerSeconds ] = useState<number>(props.startingSeconds);

  useEffect(() => {
    if (timerSeconds > 0 && !props.gameEnded) {
      setTimeout(() => {
        setTimerSeconds(timerSeconds - 1);
      }, 1000);
    }
  });

  const convertSecondsToTimer = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - minutes * 60;
    const minutesDisplay = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsDisplay = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

	return (
		<div className={ClassName}>
      <span id="time">{ convertSecondsToTimer(timerSeconds) }</span>
		</div>
	);
}

export default Timer;
