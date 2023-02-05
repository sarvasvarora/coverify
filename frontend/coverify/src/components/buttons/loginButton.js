import React from "react"


const LoginButton = ({ label, handleClick }) => (
  <button
    className="btn btn-default  bg-white
    text-black px-8 py-4  border-black rounded-full 
    font-Montserrat font-bold"

    onClick={handleClick}
  >

    {label} LOG IN
  </button>
);

export default LoginButton;
