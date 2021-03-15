import React from "react";
import RoomConnect from "./RoomConnect";

const Landing = () => {
  console.log("Connected");
  return (
    <>
      Connected to server
      <hr style={{ "width": "50%" }} />
      <RoomConnect />
    </>
  );
}

export default Landing;
