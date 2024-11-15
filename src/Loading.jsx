import {CircularProgress} from "@mui/material";
import React from "react";

export default function Loading({visible}){

  if(visible) {
    return (
      <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
        <CircularProgress size={100}/>
      </div>
    );
  } else return null;
}