import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration";
import ProfileSetup from "./pages/ProfileSetup";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/profile-setup" element={<ProfileSetup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
