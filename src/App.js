// import { Route, Routes } from "react-router-dom";
import "./App.css";
import EmpList from "./components/EmpList";
function App() {
  return (
    <div className="App flex justify-center p-5">
      <div className="w-3/4 bg-indigo-500 p-5 rounded-xl">
        {/* <FormDetails/> */}
        {/* <Routes>
        </Routes> */}
        <EmpList />
      </div>
    </div>
  );
}

export default App;
