import React, { useRef } from "react";

export default function App() {
  const checkboxRef = useRef();

  const save = () => {
    console.log(checkboxRef.current.checked);
  };

  return (
    <div>
      <div>
        <label>
          <input type="checkbox" ref={checkboxRef} /> Check me out
        </label>
      </div>
      <button onClick={save}>Submit</button>
    </div>
  );
}