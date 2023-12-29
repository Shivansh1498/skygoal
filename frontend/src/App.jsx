import "./App.css";
import Navbar from "./components/Navbar";
import Button from "@mui/material/Button";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateRoutes from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/home" exact />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
