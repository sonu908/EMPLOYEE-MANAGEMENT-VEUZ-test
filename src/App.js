import "./App.css";
import EmpList from "./components/EmpList";
function App() {
  return (
    <div className="App flex justify-center p-5">
      <div className="w-3/4 shadow-2xl border p-5 rounded-xl  bg-slate-100 ">
       
        <EmpList />
      </div>
    </div>
  );
}

export default App;
