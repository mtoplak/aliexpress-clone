import React from "react";

// This is out of position on bigger screen. Try using flex / gridbox for alignments 
// Do not use <br /> tags. Try achieving everything with css
function Welcome() {
  return (
    <React.Fragment>
      <div id="welcome">
        Welcome to Aliexpress
        <br /><br />
        <button id="registerBtn">Register</button> <button id="signInBtn">Sign In</button>
      </div>
    </React.Fragment>
  );
}

export default Welcome;
