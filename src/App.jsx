import { Route, Routes } from "react-router";
import AdminPage from "./pages/AdminPage";
import AdminLog from "./pages/AdminLog";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminLog/>}/>
        <Route path="/adminPage" element={<AdminPage/>} />
      </Routes>
    </div>
  );
}

export default App;
