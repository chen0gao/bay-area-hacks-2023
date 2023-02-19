import "./App.css";
import React, { useState, useEffect } from "react";

function Btn({ test }) {
  return (
    <>
      <button onClick={test}>Change Points 123</button>
    </>
  );
}

export default Btn;
