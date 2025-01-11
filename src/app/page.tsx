import React from "react";
const res = await fetch("https://67820232c51d092c3dcdf34f.mockapi.io/carrental/cars");
const data = await res.json();
console.log(data);
export default function Home() {
  return (
    <div>
      
    </div>
    
  );
}
