import React from "react";
import RoomConnect from "./RoomConnect";

const Landing = () => {
  console.log("Connected");
  return (
    <>
      <div className="Banner">
        <div className="PageTitle">
          Spy Draw
        </div>
      </div>
      <RoomConnect />
    </>
  );
}

export default Landing;
