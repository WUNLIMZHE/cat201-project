import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [, setCount] = useState(0);

  return (
    <>
      <h1 className="font-bold text-blue-300 mb-5">
        Vite + React + Tailwind CSS
      </h1>
      <h1 className="text-3xl font-bold text-blue-300">
        Xin Sheng the Scrum Master
      </h1>
      <div className="flex items-center justify-center my-10">
      <img className='h-16 md:h-32 lg:h-48' src="./xinsheng.png" alt="Tan Xin Sheng"/>
      </div>
    </>
  );
}

export default App;
