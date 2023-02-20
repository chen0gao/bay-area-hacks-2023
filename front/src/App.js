import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./Map";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import User from "./pages/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}
export default App;
