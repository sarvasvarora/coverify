import React from "react"


const LoginButton = ({ label, handleClick }) => (
  <button
    className="btn btn-default 
    bg-gradient-to-r from-cyan-500 to-teal-500
    text-white px-4 py-2 border-none rounded-md ml-8 "

    onClick={handleClick}
  >

    {label} Sign in with Spotify
  </button>
);

export default LoginButton;
