import React, { useState } from "react";
import Factors from "./Factors";

export default function toggle() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div>
      <button onClick={toggleLoginStatus}>
        Toggle Login Status (Simulate Logout/Login)
      </button>
      <Factors isLoggedIn={isLoggedIn} />
    </div>
  );
}
