import React from "react"


const SecondaryButton = ({ label, handleClick }) => (
  <button
    className="btn btn-default  bg-black
    text-white px-10 py-4 rounded-full
    font-Montserrat font-bold"

    onClick={handleClick}
  >

    {label} START GENERATING
  </button>
);

export default SecondaryButton;
