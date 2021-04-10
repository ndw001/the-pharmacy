import { Redirect } from "react-router-dom";
const { useState } = require("react");
const axios = require("axios");
const { useAuth } = require("../context/auth");

function FauxLanding({ setCurrentPage }) {
  const [passcode, setPasscode] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { setAuthTokens } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/passcode",
        { passcode: passcode },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.data) {
          setAuthTokens(result.data);
          setIsConfirmed(true);
        }
      });
  };

  if (isConfirmed) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <h1>FauxLanding</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default FauxLanding;