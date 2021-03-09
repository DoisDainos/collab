import React, { useState } from "react";
import RoomConnect from "./RoomConnect";
import Button from "react-bootstrap/Button";
import { generateRoomCode } from "../../utils/serverUtils";
// import { pingServer } from "../../utils/serverUtils";

const Landing = () => {
  // const [failed, setFailure] = useState<boolean>(false);
  const [code, setCode] = useState("");

  // TODO: this but before opening component and then redirect
  // useEffect(() => {
  //   const attemptConnection = async () => {
  //     const success = await pingServer();
  //     setFailure(success);
  //   }
  //   attemptConnection();
  // }, []);

  // if (!failed) {
  //   return (
  //     <div className="Landing-error">
  //       <p>
  //         Could not connect to server
  //       </p>
  //     </div>
  //   )
  // }
  console.log("Connected");
  return (
    <>
      Connected to server
      <hr style={{ "width": "50%" }} />
      <RoomConnect />
      <Button
        variant="primary"
        onClick={ () => onGenerateClick(setCode) }
      >
        Generate room code
      </Button>
      <p>
        Code: { code }
      </p>
    </>
  );
}

async function onGenerateClick(setCode: React.Dispatch<React.SetStateAction<string>>) {
  let response: { code: string } = await generateRoomCode();
  let code: string;
  if (!response || !response.code) {
    code = "ERROR"
  } else {
    code = response.code;
  }
  setCode(code);
}

export default Landing;
