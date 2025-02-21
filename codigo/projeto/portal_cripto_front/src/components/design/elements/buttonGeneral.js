import React from "react";

const ButtonGeneral = ({text, onClick}) => {
  return (
    <button className="button" onClick={onClick}>     
      {text}
    </button>
  )
}

export default ButtonGeneral;