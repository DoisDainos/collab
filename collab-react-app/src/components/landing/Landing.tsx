import React from "react";
import RoomConnect from "./RoomConnect";

const Landing = () => {
  console.log("Connected");
  return (
    <>
      <div className="PageTitle">
        Spy Paint
      </div>
      <RoomConnect />
    </>
  );
}

export default Landing;
