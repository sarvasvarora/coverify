import React from "react"


const SecondaryButton = ({ label, handleClick }) => (
  <button
    className="btn btn-default 
    bg-gradient-to-r from-rose-400 to-rose-100
    text-neutral-900 text-xl
    px-4 py-2 border-none rounded-md mt-6 
     "

    onClick={handleClick}
  >

    {label} Start Generating
  </button>
);

export default SecondaryButton;
