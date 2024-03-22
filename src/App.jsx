import Registration from "./components/auth/Registration";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Registration/>}/>
      </Routes>
    </div>
  );
}

export default App;
