import React from "react";
import { ReactReduxContext } from "react-redux";
import RoomConnect from "./RoomConnect";
import { useHistory } from "react-router-dom";
// import { pingServer } from "../../utils/serverUtils";

const Landing = () => {
  const history = useHistory();
  // const [failed, setFailure] = useState<boolean>(false);

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
    <ReactReduxContext.Consumer>
      {({ store }) => {
        return (
          <>
            Connected to server
            <hr style={{ "width": "50%" }} />
            <RoomConnect />
          </>
        )
      }}
    </ReactReduxContext.Consumer>
  );
}

export default Landing;
